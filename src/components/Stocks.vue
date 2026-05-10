<script setup>
const stocks = [
  {
    src: new URL("../assets/img/nonestandard.png", import.meta.url).href,
    title: "Нестандартные двери",
    text: "Изготовим полотно под ваш проем и поможем подобрать короб, наличники и фурнитуру.",
  },
  {
    src: new URL("../assets/img/firstPhoto1.png", import.meta.url).href,
    title: "Купи не выходя из дома",
    text: "Можно прислать фото и размеры, а мы подберем варианты по стилю, цене и наличию.",
  },
  {
    src: new URL("../assets/img/yamap.png", import.meta.url).href,
    title: "Два салона в Сочи",
    text: "Ждем вас на Гагарина 63 и Донской 3/3, чтобы показать образцы вживую.",
  },
  {
    src: new URL("../assets/img/percent.png", import.meta.url).href,
    title: "Рассрочка без переплат",
    text: "Поможем оформить покупку дверей, пола или керамогранита удобным способом.",
  },
];
</script>

<template>
  <section class="stocks" aria-labelledby="stocks-title">
    <h2 id="stocks-title" class="heading-1">Акции и предложения</h2>

    <ul class="stocks__grid">
      <li v-for="stock in stocks" :key="stock.title" class="stocks__card">
        <div class="stocks__image-wrap">
          <img :src="stock.src" :alt="stock.title" class="stocks__image" />
        </div>
        <div class="stocks__body">
          <h3>{{ stock.title }}</h3>
          <p>{{ stock.text }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="sass">
@import "../assets/css/main.sass"

.stocks
  padding: 2rem 0 4rem

.heading-1
  display: flex
  justify-content: center

.stocks__grid
  display: grid
  grid-template-columns: repeat(4, minmax(0, 1fr))
  gap: 1.5rem
  list-style: none
  margin: 0
  padding: 0

  @media (max-width: $x-large)
    grid-template-columns: repeat(2, minmax(0, 1fr))

  @media (max-width: $small)
    grid-template-columns: 1fr

.stocks__card
  display: flex
  flex-direction: column
  min-width: 0
  overflow: hidden
  background: #ffffffe8
  border: 1px solid rgba(0,0,0,.08)
  border-radius: .5rem

.stocks__image-wrap
  aspect-ratio: 16 / 10
  background: #f7f7f7
  overflow: hidden

.stocks__image
  display: block
  width: 100%
  height: 100%
  object-fit: cover

.stocks__body
  display: flex
  flex-direction: column
  gap: .65rem
  padding: 1.25rem

  h3
    margin: 0
    font-size: 1.45rem
    line-height: 1.2
    color: var(--third-color)

  p
    margin: 0
    font-size: 1.1rem
    line-height: 1.45
    color: rgba(0,0,0,.72)
</style>
