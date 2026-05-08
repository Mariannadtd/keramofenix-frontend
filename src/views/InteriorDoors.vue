<script setup>
import Catalog from "../components/Catalog.vue";
import Search from "../components/Search.vue";
import Filter from "../components/UI/Filter.vue";
import Button from "../components/UI/Button.vue";
import SkeletonCard from "../components/UI/Preloader.vue";
import { useCatalogPage } from "../composables/useCatalogPage";
import {
  applySearch,
  applySingleValueFilters,
  sortByPrice,
  sortFilter,
} from "../lib/catalogFilters";

const defaultFilters = () => ({
  sort: "",
  form: "",
});

const filtersConfig = [
  sortFilter,
  {
    key: "form",
    label: "Вид",
    type: "select",
    options: ["глухая", "с остеклением", "с зеркалом"],
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
  category: "interiors",
  pageSize: 42,
  minLoadingMs: 500,
  defaultFilters,
  processProducts: ({ products, searchQuery, filters }) => {
    const searched = applySearch(products, searchQuery);
    const filtered = applySingleValueFilters(searched, filters, ["form"]);
    return sortByPrice(filtered, filters.sort);
  },
});
</script>

<template>
  <Catalog
    title="Межкомнатные двери"
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

@media (max-width: $small)
  .search-wrap
    max-width: 100%
  .filters-row
    grid-template-columns: 1fr
    justify-items: center
  .btn-reset
    grid-column: 1 / -1
    justify-self: center
    padding-top: 0.65rem
    padding-bottom: 0.65rem
</style>
