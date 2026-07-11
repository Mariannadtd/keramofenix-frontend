import { createRouter, createWebHistory } from "vue-router";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  removeJsonLd,
  removeMeta,
  setCanonical,
  setMeta,
  setProperty,
} from "../lib/seo";

const HomeView = () => import("../views/HomeView.vue");
const InteriorDoors = () => import("../views/InteriorDoors.vue");
const ExteriorDoors = () => import("../views/ExteriorDoors.vue");
const FloorsView = () => import("../views/FloorsView.vue");
const PorcelainStoneware = () => import("../views/PorcelainStoneware.vue");
const FittingsView = () => import("../views/FittingsView.vue");
const ProductDetail = () => import("../views/ProductDetail.vue");
const CartView = () => import("../views/Cart.vue");
const AboutView = () => import("../views/AboutView.vue");
const ContactsView = () => import("../views/ContactsView.vue");
const ReturnPolicyView = () => import("../views/ReturnPolicyView.vue");
const AdminLoginView = () => import("../views/AdminView.vue");
const AdminPanel = () => import("../views/AdminPanel.vue");

const ADMIN_UIDS = [
  "N9oOrhcobEUN31LYAbuKSP7cOCL2",
  "OcobZTDs6RdkHjnxfmaocKo3o2d2",
];
const ADMIN_EMAILS = ["romanova.lenovo@gmail.com"];

async function isAdminUser(user) {
  if (!user) return false;
  if (ADMIN_UIDS.includes(user.uid)) return true;
  if (user.email && ADMIN_EMAILS.includes(user.email)) return true;
  const t = await user.getIdTokenResult(true);
  return t?.claims?.admin === true;
}

const defaultDescription = SITE_DESCRIPTION;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Двери, керамогранит и напольные покрытия в Сочи — КерамоФеникс",
        description:
          "КерамоФеникс — двери, керамогранит, напольные покрытия и фурнитура в Сочи. Подбор комплекта для ремонта, образцы в салоне, замер и доставка. Адреса: ул. Гагарина 63, ул. Донская 3/3.",
        canonical: "https://keramofenix.ru/",
      },
    },
    {
      path: "/interiors",
      name: "interiors",
      component: InteriorDoors,
      meta: {
        title: "Купить межкомнатные двери в Сочи — КерамоФеникс",
        description:
          "Купить межкомнатные двери в Сочи в КерамоФеникс: полотна, погонаж, ручки и фурнитура. Поможем подобрать комплект по стилю, размеру и бюджету. Салоны: ул. Гагарина 63, ул. Донская 3/3.",
        canonical: "https://keramofenix.ru/interiors",
      },
    },
    {
      path: "/exteriors",
      name: "exteriors",
      component: ExteriorDoors,
      meta: {
        title: "Купить входные двери в Сочи — КерамоФеникс",
        description:
          "Купить входные двери в Сочи для квартиры и дома. Модели с терморазрывом, зеркалом, ковкой и разными вариантами отделки. КерамоФеникс: ул. Гагарина 63, ул. Донская 3/3.",
        canonical: "https://keramofenix.ru/exteriors",
      },
    },
    {
      path: "/floors",
      name: "floors",
      component: FloorsView,
      meta: {
        title: "Купить напольные покрытия в Сочи — КерамоФеникс",
        description:
          "Купить напольные покрытия в Сочи: ламинат, кварцвинил и практичные покрытия для квартиры, дома и коммерческих помещений. Образцы в салонах КерамоФеникс.",
        canonical: "https://keramofenix.ru/floors",
      },
    },
    {
      path: "/porcelain-stoneware",
      name: "porcelain-stoneware",
      component: PorcelainStoneware,
      meta: {
        title: "Купить керамогранит в Сочи — КерамоФеникс",
        description:
          "Купить керамогранит в Сочи для пола и стен. Подбор плитки по формату, поверхности, оттенку и цене. Образцы в салонах КерамоФеникс: ул. Гагарина 63, ул. Донская 3/3.",
        canonical: "https://keramofenix.ru/porcelain-stoneware",
      },
    },
    {
      path: "/fittings",
      name: "fittings",
      component: FittingsView,
      meta: {
        title: "Купить дверную фурнитуру в Сочи — КерамоФеникс",
        description:
          "Купить дверную фурнитуру в Сочи: ручки, замки, петли, защелки, раздвижные системы и комплектующие. Подберем под межкомнатные и входные двери.",
        canonical: "https://keramofenix.ru/fittings",
      },
    },
    {
      path: "/product/:id",
      name: "product-detail",
      component: ProductDetail,
      props: true,
      meta: {
        title: "Товар — КерамоФеникс",
        description:
          "Карточка товара КерамоФеникс. Двери, напольные покрытия и фурнитура в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Телефон: +7 988 406-88-87.",
      },
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView,
      meta: {
        title: "Корзина — КерамоФеникс",
        description:
          "Корзина интернет-магазина КерамоФеникс. Адреса магазинов: Сочи, ул. Гагарина 63, ул. Донская 3/3. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/cart",
        robots: "noindex, nofollow",
      },
    },
    {
      path: "/about",
      name: "about-view",
      component: AboutView,
      meta: {
        title: "О компании — КерамоФеникс",
        description:
          "О компании КерамоФеникс в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/about",
      },
    },
    {
      path: "/contacts",
      name: "contacts-view",
      component: ContactsView,
      meta: {
        title: "Контакты — КерамоФеникс",
        description:
          "Контакты КерамоФеникс в Сочи: адреса салонов на ул. Гагарина 63 и ул. Донская 3/3, телефон +7 988 406-88-87, часы работы и карта проезда.",
        canonical: "https://keramofenix.ru/contacts",
      },
    },
    {
      path: "/return-policy",
      name: "return-policy",
      component: ReturnPolicyView,
      meta: {
        title: "Возврат и обмен — КерамоФеникс",
        description:
          "Правила возврата и обмена товаров КерамоФеникс в Сочи: условия возврата товара надлежащего качества, индивидуальных заказов, брака и повреждений.",
        canonical: "https://keramofenix.ru/return-policy",
      },
    },
    {
      path: "/login",
      name: "login",
      component: AdminLoginView,
      meta: {
        requiresGuest: true,
        title: "Вход — КерамоФеникс",
        description: defaultDescription,
        canonical: "https://keramofenix.ru/login",
        robots: "noindex, nofollow",
      },
    },
    {
      path: "/admin",
      name: "adminPanel",
      component: AdminPanel,
      meta: {
        requiresAdmin: true,
        title: "Админ-панель — КерамоФеникс",
        description: defaultDescription,
        canonical: "https://keramofenix.ru/admin",
        robots: "noindex, nofollow",
      },
    },

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to, from, next) => {
  const needsGuest = to.matched.some((r) => r.meta?.requiresGuest);
  const needsAdmin = to.matched.some((r) => r.meta?.requiresAdmin);

  if (!needsGuest && !needsAdmin) return next();

  const { auth, authReady } = await import("../firebase");
  await authReady;
  const user = auth.currentUser;

  if (import.meta.env.DEV) {
    console.log(
      "[GUARD] to:",
      to.fullPath,
      "user:",
      user && { uid: user.uid, email: user.email },
    );
  }

  if (needsGuest) {
    if (!user) return next();
    if (await isAdminUser(user)) {
      const redirect =
        typeof to.query.redirect === "string" ? to.query.redirect : "/admin";
      return next(redirect);
    } else {
      await auth.signOut();
      return next();
    }
  }

  if (needsAdmin) {
    if (!user) {
      return next({ name: "login", query: { redirect: to.fullPath } });
    }
    if (!(await isAdminUser(user))) {
      await auth.signOut();
      return next({
        name: "login",
        query: { redirect: to.fullPath, err: "noadmin" },
      });
    }
    return next();
  }

  next();
});

router.afterEach((to) => {
  const title = to.meta.title || SITE_NAME;
  const description = to.meta.description || defaultDescription;

  document.title = title;

  setMeta("description", description);

  if (to.meta.robots) setMeta("robots", to.meta.robots);
  else removeMeta("robots");

  const canonical =
    to.name === "product-detail"
      ? `${SITE_URL}${to.path}`
      : to.meta.canonical || `${SITE_URL}${to.path}`;

  setCanonical(canonical);
  setProperty("og:site_name", SITE_NAME);
  setProperty("og:type", to.name === "product-detail" ? "product" : "website");
  setProperty("og:title", title);
  setProperty("og:description", description);
  setProperty("og:url", canonical);

  if (to.name !== "product-detail") {
    removeJsonLd("product-jsonld");
  }
});

export default router;
