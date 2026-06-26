<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import ContactsSection from "../components/ContactsSection.vue";
import { contactLocations } from "../lib/contacts";
import { removeJsonLd, setJsonLd, SITE_PHONE, SITE_URL } from "../lib/seo";

onMounted(() => {
  setJsonLd("contacts-jsonld", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${SITE_URL}/contacts#webpage`,
        url: `${SITE_URL}/contacts`,
        name: "Контакты КерамоФеникс",
        description:
          "Адреса, телефон, часы работы и карта салонов КерамоФеникс в Сочи.",
        about: { "@id": `${SITE_URL}/#store` },
      },
      {
        "@type": "Store",
        "@id": `${SITE_URL}/#store`,
        name: "КерамоФеникс",
        url: SITE_URL,
        telephone: SITE_PHONE,
        image: `${SITE_URL}/favicon.png`,
        areaServed: "Сочи",
        address: contactLocations.map((location) => ({
          "@type": "PostalAddress",
          addressLocality: location.locality,
          streetAddress: location.street,
          addressCountry: "RU",
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "21:00",
          },
        ],
      },
    ],
  });
});

onBeforeUnmount(() => {
  removeJsonLd("contacts-jsonld");
});
</script>

<template>
  <ContactsSection />
</template>
