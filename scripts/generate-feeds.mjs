import {
  buildSitemapXml,
  buildYml,
  defaultDescription,
  isoYmlDate,
  loadFeedProducts,
  writeYmlFile,
  yandexDescription,
  yandexYmlDate,
} from "./catalog-feed-core.mjs";

const products = await loadFeedProducts();

await Promise.all([
  writeYmlFile(
    "public/2gis-products.yml",
    buildYml(products, {
      currencyId: "RUR",
      date: isoYmlDate,
      description: defaultDescription,
    }),
  ),
  writeYmlFile(
    "public/yandex-products.yml",
    buildYml(products, {
      currencyId: "RUR",
      date: yandexYmlDate,
      description: yandexDescription,
      includeVendor: false,
      nameMaxLength: 250,
    }),
  ),
  writeYmlFile("public/sitemap.xml", buildSitemapXml(products)),
]);

console.log(
  "Files written: public/2gis-products.yml, public/yandex-products.yml, public/sitemap.xml",
);
console.log(`Products exported: ${products.length}`);
