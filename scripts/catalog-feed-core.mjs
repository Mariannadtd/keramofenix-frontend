import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase.js";

export const SITE_URL = "https://keramofenix.ru";
export const SHOP_NAME = "КерамоФеникс";

export const categoryMeta = {
  interiors: { id: 1, name: "Межкомнатные двери" },
  exteriors: { id: 2, name: "Входные двери" },
  porcelain: { id: 3, name: "Керамогранит" },
  floors: { id: 4, name: "Напольные покрытия" },
  fittings: { id: 5, name: "Фурнитура" },
};

export const categoryPaths = {
  interiors: "/interiors",
  exteriors: "/exteriors",
  porcelain: "/porcelain-stoneware",
  floors: "/floors",
  fittings: "/fittings",
};

export const staticSeoRoutes = [
  {
    path: "/",
    title: "Двери, керамогранит и напольные покрытия в Сочи — КерамоФеникс",
    description:
      "КерамоФеникс — двери, керамогранит, напольные покрытия и фурнитура в Сочи. Подбор комплекта для ремонта, образцы в салоне, замер и доставка. Адреса: ул. Гагарина 63, ул. Донская 3/3.",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    path: "/interiors",
    title: "Купить межкомнатные двери в Сочи — КерамоФеникс",
    description:
      "Купить межкомнатные двери в Сочи в КерамоФеникс: полотна, погонаж, ручки и фурнитура. Поможем подобрать комплект по стилю, размеру и бюджету. Салоны: ул. Гагарина 63, ул. Донская 3/3.",
    seoHeading: "Межкомнатные двери в Сочи с подбором в салоне",
    seoParagraphs: [
      "В КерамоФеникс можно купить межкомнатные двери в Сочи для квартиры, дома или коммерческого помещения. В салонах показываем живые образцы полотен, оттенков, покрытий и фурнитуры, чтобы дверь совпала с полом, стенами и общим стилем ремонта.",
      "Помогаем подобрать комплект по размеру проема, бюджету и условиям эксплуатации: полотно, короб, наличники, доборы, ручки и петли. Работаем с адресами в Сочи, консультируем по замеру и доставке из салонов на ул. Гагарина, 63 и ул. Донская, 3/3.",
    ],
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/exteriors",
    title: "Купить входные двери в Сочи — КерамоФеникс",
    description:
      "Купить входные двери в Сочи для квартиры и дома. Модели с терморазрывом, зеркалом, ковкой и разными вариантами отделки. КерамоФеникс: ул. Гагарина 63, ул. Донская 3/3.",
    seoHeading: "Входные двери для квартиры и дома",
    seoParagraphs: [
      "Входные двери в Сочи подбираем для квартиры, частного дома и помещений с разными требованиями к теплоизоляции, замкам и стороне открывания. В каталоге можно выбрать модели с терморазрывом, зеркалом, ковкой и разными вариантами отделки.",
      "Перед покупкой поможем сверить размеры, комплектацию и фурнитуру, объясним разницу по конструкциям и назначению. Образцы можно посмотреть в салонах КерамоФеникс на ул. Гагарина, 63 и ул. Донская, 3/3, также консультируем по доставке и замеру.",
    ],
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/floors",
    title: "Купить напольные покрытия в Сочи — КерамоФеникс",
    description:
      "Купить напольные покрытия в Сочи: ламинат, кварцвинил и практичные покрытия для квартиры, дома и коммерческих помещений. Образцы в салонах КерамоФеникс.",
    seoHeading: "Напольные покрытия для ремонта в Сочи",
    seoParagraphs: [
      "В КерамоФеникс можно подобрать напольные покрытия в Сочи для квартиры, дома, офиса или коммерческого помещения. В каталоге представлены ламинат, кварцвинил и другие практичные покрытия с разными классами износостойкости, фактурами и форматами.",
      "Помогаем выбрать покрытие под нагрузку, влажность, стиль интерьера и бюджет. В салонах на ул. Гагарина, 63 и ул. Донская, 3/3 можно посмотреть образцы, сравнить оттенки и собрать комплект для ремонта вместе с дверями и фурнитурой.",
    ],
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/porcelain-stoneware",
    title: "Купить керамогранит в Сочи — КерамоФеникс",
    description:
      "Купить керамогранит в Сочи для пола и стен. Подбор плитки по формату, поверхности, оттенку и цене. Образцы в салонах КерамоФеникс: ул. Гагарина 63, ул. Донская 3/3.",
    seoHeading: "Керамогранит для пола и стен в Сочи",
    seoParagraphs: [
      "Керамогранит в Сочи подбираем для пола, стен, ванной, кухни, прихожей и коммерческих помещений. В салоне можно оценить фактуру, формат, поверхность и оттенок плитки, чтобы материал совпал с задачей ремонта и общим интерьером.",
      "Помогаем выбрать керамогранит по размеру, цене, назначению и визуальному эффекту: под камень, мрамор, бетон или дерево. Образцы и консультация доступны в салонах КерамоФеникс на ул. Гагарина, 63 и ул. Донская, 3/3.",
    ],
    changefreq: "weekly",
    priority: "0.9",
  },
  {
    path: "/fittings",
    title: "Купить дверную фурнитуру в Сочи — КерамоФеникс",
    description:
      "Купить дверную фурнитуру в Сочи: ручки, замки, петли, защелки, раздвижные системы и комплектующие. Подберем под межкомнатные и входные двери.",
    seoHeading: "Дверная фурнитура с подбором под комплект",
    seoParagraphs: [
      "Фурнитура для дверей в Сочи нужна не только для внешнего вида, но и для удобства ежедневного использования. В каталоге можно подобрать ручки, замки, защелки, петли, раздвижные системы и комплектующие под выбранные межкомнатные или входные двери.",
      "Помогаем совместить цвет, тип механизма, назначение и комплектацию, чтобы фурнитура подходила к полотну и условиям эксплуатации. Образцы доступны в салонах КерамоФеникс на ул. Гагарина, 63 и ул. Донская, 3/3.",
    ],
    changefreq: "weekly",
    priority: "0.8",
  },
  {
    path: "/about",
    title: "О компании — КерамоФеникс",
    description:
      "О компании КерамоФеникс в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
    changefreq: "monthly",
    priority: "0.6",
  },
  {
    path: "/contacts",
    title: "Контакты — КерамоФеникс",
    description:
      "Контакты КерамоФеникс: Сочи, ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
    changefreq: "monthly",
    priority: "0.7",
  },
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function escapeXml(value = "") {
  return String(value)
    .replace(/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function compactText(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

export function limitText(value = "", maxLength = 0) {
  const text = compactText(value);
  if (!maxLength || text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

export function toAbsoluteUrl(value = "") {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function normalizeText(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/керамический\s+гранит/g, "керамогранит")
    .replace(/керамо[\s-]*гранит/g, "керамогранит");
}

export function categoryKey(product) {
  const category = String(product.category || "");
  const normalizedCategory = normalizeText(category);
  const normalizedForm = normalizeText(product.form);

  if (
    category === "porcelain" ||
    category === "porcelain-stoneware" ||
    normalizedCategory.includes("керамогранит") ||
    normalizedForm.includes("керамогранит")
  ) {
    return "porcelain";
  }

  if (categoryMeta[category]) return category;
  if (normalizedCategory.includes("межкомнат")) return "interiors";
  if (normalizedCategory.includes("вход")) return "exteriors";
  if (normalizedCategory.includes("фурнит")) return "fittings";

  return "floors";
}

export function offerUrl(product) {
  return `${SITE_URL}/product/${encodeURIComponent(product.id)}`;
}

export function productCanonical(product) {
  return offerUrl(product);
}

export function productSeo(product) {
  const key = categoryKey(product);
  const category = categoryMeta[key] || categoryMeta.floors;
  const name = compactText(product.name || "Товар");
  const price = Number(product.price);
  const priceText = Number.isFinite(price)
    ? `${Math.round(price).toLocaleString("ru-RU")} ₽`
    : "";
  const description = limitText(
    `${name} — ${category.name.toLowerCase()} в Сочи${
      priceText ? `, цена ${priceText}` : ""
    }. КерамоФеникс: ул. Гагарина 63, ул. Донская 3/3. Телефон +7 988 406-88-87.`,
    300,
  );
  const images = Array.isArray(product.images) ? product.images : [];

  return {
    title: `${name} — ${SHOP_NAME}`,
    description,
    canonical: productCanonical(product),
    image: images[0] ? toAbsoluteUrl(images[0]) : "",
    categoryName: category.name,
    categoryPath: categoryPaths[key] || "/floors",
    name,
    priceText,
  };
}

export function defaultDescription(product, categoryName) {
  return [
    product.description,
    `Категория: ${categoryName}.`,
    "Салоны в Сочи: ул. Гагарина, 63 и Донская, 3/3.",
  ]
    .filter(Boolean)
    .join(" ");
}

export function yandexDescription(product, categoryName) {
  return limitText(product.description || `${categoryName} в КерамоФеникс.`, 90);
}

export function isoYmlDate() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "+00:00");
}

export function yandexYmlDate() {
  const date = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}:${pad(date.getMinutes())}`,
  ].join(" ");
}

export function sitemapDate(value = new Date()) {
  let date = value;
  if (value && typeof value.toDate === "function") date = value.toDate();
  else if (value && typeof value.seconds === "number") {
    date = new Date(value.seconds * 1000);
  } else if (!(value instanceof Date)) {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) date = new Date();
  return date.toISOString().slice(0, 10);
}

export function offerXml(product, options = {}) {
  const key = categoryKey(product);
  const category = categoryMeta[key];
  const price = Math.round(Number(product.price));
  const images = Array.isArray(product.images) ? product.images : [];
  const picture = toAbsoluteUrl(images[0]);
  const vendor = product.manufacturerName || product.manufacturer;
  const description = (options.description || defaultDescription)(
    product,
    category.name,
  );
  const name = options.nameMaxLength
    ? limitText(product.name, options.nameMaxLength)
    : String(product.name).trim();

  const lines = [
    `    <offer id="${escapeXml(product.id)}" available="true">`,
    `      <url>${escapeXml(offerUrl(product))}</url>`,
    `      <price>${price}</price>`,
    `      <currencyId>${escapeXml(options.currencyId || "RUR")}</currencyId>`,
    `      <categoryId>${category.id}</categoryId>`,
    `      <name>${escapeXml(name)}</name>`,
  ];

  if (picture) lines.push(`      <picture>${escapeXml(picture)}</picture>`);
  if (vendor && options.includeVendor !== false) {
    lines.push(`      <vendor>${escapeXml(vendor)}</vendor>`);
  }
  if (description) {
    lines.push(`      <description>${escapeXml(description)}</description>`);
  }

  lines.push("    </offer>");

  return lines.join("\n");
}

export function buildYml(products, options = {}) {
  const categories = Object.entries(categoryMeta)
    .map(
      ([, category]) =>
        `      <category id="${category.id}">${escapeXml(category.name)}</category>`,
    )
    .join("\n");

  const offers = products.map((product) => offerXml(product, options)).join("\n");
  const date = (options.date || isoYmlDate)();

  return `<?xml version="1.0" encoding="UTF-8"?>
<yml_catalog date="${escapeXml(date)}">
  <shop>
    <name>${escapeXml(SHOP_NAME)}</name>
    <company>${escapeXml(SHOP_NAME)}</company>
    <url>${escapeXml(SITE_URL)}</url>
    <currencies>
      <currency id="${escapeXml(options.currencyId || "RUR")}" rate="1"/>
    </currencies>
    <categories>
${categories}
    </categories>
    <offers>
${offers}
    </offers>
  </shop>
</yml_catalog>
`;
}

export function buildSitemapXml(products, options = {}) {
  const fallbackDate = sitemapDate(options.lastmod || new Date());
  const staticUrls = staticSeoRoutes.map((route) => ({
    loc: `${SITE_URL}${route.path === "/" ? "/" : route.path}`,
    lastmod: fallbackDate,
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  const productUrls = products.map((product) => ({
    loc: productCanonical(product),
    lastmod: sitemapDate(
      product.updatedAt || product.updated_at || product.createdAt || fallbackDate,
    ),
    changefreq: "weekly",
    priority: "0.7",
  }));

  const urls = [...staticUrls, ...productUrls]
    .map(
      (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${escapeXml(item.changefreq)}</changefreq>
    <priority>${escapeXml(item.priority)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function isFeedProduct(product) {
  const price = Number(product.price);
  return (
    product.id &&
    product.name &&
    Number.isFinite(price) &&
    price > 0 &&
    categoryMeta[categoryKey(product)]
  );
}

export async function loadFeedProducts() {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter(isFeedProduct)
    .sort((a, b) => {
      const byCategory =
        categoryMeta[categoryKey(a)].id - categoryMeta[categoryKey(b)].id;
      if (byCategory) return byCategory;
      return String(a.name).localeCompare(String(b.name), "ru");
    });
}

export async function writeYmlFile(outputFile, content) {
  const outPath = path.resolve(__dirname, "..", outputFile);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, content, "utf8");
}
