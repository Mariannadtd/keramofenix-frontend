<script setup>
import { RouterLink } from "vue-router";
import { SITE_PHONE } from "../lib/seo";
import { contactCategoryLinks, contactLocations } from "../lib/contacts";

defineProps({
  titleTag: { type: String, default: "h1" },
});

const phoneHref = `tel:${SITE_PHONE.replace(/[^\d+]/g, "")}`;
const whatsappHref = "https://wa.me/79884068887?text=Здравствуйте";
</script>

<template>
  <section class="contacts-page" aria-labelledby="contacts-title">
    <header class="contacts-hero">
      <p class="contacts-hero__eyebrow">2 салона в Сочи</p>
      <component :is="titleTag" id="contacts-title">
        Контакты КерамоФеникс
      </component>

      <div class="contacts-hero__actions" aria-label="Быстрая связь">
        <a class="contacts-button" :href="phoneHref">{{ SITE_PHONE }}</a>
        <a
          class="contacts-button contacts-button--light"
          :href="whatsappHref"
          target="_blank"
          rel="noopener"
        >
          Написать в WhatsApp
        </a>
      </div>
    </header>

    <div class="contacts-locations" aria-label="Адреса салонов">
      <article
        v-for="location in contactLocations"
        :key="location.street"
        class="contacts-location"
      >
        <h3>{{ location.title }}</h3>
        <address>
          {{ location.locality }}, {{ location.street }}
        </address>
        <p class="contacts-location__hours">Ежедневно с 9:00 до 21:00</p>
        <p>{{ location.description }}</p>
        <div class="contacts-location__map">
          <iframe
            :src="location.mapSrc"
            :title="`${location.title}: ${location.locality}, ${location.street}`"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
        <a
          class="contacts-location__link"
          :href="location.mapLink"
          target="_blank"
          rel="noopener"
        >
          <span class="contacts-location__link-icon" aria-hidden="true"></span>
          Открыть в Яндекс Картах
        </a>
      </article>
    </div>

    <section class="contacts-info" aria-labelledby="contacts-info-title">
      <div>
        <h3 id="contacts-info-title">Что можно сделать в салоне</h3>
        <ul>
          <li>Посмотреть живые образцы материалов и покрытий.</li>
          <li>Подобрать комплект: двери, пол, плитку, погонаж и фурнитуру.</li>
          <li>Уточнить сроки, доставку, замер и совместимость выбранных товаров.</li>
        </ul>
      </div>

      <nav class="contacts-categories" aria-label="Категории каталога">
        <RouterLink
          v-for="link in contactCategoryLinks"
          :key="link.to"
          :to="link.to"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </section>
  </section>
</template>

<style lang="sass" scoped>
@use "../assets/css/main.sass" as *

.contacts-page
  padding-bottom: 4rem

.contacts-hero
  max-width: 960px
  margin: 0 auto 1.75rem
  padding: 3rem 0 .5rem
  text-align: center

  h1,
  h2
    display: block
    margin: .5rem 0 1.5rem
    font-size: 2.8rem
    line-height: 1.15

.contacts-hero__eyebrow
  color: var(--third-color)
  font-weight: 800
  text-transform: uppercase

.contacts-hero__actions
  display: flex
  flex-wrap: wrap
  justify-content: center
  gap: 1rem
  margin-top: 2rem

.contacts-button
  display: inline-flex
  align-items: center
  justify-content: center
  min-height: 3.4rem
  padding: .8rem 1.4rem
  border: 1px solid var(--third-color)
  border-radius: .5rem
  background: var(--third-color)
  color: #fff !important
  font-size: 1.2rem
  font-weight: 800

.contacts-button--light
  background: #fff
  color: var(--third-color) !important

.contacts-locations
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 1.5rem
  max-width: 1100px
  margin: 0 auto 2rem

.contacts-location
  padding: 1.5rem
  border: 1px solid rgba(0,0,0,.08)
  border-radius: .5rem
  background: rgba(255,255,255,.9)
  box-shadow: 0 .4rem 1.2rem rgba(0,0,0,.05)

  h3
    margin: 0 0 .8rem
    font-size: 1.7rem

  address
    font-style: normal
    font-size: 1.45rem
    font-weight: 800

  p
    margin-top: .8rem
    font-size: 1.2rem
    line-height: 1.55

.contacts-location__map
  position: relative
  height: 23rem
  margin-top: 1.2rem
  overflow: hidden
  border-radius: .5rem
  background: #fff

  iframe
    position: absolute
    inset: 0
    width: 100%
    height: 100%
    border: 0

.contacts-location__hours
  color: var(--third-color)
  font-weight: 800

.contacts-location__link
  display: inline-flex
  align-items: center
  gap: .55rem
  margin-top: 1rem
  color: var(--third-color)
  font-size: 1.05rem
  font-weight: 800

.contacts-location__link-icon
  position: relative
  flex: 0 0 .95rem
  width: .95rem
  height: .95rem
  border-radius: 50% 50% 50% 0
  background: var(--third-color)
  transform: rotate(-45deg)

  &::after
    content: ""
    position: absolute
    top: 50%
    left: 50%
    width: .34rem
    height: .34rem
    border-radius: 50%
    background: #fff
    transform: translate(-50%, -50%)

.contacts-info
  display: grid
  grid-template-columns: minmax(0, 1.2fr) minmax(18rem, .8fr)
  gap: 2rem
  align-items: start
  max-width: 1100px
  margin: 0 auto 3rem
  padding: 1.5rem
  border-radius: .5rem
  background: rgba(255,255,255,.86)

  h3
    margin: 0 0 1rem
    font-size: 1.7rem

  li
    margin: .7rem 0
    font-size: 1.2rem
    line-height: 1.45

.contacts-categories
  display: flex
  flex-wrap: wrap
  gap: .7rem

  a
    display: inline-flex
    align-items: center
    min-height: 2.8rem
    padding: .65rem .9rem
    border: 1px solid rgba(227,80,25,.35)
    border-radius: .5rem
    background: #fff
    color: #000
    font-size: 1rem
    font-weight: 800

@media (max-width: $medium)
  .contacts-hero
    padding-top: 2rem

    h1,
    h2
      font-size: 2.5rem

  .contacts-locations,
  .contacts-info
    grid-template-columns: 1fr

  .contacts-locations
    gap: 1rem

  .contacts-button
    width: min(100%, 28rem)
</style>
