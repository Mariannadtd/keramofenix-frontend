import {
  buildYml,
  loadFeedProducts,
  writeYmlFile,
  yandexDescription,
  yandexYmlDate,
} from "./catalog-feed-core.mjs";

const OUTPUT_FILE = "public/yandex-products.yml";

const products = await loadFeedProducts();
const yml = buildYml(products, {
  currencyId: "RUR",
  date: yandexYmlDate,
  description: yandexDescription,
  includeVendor: false,
  nameMaxLength: 250,
});

await writeYmlFile(OUTPUT_FILE, yml);

console.log(`Yandex feed written: ${OUTPUT_FILE}`);
console.log(`Products exported: ${products.length}`);
