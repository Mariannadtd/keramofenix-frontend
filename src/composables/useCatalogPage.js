import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { hasActiveFilters, normalizeText } from "../lib/catalogFilters";

const DEFAULT_PAGE_SIZE = 42;
const DEFAULT_ROOT_MARGIN = "900px";
const EMPTY_STATE_RESET_MS = 5000;

export function useCatalogPage({
  category,
  defaultFilters,
  processProducts,
  pageSize = DEFAULT_PAGE_SIZE,
  minLoadingMs = 0,
  normalize = normalizeText,
  includeSearchInEmptyState = true,
  autoResetEmptyState = true,
  onLoadError,
}) {
  const products = ref([]);
  const searchQuery = ref("");
  const loading = ref(true);
  const loadingMore = ref(false);
  const hasMore = ref(true);
  const lastDoc = ref(null);
  const bottomEl = ref(null);
  const controlsKey = ref(0);
  const filterKey = ref(0);
  const searchKey = ref(0);
  const filterState = ref(defaultFilters());
  const showNoResults = ref(false);

  let observer = null;
  let resetTimerId = null;

  const processed = computed(() =>
    processProducts({
      products: products.value,
      searchQuery: searchQuery.value,
      filters: filterState.value,
    })
  );

  async function loadMore() {
    if (loadingMore.value || !hasMore.value) return;
    loadingMore.value = true;

    try {
      const constraints = [
        where("category", "==", category),
        orderBy("createdAt", "desc"),
        limit(pageSize),
      ];

      const productsQuery = lastDoc.value
        ? query(
            collection(db, "products"),
            ...constraints.slice(0, 2),
            startAfter(lastDoc.value),
            constraints[2]
          )
        : query(collection(db, "products"), ...constraints);

      const snapshot = await getDocs(productsQuery);
      const batch = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      products.value.push(...batch);

      if (snapshot.docs.length) {
        lastDoc.value = snapshot.docs[snapshot.docs.length - 1];
      }
      if (snapshot.docs.length < pageSize) {
        hasMore.value = false;
      }
    } catch (error) {
      if (!onLoadError) throw error;
      onLoadError(error);
      hasMore.value = false;
    } finally {
      loadingMore.value = false;
    }
  }

  function resetFilters() {
    searchQuery.value = "";
    filterState.value = defaultFilters();
    controlsKey.value++;
    filterKey.value++;
    searchKey.value++;
  }

  function clearResetTimer() {
    if (!resetTimerId) return;
    clearTimeout(resetTimerId);
    resetTimerId = null;
  }

  onMounted(async () => {
    const started = Date.now();

    await loadMore();

    const remainingDelay = Math.max(0, minLoadingMs - (Date.now() - started));
    if (remainingDelay > 0) {
      setTimeout(() => {
        loading.value = false;
      }, remainingDelay);
    } else {
      loading.value = false;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: DEFAULT_ROOT_MARGIN }
    );

    if (bottomEl.value) observer.observe(bottomEl.value);
  });

  watch(
    () => ({
      len: processed.value.length,
      filters: { ...filterState.value },
      query: searchQuery.value,
    }),
    ({ len, filters, query }) => {
      const hasSearch = includeSearchInEmptyState && !!normalize(query);
      const hasAny = hasSearch || hasActiveFilters(filters, normalize);

      showNoResults.value = len === 0 && hasAny;

      if (showNoResults.value && autoResetEmptyState && !resetTimerId) {
        resetTimerId = setTimeout(() => {
          resetFilters();
          showNoResults.value = false;
          resetTimerId = null;
        }, EMPTY_STATE_RESET_MS);
      }

      if (!showNoResults.value) {
        clearResetTimer();
      }
    },
    { immediate: true, deep: true }
  );

  onBeforeUnmount(() => {
    if (observer) observer.disconnect();
    clearResetTimer();
  });

  return {
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
    loadMore,
  };
}
