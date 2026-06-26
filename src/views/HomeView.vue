<script setup>
import { onMounted, ref, computed } from "vue";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import Button from "../components/UI/Button.vue";
import Modal from "../components/UI/Modal.vue";
import Catalog from "../components/Catalog.vue";
import Advantages from "../components/Advantages.vue";
import { useRouter } from "vue-router";
import ContactsSection from "../components/ContactsSection.vue";
import Stocks from "../components/Stocks.vue";
import { normalizeFloorText } from "../lib/catalogFilters";

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const showModal = ref(false);

function goTo(routeName) {
  router.push({ name: routeName }).catch(() => {});
}

const categoryLinks = [
  {
    title: "Межкомнатные двери",
    routeName: "interiors",
  },
  {
    title: "Входные двери",
    routeName: "exteriors",
  },
  {
    title: "Керамогранит",
    routeName: "porcelain-stoneware",
  },
  {
    title: "Напольные покрытия",
    routeName: "floors",
  },
  {
    title: "Фурнитура",
    routeName: "fittings",
  },
];

onMounted(async () => {
  try {
    const snapshot = await getDocs(collection(db, "products"));
    products.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("Ошибка загрузки продуктов:", e);
  } finally {
    loading.value = false;
  }
});

const interiors = computed(() =>
  products.value.filter((p) => p.category === "interiors"),
);
const exteriors = computed(() =>
  products.value.filter((p) => p.category === "exteriors"),
);
const floors = computed(() =>
  products.value.filter((p) => p.category === "floors"),
);
const porcelainStoneware = computed(() =>
  floors.value.filter((p) => normalizeFloorText(p.form) === "керамогранит"),
);
const fittings = computed(() =>
  products.value.filter((p) => p.category === "fittings"),
);

function getRandomItems(arr, count) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

const interiorsRandom = computed(() =>
  getRandomItems(interiors.value, Math.min(6, interiors.value.length)),
);
const exteriorsRandom = computed(() =>
  getRandomItems(exteriors.value, Math.min(6, exteriors.value.length)),
);
const floorsRandom = computed(() =>
  getRandomItems(floors.value, Math.min(6, floors.value.length)),
);
const porcelainStonewareRandom = computed(() =>
  getRandomItems(
    porcelainStoneware.value,
    Math.min(6, porcelainStoneware.value.length),
  ),
);
const fittingsRandom = computed(() =>
  getRandomItems(fittings.value, Math.min(6, fittings.value.length)),
);
</script>

<template>
  <h1 class="sr-only">
    Двери, керамогранит и напольные покрытия в Сочи — КерамоФеникс
  </h1>

  <section class="home-hero" aria-labelledby="home-hero-title">
    <div class="home-hero__inner">
      <nav class="home-hero__menu" aria-label="Основные категории">
        <button
          v-for="link in categoryLinks"
          :key="link.routeName"
          type="button"
          :class="[
            'home-hero__category',
            { 'home-hero__category--active': link.routeName === 'porcelain-stoneware' },
          ]"
          @click="goTo(link.routeName)"
        >
          <span>{{ link.title }}</span>
          <img
            class="home-hero__category-arrow"
            src="../assets/img/arrow-right.png"
            alt=""
            aria-hidden="true"
          />
        </button>
      </nav>

      <div class="home-hero__content">
        <p class="home-hero__eyebrow">2 салона в Сочи • замер • доставка</p>
        <h2 id="home-hero-title">
          Двери, керамогранит и напольные покрытия в Сочи
        </h2>
        <p>
          Подберем комплект под ваш ремонт, покажем образцы в салоне и поможем
          совместить двери, пол, плитку и фурнитуру в одном стиле.
        </p>

        <div class="home-hero__actions">
          <Button class="home__button home-hero__button" @click="showModal = true">
            Получить консультацию
          </Button>
        </div>
      </div>
    </div>
  </section>

  <section>
    <Catalog
      class="home__catalog"
      title="Межкомнатные двери"
      title-tag="h2"
      :products="interiorsRandom"
      :loading="loading"
    />
    <Button class="home__button" @click="goTo('interiors')">
      Показать ещё
      <img
        class="home__button_img"
        src="../assets/img/arrow-right.png"
        alt="arrow-right"
      />
    </Button>

    <Catalog
      class="home__catalog"
      title="Входные двери"
      title-tag="h2"
      :products="exteriorsRandom"
      :loading="loading"
    />
    <Button class="home__button" @click="goTo('exteriors')">
      Показать ещё
      <img
        class="home__button_img"
        src="../assets/img/arrow-right.png"
        alt="arrow-right"
      />
    </Button>

    <Catalog
      class="home__catalog"
      title="Керамогранит"
      title-tag="h2"
      :products="porcelainStonewareRandom"
      :loading="loading"
    />
    <Button class="home__button" @click="goTo('porcelain-stoneware')">
      Показать ещё
      <img
        class="home__button_img"
        src="../assets/img/arrow-right.png"
        alt="arrow-right"
      />
    </Button>

    <Catalog
      class="home__catalog"
      title="Напольные покрытия"
      title-tag="h2"
      :products="floorsRandom"
      :loading="loading"
    />
    <Button class="home__button" @click="goTo('floors')">
      Показать ещё
      <img
        class="home__button_img"
        src="../assets/img/arrow-right.png"
        alt="arrow-right"
      />
    </Button>

    <Catalog
      class="home__catalog"
      title="Фурнитура"
      title-tag="h2"
      :products="fittingsRandom"
      :loading="loading"
    />
    <Button class="home__button" @click="goTo('fittings')">
      Показать ещё
      <img
        class="home__button_img"
        src="../assets/img/arrow-right.png"
        alt="arrow-right"
      />
    </Button>
  </section>

  <Advantages />
  <Stocks />
  <ContactsSection title-tag="h2" />

  <Modal v-if="showModal" @close="showModal = false" />
</template>

<style scoped lang="sass">
@use "../assets/css/main.sass" as *
.sr-only
  position: absolute
  width: 1px
  height: 1px
  padding: 0
  margin: -1px
  overflow: hidden
  clip: rect(0, 0, 0, 0)
  white-space: nowrap
  border: 0

.home-hero
  margin-left: calc(50% - 50vw)
  margin-right: calc(50% - 50vw)

.home-hero__inner
  max-width: 1530px
  margin: 0 auto
  padding: 3.5rem 3rem
  display: grid
  grid-template-columns: minmax(24rem, 34rem) minmax(0, 1fr)
  gap: 4rem
  align-items: stretch

  @media (max-width: $large)
    grid-template-columns: 1fr
    gap: 2.5rem

  @media (max-width: $medium)
    padding: 3rem 1.5rem

.home-hero__menu
  display: flex
  flex-direction: column
  justify-content: space-between
  gap: .85rem

.home-hero__category
  display: flex
  align-items: center
  justify-content: space-between
  gap: 1rem
  width: 100%
  padding: 1.05rem 1.3rem
  border: 1px solid rgba(227,80,25,.35)
  border-radius: .5rem
  background: rgba(255,255,255,.86)
  color: #000
  text-align: left
  cursor: pointer
  transition: border-color .2s ease, transform .2s ease, color .2s ease, background .2s ease

  &:hover
    border-color: var(--third-color)
    color: var(--third-color)
    transform: translateX(.25rem)

  span
    font-size: 1.35rem
    font-weight: 800
    text-transform: uppercase

.home-hero__category--active
  background: rgba(255,255,255,.86)
  backdrop-filter: blur(6px)
  -webkit-backdrop-filter: blur(6px)

.home-hero__category-arrow
  flex: none
  width: 1.65rem
  height: 1.65rem
  object-fit: contain
  filter: invert(41%) sepia(80%) saturate(2065%) hue-rotate(353deg) brightness(95%) contrast(89%)
  transition: transform .2s ease

.home-hero__category:hover .home-hero__category-arrow
  transform: translateX(.25rem)

.home-hero__content
  min-width: 0
  justify-self: start
  width: min(100%, 78rem)
  height: 100%
  padding: 2.4rem
  display: flex
  flex-direction: column
  justify-content: center
  background: #ffffffcc
  border: 1px solid rgba(0,0,0,.06)
  border-radius: .5rem
  box-shadow: 0 .8rem 2rem rgba(0,0,0,.06)
  backdrop-filter: blur(2px)
  -webkit-backdrop-filter: blur(2px)

  @media (max-width: $large)
    order: -1

  @media (max-width: $medium)
    padding: 2rem

  h2
    max-width: 74rem
    margin: 0
    font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
    font-size: 3.4rem
    line-height: 1.12

    @media (max-width: $small)
      font-size: 2.8rem

  p
    max-width: 66rem
    margin: 1.4rem 0 0
    font-size: 1.45rem
    line-height: 1.55
    color: rgba(0,0,0,.74)

.home-hero__eyebrow
  margin: 0 0 .9rem !important
  color: var(--third-color) !important
  font-weight: 800
  letter-spacing: 0
  text-transform: uppercase

.home-hero__actions
  display: flex
  flex-wrap: wrap
  gap: 1rem
  margin-top: 2rem

.home__button.home-hero__button
  margin: 0

.home
  &__button
    font-size: 1.4rem
    display: flex
    align-items: center
    margin: 3.5rem auto 2rem
    color: white
    background-color: var(--third-color)
    transition: transform 0.5s ease
    &:hover
      .home__button_img
        transform: translateX(5px) scale(1.2)
    &_img
      filter: invert(1) brightness(1.5)
      margin-left: 1rem
      width: 2rem
      height: 2rem

.skeleton-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
  gap: 1rem
</style>
