<script setup>
import { computed } from "vue";
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
import {
  colorOptions,
  fittingsGroups,
  fittingsGroupOptions,
  fittingsSubtypesByGroup,
} from "../lib/catalogSchema";

const initialFilterState = () => ({
  sort: "",
  fittingGroup: "",
  fittingSubtype: "",
  color: "",
  lockType: "",
  latchMaterial: "",
  securityClass: "",
  backset: "",
  purpose: "",
  installType: "",
  latchType: "",
  size: "",
  keys: "",
  protection: [],
  side: "",
  bearing: "",
  baseShape: "",
  mechanism: "",
  centerDistance: "",
  rosette: "",
  set: "",
  rollersCount: "",
  mount: "",
  doorweight: "",
  closingSpeed: "",
  length: "",
});

const baseFilters = [
  {
    key: "fittingGroup",
    label: "Подвид",
    type: "select",
    options: fittingsGroupOptions,
  },
  {
    key: "color",
    label: "Цвет/отделка",
    type: "select",
    options: colorOptions,
  },
];

const simpleFilterKeys = ["fittingGroup", "fittingSubtype", "color"];

const seoParagraphs = [
  "Фурнитура для дверей в Сочи нужна не только для внешнего вида, но и для удобства ежедневного использования. В каталоге можно подобрать ручки, замки, защелки, петли, раздвижные системы и комплектующие под выбранные межкомнатные или входные двери.",
  "Помогаем совместить цвет, тип механизма, назначение и комплектацию, чтобы фурнитура подходила к полотну и условиям эксплуатации. Образцы доступны в салонах КерамоФеникс на ул. Гагарина, 63 и ул. Донская, 3/3.",
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
  category: "fittings",
  pageSize: 40,
  minLoadingMs: 500,
  defaultFilters: initialFilterState,
  includeSearchInEmptyState: false,
  onLoadError: (error) => console.error("fittings loadMore error:", error),
  processProducts: ({ products, searchQuery, filters }) => {
    const searched = applySearch(products, searchQuery);
    const filtered = applySingleValueFilters(
      searched,
      filters,
      simpleFilterKeys
    );
    return sortByPrice(filtered, filters.sort);
  },
});

const subtypeOptions = computed(() => {
  const groupLabel = filterState.value.fittingGroup;
  const group = fittingsGroups.find((g) => g.label === groupLabel);
  return group ? fittingsSubtypesByGroup[group.value] || [] : [];
});

const filtersConfig = computed(() => {
  const conf = [sortFilter, ...baseFilters];
  if (filterState.value.fittingGroup) {
    conf.splice(2, 0, {
      key: "fittingSubtype",
      label: "Тип",
      type: "select",
      options: subtypeOptions.value,
    });
  }
  return conf;
});
</script>

<template>
  <Catalog
    title="Купить дверную фурнитуру в Сочи"
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
        title="Дверная фурнитура с подбором под комплект"
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

@media (max-width: $large)
  .filters-row
    grid-template-columns: 1fr
    justify-items: center

  .btn-reset
    grid-column: 1 / -1
    justify-self: center
    padding-top: 0.65rem
    padding-bottom: 0.65rem

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
