import {
  buildYml,
  defaultDescription,
  isoYmlDate,
  loadFeedProducts,
  writeYmlFile,
} from "./catalog-feed-core.mjs";

const OUTPUT_FILE = "public/2gis-products.yml";

const products = await loadFeedProducts();
const yml = buildYml(products, {
  currencyId: "RUR",
  date: isoYmlDate,
  description: defaultDescription,
});

await writeYmlFile(OUTPUT_FILE, yml);

console.log(`2GIS feed written: ${OUTPUT_FILE}`);
console.log(`Products exported: ${products.length}`);
