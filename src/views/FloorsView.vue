<script setup>
import { computed } from "vue";
import Catalog from "../components/Catalog.vue";
import Search from "../components/Search.vue";
import Filter from "../components/UI/Filter.vue";
import Button from "../components/UI/Button.vue";
import SkeletonCard from "../components/UI/Preloader.vue";
import { useCatalogPage } from "../composables/useCatalogPage";
import {
  applyMultiValueFilter,
  applySearch,
  applySingleValueFilters,
  normalizeFloorText,
  sortByPrice,
  sortFilter,
} from "../lib/catalogFilters";

const defaultFilters = () => ({
  sort: "",
  form: "",
  structure: "",
  class: "",
  type: "",
  moistureresistance: "",
  substrate: "",
  installation: "",
  format: "",
  surface: [],
});

const isLaminate = (value) => normalizeFloorText(value) === "ламинат";
const isQuartzVinyl = (value) => normalizeFloorText(value) === "кварцвинил";

const baseFilters = [
  {
    key: "form",
    label: "Вид",
    type: "select",
    options: ["ламинат", "кварцвинил"],
  },
  {
    key: "moistureresistance",
    label: "Влагостойкость",
    type: "select",
    options: ["да", "нет"],
  },
  {
    key: "substrate",
    label: "Встроенная подложка",
    type: "select",
    options: ["да", "нет"],
  },
  {
    key: "installation",
    label: "Монтаж",
    type: "select",
    options: ["Клеится на основание", "Плавающий, замок", "Замковый"],
  },
  {
    key: "format",
    label: "Формат",
    type: "select",
    options: ["Плитка ", "палуба", "ёлочка"],
  },
  {
    key: "surface",
    label: "Поверхность",
    type: "multiselect",
    options: ["матовая", "глянцевая", "текстурная", "под дерево", "под камень"],
  },
];

const lamFilters = [
  {
    key: "class",
    label: "Класс износостойкости",
    type: "select",
    options: ["31", "32", "33", "34", "42", "43", "53"],
  },
  {
    key: "type",
    label: "Тип планки",
    type: "select",
    options: ["1-полосный", "2-полосный", "3-полосный", "Мультиполосный"],
  },
];

const quartzFilters = [
  {
    key: "structure",
    label: "Тип кварцвинила",
    type: "select",
    options: [
      "LVT(кварцвинил)",
      "SPC(Каменно-полимерная плитка)",
      "WPC(древесно-полимерная плитка)",
    ],
  },
  {
    key: "class",
    label: "Класс износостойкости",
    type: "select",
    options: ["31", "32", "33", "34", "42", "43", "53"],
  },
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
  category: "floors",
  pageSize: 40,
  defaultFilters,
  normalize: normalizeFloorText,
  onLoadError: (error) => console.error("floors loadMore error:", error),
  processProducts: ({ products, searchQuery, filters }) => {
    let arr = applySearch(products, searchQuery, normalizeFloorText);
    const activeSimple = [
      "form",
      "moistureresistance",
      "substrate",
      "installation",
      "format",
    ];

    if (isLaminate(filters.form)) activeSimple.push("class", "type");
    if (isQuartzVinyl(filters.form)) activeSimple.push("class", "structure");

    arr = applySingleValueFilters(
      arr,
      filters,
      activeSimple,
      normalizeFloorText
    );

    arr = applyMultiValueFilter(
      arr,
      filters.surface,
      "surface",
      normalizeFloorText
    );

    return sortByPrice(arr, filters.sort);
  },
});

const filtersConfig = computed(() => {
  if (isLaminate(filterState.value.form))
    return [sortFilter, ...baseFilters, ...lamFilters];
  if (isQuartzVinyl(filterState.value.form))
    return [sortFilter, ...baseFilters, ...quartzFilters];
  return [sortFilter, ...baseFilters];
});
</script>

<template>
  <Catalog
    title="Напольные покрытия"
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
@import "../assets/css/main.sass"
@import "../assets/css/catalog-page.sass"

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
