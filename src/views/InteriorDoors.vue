<script setup>
import Catalog from "../components/Catalog.vue";
import Search from "../components/Search.vue";
import Filter from "../components/UI/Filter.vue";
import Button from "../components/UI/Button.vue";
import SkeletonCard from "../components/UI/Preloader.vue";
import SeoTextBlock from "../components/SeoTextBlock.vue";
import { useCatalogPage } from "../composables/useCatalogPage";
import {
  applyShowroomAvailabilityFilter,
  applySearch,
  applySingleValueFilters,
  showroomAvailabilityFilter,
  sortByPrice,
  sortFilter,
} from "../lib/catalogFilters";

const defaultFilters = () => ({
  sort: "",
  isExhibit: "",
  form: "",
});

const filtersConfig = [
  sortFilter,
  showroomAvailabilityFilter,
  {
    key: "form",
    label: "Вид",
    type: "select",
    options: ["глухая", "с остеклением", "с зеркалом"],
  },
];

const seoParagraphs = [
  "В КерамоФеникс можно купить межкомнатные двери в Сочи для квартиры, дома или коммерческого помещения. В салонах показываем живые образцы полотен, оттенков, покрытий и фурнитуры, чтобы дверь совпала с полом, стенами и общим стилем ремонта.",
  "Помогаем подобрать комплект по размеру проема, бюджету и условиям эксплуатации: полотно, короб, наличники, доборы, ручки и петли. Работаем с адресами в Сочи, консультируем по замеру и доставке из салонов на ул. Гагарина, 63 и ул. Донская, 3/3.",
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
    const filtered = applyShowroomAvailabilityFilter(
      applySingleValueFilters(searched, filters, ["form"]),
      filters.isExhibit
    );
    return sortByPrice(filtered, filters.sort);
  },
});
</script>

<template>
  <Catalog
    title="Купить межкомнатные двери в Сочи"
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
        title="Межкомнатные двери в Сочи с подбором в салоне"
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
