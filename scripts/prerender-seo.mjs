import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE_URL,
  categoryPaths,
  loadFeedProducts,
  productSeo,
  staticSeoRoutes,
} from "./catalog-feed-core.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const baseHtml = await readFile(path.join(distDir, "index.html"), "utf8");

function escapeAttr(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function upsertHeadTag(html, matcher, tag) {
  if (matcher.test(html)) return html.replace(matcher, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

function setMetaName(html, name, content) {
  return upsertHeadTag(
    html,
    new RegExp(`<meta\\b(?=[^>]*\\bname=["']${name}["'])[^>]*>`, "is"),
    `<meta name="${name}" content="${escapeAttr(content)}" />`,
  );
}

function setMetaProperty(html, property, content) {
  return upsertHeadTag(
    html,
    new RegExp(`<meta\\b(?=[^>]*\\bproperty=["']${property}["'])[^>]*>`, "is"),
    `<meta property="${property}" content="${escapeAttr(content)}" />`,
  );
}

function setCanonical(html, url) {
  return upsertHeadTag(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/is,
    `<link rel="canonical" href="${escapeAttr(url)}" />`,
  );
}

function withSeo(html, seo, fallbackHtml, extraHead = "") {
  let next = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  next = setMetaName(next, "description", seo.description);
  next = setMetaName(next, "robots", "index, follow");
  next = setCanonical(next, seo.canonical);
  next = setMetaProperty(next, "og:site_name", "КерамоФеникс");
  next = setMetaProperty(next, "og:type", seo.ogType || "website");
  next = setMetaProperty(next, "og:title", seo.title);
  next = setMetaProperty(next, "og:description", seo.description);
  next = setMetaProperty(next, "og:url", seo.canonical);
  if (seo.image) next = setMetaProperty(next, "og:image", seo.image);
  if (extraHead) next = next.replace("</head>", `    ${extraHead}\n  </head>`);
  if (fallbackHtml) next = next.replace('<div id="app"></div>', `<div id="app">${fallbackHtml}</div>`);
  return next;
}

function staticFallback(route) {
  const seoText =
    route.seoHeading && route.seoParagraphs?.length
      ? `<section style="margin-top:28px;max-width:960px">
  <h2 style="margin:0 0 12px;font-size:24px;line-height:1.25">${escapeHtml(route.seoHeading)}</h2>
  ${route.seoParagraphs
    .map((paragraph) => `<p style="margin:0 0 12px">${escapeHtml(paragraph)}</p>`)
    .join("\n  ")}
</section>`
      : "";

  return `<main style="padding:32px;font-family:Montserrat,Arial,sans-serif;line-height:1.5">
  <h1>${escapeHtml(route.title.replace(" — КерамоФеникс", ""))}</h1>
  <p>${escapeHtml(route.description)}</p>
  ${seoText}
</main>`;
}

function productFallback(seo) {
  const image = seo.image
    ? `<img src="${escapeAttr(seo.image)}" alt="${escapeAttr(seo.name)}" style="max-width:320px;width:100%;height:auto" />`
    : "";
  const price = seo.priceText ? `<p><b>${escapeHtml(seo.priceText)}</b></p>` : "";

  return `<main style="padding:32px;font-family:Montserrat,Arial,sans-serif;line-height:1.5">
  ${image}
  <h1>${escapeHtml(seo.name)}</h1>
  ${price}
  <p>${escapeHtml(seo.description)}</p>
</main>`;
}

function productJsonLd(product, seo) {
  return `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: seo.name,
    image: seo.image ? [seo.image] : undefined,
    description: seo.description,
    sku: product.id,
    category: seo.categoryName,
    brand: {
      "@type": "Brand",
      name: "КерамоФеникс",
    },
    offers: {
      "@type": "Offer",
      url: seo.canonical,
      priceCurrency: "RUB",
      price: String(Number(product.price) || ""),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  })}</script>`;
}

async function writeRoute(routePath, html) {
  const target =
    routePath === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, routePath.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

for (const route of staticSeoRoutes) {
  await writeRoute(
    route.path,
    withSeo(
      baseHtml,
      {
        title: route.title,
        description: route.description,
        canonical: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
      },
      staticFallback(route),
    ),
  );
}

const products = await loadFeedProducts();

for (const product of products) {
  const seo = productSeo(product);
  await writeRoute(
    `/product/${encodeURIComponent(product.id)}`,
    withSeo(
      baseHtml,
      { ...seo, ogType: "product" },
      productFallback(seo),
      productJsonLd(product, seo),
    ),
  );
}

console.log(
  `SEO prerendered: ${staticSeoRoutes.length} static pages, ${products.length} product pages`,
);
