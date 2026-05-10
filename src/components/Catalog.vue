<script setup>
import Card from "./Card.vue";
import SkeletonCard from "./UI/Preloader.vue";

const props = defineProps({
  title: { type: String, required: true },
  titleTag: { type: String, default: "h1" },
  products: { type: Array, default: () => [] },
  titleMargin: { type: String, default: "8rem auto 4rem" },
  loading: { type: Boolean, default: false },
  skeletonCount: { type: Number, default: 6 },
});
</script>

<template>
  <div class="catalog-root">
    <component :is="titleTag" class="heading-1">{{ title }}</component>

    <div v-auto-animate class="search-wrapper">
      <slot name="search" />
    </div>

    <div v-if="loading" class="cards">
      <slot name="loading">
        <SkeletonCard v-for="n in skeletonCount" :key="n" />
      </slot>
    </div>

    <TransitionGroup v-else name="cards" tag="div" class="cards">
      <Card
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="product.images?.[0] || ''"
        :title="product.name"
        :description="product.description"
        :price="product.price"
        :isHit="product.isHit"
        :isExhibit="product.isExhibit"
        :category="product.category"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped lang="sass">
@import "../assets/css/main.sass"

.catalog-root
  display: flex
  flex-direction: column

.cards
  display: grid
  gap: 1.5rem
  justify-items: center
  grid-template-columns: repeat(6, minmax(0, 1fr))
  @media (max-width: $x-large)
    grid-template-columns: repeat(3, minmax(0, 1fr))
  @media (max-width: $medium)
    grid-template-columns: repeat(2, minmax(0, 1fr))

:deep(.card),
:deep(.skeleton-card)
  width: 100%
  box-sizing: border-box
</style>
