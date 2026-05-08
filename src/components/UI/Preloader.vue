<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="card__badges" style="visibility: hidden">
      <span class="badge -incart"></span>
      <span class="badge -hit"></span>
      <span class="badge -exhibit"></span>
    </div>

    <div class="thumb skeleton"></div>

    <div class="title">
      <div class="line skeleton"></div>
      <div class="line skeleton short"></div>
      <div class="line skeleton"></div>
      <div class="line skeleton shorter"></div>
    </div>

    <div class="footer">
      <div class="price">
        <div class="price-label skeleton"></div>
        <div class="price-value skeleton"></div>
      </div>
      <div class="btn skeleton"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="sass" scoped>
.skeleton-card
  position: relative
  display: flex
  flex-direction: column
  align-items: center
  padding: 1rem
  border-radius: .5rem
  background: #fff
  border: 1px solid rgba(0,0,0,.1)
  box-shadow: 0 4px 12px rgba(0,0,0,.15)
  box-sizing: border-box
  overflow: visible
  min-height: 100%

  @media (max-width: 576px)
    padding: 1rem

.card__badges
  position: absolute
  top: .75rem
  right: calc(-1 * var(--badge-overhang, 1.2rem))
  display: flex
  flex-direction: column
  gap: .35rem
  align-items: flex-end
  z-index: 2

.thumb
  width: 100%
  height: 22rem
  border-radius: .5rem

  @media (max-width: 576px)
    border-radius: .5rem

.title
  display: flex
  flex-direction: column
  align-items: center
  gap: .45rem
  width: 100%
  min-height: calc(1.2 * 1.7rem * 4)
  margin: 1rem 0 0

.footer
  margin-top: auto
  display: flex
  flex-direction: column
  align-items: center
  gap: .5rem
  width: 100%

.price
  display: flex
  align-items: baseline
  justify-content: center
  gap: .5rem
  width: 100%

.skeleton
  position: relative
  overflow: hidden
  background: #e4e5ea
  background-image: linear-gradient(90deg, #e4e5ea 0, #f3f3f7 50%, #e4e5ea 100%)
  background-size: 200% 100%
  animation: shimmer 1.5s linear infinite

.line
  height: 1.3rem
  border-radius: .35rem
  width: 82%

.line.short
  width: 72%

.line.shorter
  width: 58%

.price-label
  width: 4rem
  height: 1.2rem
  border-radius: .35rem

.price-value
  width: 7rem
  height: 1.7rem
  border-radius: .35rem

.btn
  flex: 0 0 auto
  height: 3.1rem
  width: 11rem
  border-radius: .5rem

@media (max-width: 576px)
  .card__badges
    right: calc(-1 * var(--badge-overhang, .4rem))

@keyframes shimmer
  0%
    background-position: -200% 0
  100%
    background-position: 200% 0
</style>
