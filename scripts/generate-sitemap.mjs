import {
  buildSitemapXml,
  loadFeedProducts,
  writeYmlFile,
} from "./catalog-feed-core.mjs";

const OUTPUT_FILE = "public/sitemap.xml";

const products = await loadFeedProducts();

await writeYmlFile(OUTPUT_FILE, buildSitemapXml(products));

console.log(`Sitemap written: ${OUTPUT_FILE}`);
console.log(`Product URLs exported: ${products.length}`);
