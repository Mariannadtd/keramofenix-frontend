<script setup>
import Catalog from "../components/Catalog.vue";
import Search from "../components/Search.vue";
import Filter from "../components/UI/Filter.vue";
import Button from "../components/UI/Button.vue";
import SkeletonCard from "../components/UI/Preloader.vue";
import SeoTextBlock from "../components/SeoTextBlock.vue";
import { useCatalogPage } from "../composables/useCatalogPage";
import {
  applySearch,
  applySingleValueFilters,
  sortByPrice,
  sortFilter,
} from "../lib/catalogFilters";
import { exteriorFormOptions } from "../lib/catalogSchema";

const defaultFilters = () => ({
  sort: "",
  form: "",
  side: "",
  latch: "",
  thermalbreak: "",
});

const baseFilters = [
  {
    key: "form",
    label: "Вид",
    type: "select",
    options: exteriorFormOptions,
  },
  {
    key: "side",
    label: "Сторона открывания",
    type: "select",
    options: ["правая", "левая", "и правая и левая"],
  },
  {
    key: "latch",
    label: "Ночная задвижка",
    type: "select",
    options: ["есть", "нет"],
  },
  {
    key: "thermalbreak",
    label: "Терморазрыв",
    type: "select",
    options: ["да", "нет"],
  },
];

const filtersConfig = [sortFilter, ...baseFilters];

const filterKeys = baseFilters.map((filter) => filter.key);

const seoParagraphs = [
  "Входные двери в Сочи подбираем для квартиры, частного дома и помещений с разными требованиями к теплоизоляции, замкам и стороне открывания. В каталоге можно выбрать модели с терморазрывом, зеркалом, ковкой и разными вариантами отделки.",
  "Перед покупкой поможем сверить размеры, комплектацию и фурнитуру, объясним разницу по конструкциям и назначению. Образцы можно посмотреть в салонах КерамоФеникс на ул. Гагарина, 63 и ул. Донская, 3/3, также консультируем по доставке и замеру.",
];

const {
  products,
  searchQuery,
  loading,
  loadingMore,
  hasMore,
  bottomEl,
  controlsKey,
  filterKey,
  searchKey,
  filterState,
  processed,
  showNoResults,
  resetFilters,
} = useCatalogPage({
  category: "exteriors",
  pageSize: 42,
  defaultFilters,
  processProducts: ({ products, searchQuery, filters }) => {
    const searched = applySearch(products, searchQuery);
    const filtered = applySingleValueFilters(searched, filters, filterKeys);
    return sortByPrice(filtered, filters.sort);
  },
});
</script>

<template>
  <Catalog
    title="Купить входные двери в Сочи"
    :products="loading ? [] : processed"
    :loading="loading"
    title-margin="4rem auto 2rem"
  >
    <template #search>
      <div class="catalog-controls" :key="controlsKey">
        <div class="search-wrap">
          <Search :key="searchKey" v-model="searchQuery" :debounce="500" />
        </div>

        <div class="filters-row">
          <Filter
            :key="filterKey"
            v-model="filterState"
            :filters="filtersConfig"
          />
          <Button type="button" @click="resetFilters" class="btn-reset">
            Сбросить фильтры
          </Button>
        </div>
      </div>
    </template>

    <template #loading>
      <SkeletonCard v-for="n in 6" :key="n" />
    </template>

    <template #after>
      <SeoTextBlock
        title="Входные двери для квартиры и дома"
        :paragraphs="seoParagraphs"
      />
    </template>
  </Catalog>

  <div ref="bottomEl" style="height: 1px"></div>

  <p v-if="!loading && loadingMore" class="no-results">Загружаю ещё…</p>
  <p v-else-if="!loading && !hasMore && products.length" class="no-results">
    Больше товаров нет
  </p>

  <p v-if="!loading && showNoResults" class="no-results">
    Товары с выбранными фильтрами отсутствуют!
  </p>
  <p v-else-if="!loading && !processed.length" class="no-results">
    Ничего не найдено<span v-if="searchQuery"> «{{ searchQuery }}»</span>.
  </p>
</template>

<style scoped lang="sass">
@use "../assets/css/main.sass" as *
@use "../assets/css/catalog-page.sass" as *

@media (max-width: 1200px)
  .filters-row
    grid-template-columns: 1fr
    justify-items: center

  .btn-reset
    grid-column: 1 / -1
    justify-self: center
    padding-top: 0.65rem
    padding-bottom: 0.65rem
</style>
