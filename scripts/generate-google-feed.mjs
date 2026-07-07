import {
  buildGoogleMerchantXml,
  loadFeedProducts,
  writeYmlFile,
} from "./catalog-feed-core.mjs";

const OUTPUT_FILE = "public/google-products.xml";

const products = await loadFeedProducts();
const xml = buildGoogleMerchantXml(products);

await writeYmlFile(OUTPUT_FILE, xml);

console.log(`Google Merchant feed written: ${OUTPUT_FILE}`);
console.log(`Products exported: ${products.length}`);
