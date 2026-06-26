<script setup>
defineProps({
  title: { type: String, required: true },
  paragraphs: { type: Array, default: () => [] },
});
</script>

<template>
  <section class="seo-text" aria-label="Дополнительная информация">
    <h2>{{ title }}</h2>
    <div class="seo-text__copy">
      <p v-for="paragraph in paragraphs" :key="paragraph">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "../assets/css/main.sass" as *

.seo-text
  max-width: 118rem
  width: min(100%, calc(100% - 3rem))
  margin: 4rem auto 1rem
  padding-top: 2.4rem
  border-top: 1px solid rgba(0,0,0,.12)

  h2
    margin: 0 0 1.2rem
    font-size: 2rem
    line-height: 1.25
    color: #000

.seo-text__copy
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 1.2rem 2.2rem

  p
    margin: 0
    font-size: 1.2rem
    line-height: 1.6
    color: rgba(0,0,0,.72)

@media (max-width: $medium)
  .seo-text
    width: min(100%, calc(100% - 2rem))
    margin-top: 3rem

  .seo-text__copy
    grid-template-columns: 1fr
</style>
