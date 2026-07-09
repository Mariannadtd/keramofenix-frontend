<script setup>
import { computed, watch } from "vue";
import Catalog from "./Catalog.vue";
import Search from "./Search.vue";
import Filter from "./UI/Filter.vue";
import Button from "./UI/Button.vue";
import SkeletonCard from "./UI/Preloader.vue";
import SeoTextBlock from "./SeoTextBlock.vue";
import { useCatalogPage } from "../composables/useCatalogPage";
import {
  applyMultiValueFilter,
  applyShowroomAvailabilityFilter,
  applySearch,
  applySingleValueFilters,
  normalizeFloorText,
  showroomAvailabilityFilter,
  sortByPrice,
  sortFilter,
} from "../lib/catalogFilters";
import { floorFormOptions } from "../lib/catalogSchema";

const props = defineProps({
  title: { type: String, default: "Напольные покрытия" },
  lockedForm: { type: String, default: "" },
  seoTitle: { type: String, default: "" },
  seoParagraphs: { type: Array, default: () => [] },
});

const defaultFilters = () => ({
  sort: "",
  isExhibit: "",
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
    options: floorFormOptions,
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
    options: [
      "матовая",
      "полуматовая",
      "глянцевая",
      "текстурная",
      "под дерево",
      "под камень",
    ],
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
  loadMore,
} = useCatalogPage({
  category: "floors",
  pageSize: props.lockedForm ? 80 : 40,
  defaultFilters,
  normalize: normalizeFloorText,
  autoResetEmptyState: !props.lockedForm,
  onLoadError: (error) => console.error("floors loadMore error:", error),
  processProducts: ({ products, searchQuery, filters }) => {
    let arr = applySearch(products, searchQuery, normalizeFloorText);
    const selectedForm = props.lockedForm || filters.form;
    const activeSimple = [
      "moistureresistance",
      "substrate",
      "installation",
      "format",
    ];

    if (props.lockedForm) {
      arr = applySingleValueFilters(
        arr,
        { form: props.lockedForm },
        ["form"],
        normalizeFloorText
      );
    } else {
      activeSimple.unshift("form");
    }

    if (isLaminate(selectedForm)) activeSimple.push("class", "type");
    if (isQuartzVinyl(selectedForm)) activeSimple.push("class", "structure");

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

    arr = applyShowroomAvailabilityFilter(
      arr,
      filters.isExhibit,
      normalizeFloorText
    );

    return sortByPrice(arr, filters.sort);
  },
});

const selectedForm = computed(() => props.lockedForm || filterState.value.form);
const visibleBaseFilters = computed(() =>
  props.lockedForm
    ? baseFilters.filter((filter) => filter.key !== "form")
    : baseFilters
);
const canShowEmptyState = computed(() => !props.lockedForm || !hasMore.value);

const filtersConfig = computed(() => {
  if (isLaminate(selectedForm.value))
    return [
      sortFilter,
      showroomAvailabilityFilter,
      ...visibleBaseFilters.value,
      ...lamFilters,
    ];
  if (isQuartzVinyl(selectedForm.value))
    return [
      sortFilter,
      showroomAvailabilityFilter,
      ...visibleBaseFilters.value,
      ...quartzFilters,
    ];
  return [sortFilter, showroomAvailabilityFilter, ...visibleBaseFilters.value];
});

watch(
  () => ({
    hasMore: hasMore.value,
    loading: loading.value,
    loadingMore: loadingMore.value,
    visibleCount: processed.value.length,
  }),
  ({ hasMore, loading, loadingMore, visibleCount }) => {
    if (!props.lockedForm || loading || loadingMore || !hasMore || visibleCount) {
      return;
    }

    loadMore();
  }
);
</script>

<template>
  <Catalog
    :title="props.title"
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
        v-if="props.seoTitle && props.seoParagraphs.length"
        :title="props.seoTitle"
        :paragraphs="props.seoParagraphs"
      />
    </template>
  </Catalog>

  <div ref="bottomEl" style="height: 1px"></div>

  <p v-if="!loading && loadingMore" class="no-results">Загружаю ещё…</p>
  <p
    v-else-if="!loading && !hasMore && processed.length"
    class="no-results"
  >
    Больше товаров нет
  </p>

  <p
    v-if="!loading && showNoResults && canShowEmptyState"
    class="no-results"
  >
    Товары с выбранными фильтрами отсутствуют!
  </p>
  <p
    v-else-if="!loading && !processed.length && canShowEmptyState"
    class="no-results"
  >
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
