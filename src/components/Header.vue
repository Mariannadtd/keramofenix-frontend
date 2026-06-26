<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Button from "./UI/Button.vue";
import Modal from "./UI/Modal.vue";
import SocialLinks from "./SocialLinks.vue";
import { RouterLink } from "vue-router";

const links = [
  { name: "Межкомнатные двери", href: "/interiors", class: "first__link" },
  { name: "Входные двери", href: "/exteriors", class: "second__link" },
  { name: "Напольные покрытия", href: "/floors", class: "first__link" },
  { name: "Керамогранит", href: "/porcelain-stoneware", class: "first__link" },
  { name: "Фурнитура", href: "/fittings", class: "first__link" },
  { name: "О нас", href: "/about", class: "first__link" },
  { name: "Контакты", href: "/contacts", class: "first__link" },
  { name: "Главная", href: "/", class: "first__link" },
  { name: "Админ", href: "/login", class: "first__link" },
];

const showModal = ref(false);
const showNav = ref(false);
const headerRef = ref(null);
const navRef = ref(null);
const navAnchorRef = ref(null);
const isNavPinned = ref(false);
const navHeight = ref(0);
const mobileHeaderHeight = ref(0);

const DESKTOP_NAV_MIN_WIDTH = 993;

function handleClick() {
  showModal.value = true;
}

function toggleNav() {
  showNav.value = !showNav.value;
}

function closeNav() {
  showNav.value = false;
}

function isDesktopNav() {
  return window.innerWidth >= DESKTOP_NAV_MIN_WIDTH;
}

function navAnchorTop() {
  if (!navAnchorRef.value) return 0;
  return navAnchorRef.value.getBoundingClientRect().top + window.scrollY;
}

function updateNavPin() {
  if (!isDesktopNav()) {
    isNavPinned.value = false;
    return;
  }

  navHeight.value = navRef.value?.offsetHeight || navHeight.value;
  isNavPinned.value = window.scrollY >= navAnchorTop();
}

function measureHeader() {
  mobileHeaderHeight.value = headerRef.value?.offsetHeight || 0;
}

function measureLayout() {
  measureHeader();
  navHeight.value = navRef.value?.offsetHeight || 0;
  updateNavPin();
}

watch(showNav, (isOpen) => {
  if (isOpen) measureHeader();
  document.body.style.overflow = isOpen ? "hidden" : "";
});

onMounted(() => {
  requestAnimationFrame(measureLayout);
  window.addEventListener("scroll", updateNavPin, { passive: true });
  window.addEventListener("resize", measureLayout);
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("scroll", updateNavPin);
  window.removeEventListener("resize", measureLayout);
});
</script>

<template>
  <header ref="headerRef" class="site-header" v-auto-animate>
    <div class="header__top">
      <button
        :class="['burger', { open: showNav }]"
        @click="toggleNav"
        :aria-expanded="showNav"
        aria-controls="main-nav"
        aria-label="Меню"
      >
        <span></span><span></span><span></span>
      </button>

      <a href="/" class="header__logo_group">
        <img
          class="header__logo_img"
          src="../assets/img/logo.png"
          alt="Логотип"
        />
        <div>
          <p class="header__logo">КерамоФеникс</p>
          <span class="header__par">двери пол плитка</span>
        </div>
      </a>

      <router-link to="/contacts" class="header__geo">
        <img src="../assets/img/geo.png" alt="Геолокация" />
        <span
          >Сочи, ул. Гагарина, 63<br />Донская 3/3<br />Ежедневно с 9:00 до
          21:00</span
        >
      </router-link>

      <div class="header__call">
        <p>Вам перезвонить?</p>
        <Button @click="handleClick">+7 988 406-88-87</Button>
      </div>

      <SocialLinks />
    </div>
  </header>

  <div
    ref="navAnchorRef"
    class="nav-anchor"
    :style="{ height: isNavPinned ? `${navHeight}px` : '0px' }"
  ></div>

  <nav
    id="main-nav"
    ref="navRef"
    v-auto-animate
    :class="[
      'nav-container',
      { nav__active: showNav, nav__pinned: isNavPinned },
    ]"
    :style="{ '--mobile-header-height': `${mobileHeaderHeight}px` }"
  >
    <ul class="nav">
      <li v-for="link in links" :key="link.name">
        <RouterLink
          :to="link.href"
          :class="link.class"
          exact-active-class="is-active"
          @click="closeNav"
        >
          {{ link.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>

  <Modal v-if="showModal" @close="showModal = false" />
</template>

<style scoped lang="sass">
@use "../assets/css/main.sass" as *

.lg
  font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
  font-weight: 800
  font-size: 3rem
  color: var(--main-color)

.site-header
  position: relative
  z-index: 90
  padding: 0
  background-color: #fff
  margin-left:  calc(50% - 50vw)
  margin-right: calc(50% - 50vw)

  .header__top
    width: 100%
    max-width: none
    margin: 0 auto
    padding: 0 3rem
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1rem
    @media (max-width: $xx-large)
      padding-left: 2rem
      padding-right: 2rem

  .header__logo
    margin: 0
    line-height: 1.05
    font-family: 'Montserrat', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
    font-size: 1.5rem
    font-weight: 800
    color: var(--third-color)
    display: flex
    align-items: center
    @media (max-width: $small)
      font-size: 1.2rem

  .header__logo_group
    display: flex
    flex-direction: row
    align-items: center
    gap: .4rem
    text-decoration: none
    margin: 0
    padding: 0
    margin-inline-start: -1rem

  .header__logo_img
    width: 4rem
    display: block
    margin: 0
    padding: 0.5rem
    @media (max-width: $small)
      width: 3rem
      padding-right: .7rem !important

  .header__geo
    display: flex
    align-items: center
    gap: 1rem
    font-size: 1.2rem
    @media (max-width: $small)
      display: none
    img
      width: 2.5rem

  .header__call
    display: flex
    align-items: baseline
    gap: 1rem
    p
      font-size: 1.4rem
      @media (max-width: $small)
        font-size: 1rem

nav.nav-container
  position: relative
  z-index: 80
  margin-left:  calc(50% - 50vw)
  margin-right: calc(50% - 50vw)
  background: white
  border-top:    1px solid var(--second-color)
  border-bottom: 1px solid var(--second-color)
  padding:       1.5rem 3rem
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.20)

  .nav
    width: 100%
    max-width: none !important
    font-family: 'Roboto', sans-serif
    font-weight: 400
    margin: 0 auto
    display: flex
    justify-content: space-between
    gap: 1rem
    flex-wrap: wrap
    list-style: none
    @media (min-width: $xx-large)
      gap: 1.8rem

    li a
      display: block
      font-size:      1.15rem
      line-height: 1.2
      text-align: center
      text-transform: uppercase
      font-weight:    bold
      color:          #000
      transition:     color .3s
      @media (min-width: $xx-large)
        font-size: 1.3rem
      @media (min-width: $xxx-large)
        font-size: 1.5rem
      @media (max-width: $large)
        font-size: 2rem
      &:hover,
      &.is-active
        color: var(--third-color)

.nav-anchor
  height: 0
  flex: none

nav.nav-container.nav__pinned
  position: fixed
  top: 0
  left: 0
  right: 0
  margin-left: 0
  margin-right: 0
  z-index: 1000

.burger
  display: none
  background: none
  border: none
  cursor: pointer
  flex-direction: column
  gap: 4px
  padding: 10px
  margin-left: -10px
  margin-right: -10px

  span
    display: block
    width: 20px
    height: 2px
    background: #000
    transition: transform .3s ease, opacity .3s ease
    transform-origin: center

.burger:focus
  outline: none

.burger.open span:nth-child(1)
  transform: translateY(6px) rotate(45deg)

.burger.open span:nth-child(2)
  opacity: 0

.burger.open span:nth-child(3)
  transform: translateY(-6px) rotate(-45deg)

@media (max-width: $large)
  .burger
    display: flex

  .site-header
    z-index: 1100
    position: sticky
    top: 0
    border-bottom: 1px solid var(--second-color)
    box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.20)

  nav.nav-container
    position: fixed
    top: var(--mobile-header-height, 0px)
    right: 0
    bottom: 0
    left: 0
    z-index: 1000
    width: 100vw
    height: calc(100dvh - var(--mobile-header-height, 0px))
    min-height: calc(100dvh - var(--mobile-header-height, 0px))
    margin: 0
    padding: 0
    border: none
    background: white
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    overflow-y: auto
    transform: translateX(100%)
    opacity: 0
    visibility: hidden
    pointer-events: none
    box-shadow: -24px 0 48px rgba(0, 0, 0, .18)
    transition: transform .35s ease, opacity .25s ease, visibility 0s linear .35s

    .nav
      width: min(100%, 42rem)
      max-width: 42rem !important
      flex-direction: column
      justify-content: center
      align-items: stretch
      margin: 0 auto
      padding: 2rem
      gap: 0

      li
        border-bottom: 1px solid rgba(0, 0, 0, .08)

        a
          display: flex
          justify-content: center
          padding: 1.3rem 0
          font-size: 2.2rem
          text-align: center

  nav.nav-container.nav__active
    transform: translateX(0)
    opacity: 1
    visibility: visible
    pointer-events: auto
    transition: transform .35s ease, opacity .25s ease

  nav.nav-container.nav__pinned
    position: fixed
    top: var(--mobile-header-height, 0px)
    right: 0
    bottom: 0
    left: 0
    margin: 0

  .header__call p
    display: none

@media (max-width: $small)
  .header__logo_group
    display: flex !important
    gap: 0 !important
  .header__logo_group > .header__logo
    margin-left: -0.5rem !important
    line-height: 1.05
  .header__logo_group > .header__logo_img
    margin-right: -0.5rem !important
  .header__logo
    margin-right: 0 !important
  .site-header .header__top
    gap: .6rem !important
    padding-left: 1.5rem
    padding-right: 1.5rem
  .header__call
    :deep(button)
      font-size: 1.2rem
      padding: .4rem .4rem
</style>
