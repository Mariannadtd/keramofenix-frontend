<script setup>
import { RouterLink } from "vue-router";
import { SITE_PHONE } from "../lib/seo";
import { contactLocations } from "../lib/contacts";

const phoneHref = `tel:${SITE_PHONE.replace(/[^\d+]/g, "")}`;
const whatsappHref = "https://wa.me/79884068887?text=Здравствуйте";
</script>

<template>
  <section class="return-policy" aria-labelledby="return-policy-title">
    <header class="return-policy__hero">
      <p class="return-policy__eyebrow">Правила магазина</p>
      <h1 id="return-policy-title">Возврат и обмен</h1>
      <p>
        Правила действуют для заказов КерамоФеникс на территории России и
        помогают заранее понять условия возврата, обмена и действий при
        обнаружении брака или повреждений.
      </p>
    </header>

    <div class="return-policy__document">
      <section class="policy-block">
        <h2>Товар надлежащего качества</h2>
        <p>
          Возврат или обмен товара надлежащего качества возможен в сроки,
          установленные законодательством РФ, если товар не устанавливался,
          сохранены упаковка, товарный вид, комплектность и документы,
          подтверждающие покупку.
        </p>
        <p>
          Если товар возвращается по инициативе покупателя и не имеет брака,
          расходы на обратную доставку или транспортировку оплачивает
          покупатель, если иное не согласовано отдельно.
        </p>
      </section>

      <section class="policy-block">
        <h2>Индивидуальные заказы</h2>
        <p>
          Товары, изготовленные или поставленные по индивидуальному заказу
          покупателя, а также товары с индивидуальными доработками, возврату и
          обмену не подлежат, если они не имеют брака.
        </p>
      </section>

      <section class="policy-block">
        <h2>Проверка при получении</h2>
        <p>
          При получении товара необходимо проверить внешний вид, комплектность
          и отсутствие повреждений до подписания документов о получении.
        </p>
        <p>
          Если упаковка повреждена или есть видимые дефекты, зафиксируйте это в
          документах перевозчика или сообщите сотруднику магазина до приемки
          товара.
        </p>
      </section>

      <section class="policy-block">
        <h2>Брак или повреждения</h2>
        <p>
          В случае брака или повреждений свяжитесь с нами и направьте данные
          заказа: имя, телефон, дату покупки или оформления, описание проблемы
          и фотографии товара, упаковки и поврежденных элементов.
        </p>
        <p>
          После проверки обращения мы предложим подходящее решение: замену
          товара, устранение недостатков или возврат денежных средств в порядке,
          предусмотренном законодательством РФ.
        </p>
      </section>

      <section class="policy-block policy-block--contact">
        <div>
          <h2>Как оформить обращение</h2>
          <p>
            Позвоните нам, напишите в WhatsApp или обратитесь в любой салон.
            Для быстрой проверки подготовьте имя, контактный телефон, дату
            покупки или оформления, описание ситуации и фотографии.
          </p>
        </div>

        <div class="return-policy__actions" aria-label="Связаться с магазином">
          <a class="policy-button" :href="phoneHref">{{ SITE_PHONE }}</a>
          <a
            class="policy-button policy-button--light"
            :href="whatsappHref"
            target="_blank"
            rel="noopener"
          >
            Написать в WhatsApp
          </a>
          <RouterLink class="policy-button policy-button--light" to="/contacts">
            Контакты
          </RouterLink>
        </div>
      </section>

      <section class="policy-locations" aria-label="Адреса салонов">
        <article
          v-for="location in contactLocations"
          :key="location.street"
          class="policy-location"
        >
          <h3>{{ location.title }}</h3>
          <address>{{ location.locality }}, {{ location.street }}</address>
          <p>Ежедневно с 9:00 до 21:00</p>
        </article>
      </section>
    </div>
  </section>
</template>

<style scoped lang="sass">
@use "../assets/css/main.sass" as *

.return-policy
  padding-bottom: 4rem

.return-policy__hero
  max-width: 880px
  margin: 0 auto 2rem
  padding: 3rem 0 .5rem
  text-align: center

  h1
    display: block
    margin: .5rem 0 1.25rem
    font-size: 2.8rem
    line-height: 1.15

  p
    color: #333
    font-size: 1.25rem
    line-height: 1.6

.return-policy__eyebrow
  color: var(--third-color)
  font-weight: 800
  text-transform: uppercase

.return-policy__document
  max-width: 960px
  margin: 0 auto
  padding: 2rem
  border: 1px solid rgba(0,0,0,.08)
  border-radius: .5rem
  background: rgba(255,255,255,.9)
  box-shadow: 0 .4rem 1.2rem rgba(0,0,0,.05)

.policy-block
  padding: 1.4rem 0
  border-bottom: 1px solid rgba(0,0,0,.08)

  &:first-child
    padding-top: 0

  h2
    margin: 0 0 .8rem
    color: #111
    font-size: 1.55rem
    line-height: 1.25

  p
    margin: .75rem 0 0
    color: #333
    font-size: 1.16rem
    line-height: 1.65

.policy-block--contact
  display: grid
  grid-template-columns: minmax(0, 1fr) auto
  gap: 1.5rem
  align-items: center

.return-policy__actions
  display: flex
  flex-direction: column
  gap: .75rem
  min-width: 16rem

.policy-button
  display: inline-flex
  align-items: center
  justify-content: center
  min-height: 3.2rem
  padding: .75rem 1.1rem
  border: 1px solid var(--third-color)
  border-radius: .5rem
  background: var(--third-color)
  color: #fff !important
  font-size: 1.05rem
  font-weight: 800
  text-align: center

.policy-button--light
  background: #fff
  color: var(--third-color) !important

.policy-locations
  display: grid
  grid-template-columns: repeat(2, minmax(0, 1fr))
  gap: 1rem
  padding-top: 1.4rem

.policy-location
  padding: 1rem
  border: 1px solid rgba(227,80,25,.2)
  border-radius: .5rem
  background: #fff

  h3
    margin: 0 0 .45rem
    font-size: 1.2rem

  address
    color: #111
    font-style: normal
    font-size: 1.12rem
    font-weight: 800

  p
    margin-top: .45rem
    color: var(--third-color)
    font-size: 1rem
    font-weight: 800

@media (max-width: $medium)
  .return-policy__hero
    padding-top: 2rem

    h1
      font-size: 2.5rem

  .return-policy__document
    padding: 1.5rem

  .policy-block--contact,
  .policy-locations
    grid-template-columns: 1fr

  .return-policy__actions
    min-width: 0

  .policy-button
    width: 100%
</style>
