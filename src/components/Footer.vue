<script setup>
import { RouterLink } from "vue-router";
import SocialLinks from "./SocialLinks.vue";
</script>

<template>
  <footer>
    <div class="footer">
      <div class="links">
        <SocialLinks />
      </div>
      <p>
        Внимание! Данный сайт носит исключительно информационный характер и не
        является публичной офертой, определяемой положениями части 2 статьи 437
        ГК РФ. Цвет продукции, представленной на сайте может отличаться от
        реального, в связи с различными настройками ваших устройств для
        просмотра.
      </p>
      <nav class="footer__nav" aria-label="Документы магазина">
        <RouterLink to="/return-policy">Возврат и обмен</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped lang="sass">
.footer
  padding: 4rem 0
  text-align: center
  font-size: 0.9rem
  color: black
  & p
    max-width: 600px
    margin: 0 auto
.links
  margin-bottom: 2rem
.footer__nav
  display: flex
  justify-content: center
  margin-top: 1.5rem
  a
    color: var(--third-color)
    font-weight: 800
    text-decoration: underline
    text-underline-offset: .25rem
</style>
