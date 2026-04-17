import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

const HomeView = () => import("../views/HomeView.vue");
const InteriorDoors = () => import("../views/InteriorDoors.vue");
const ExteriorDoors = () => import("../views/ExteriorDoors.vue");
const FloorsView = () => import("../views/FloorsView.vue");
const FittingsView = () => import("../views/FittingsView.vue");
const ProductDetail = () => import("../views/ProductDetail.vue");
const CartView = () => import("../views/Cart.vue");
const AboutView = () => import("../views/AboutView.vue");
const ContactsView = () => import("../views/ContactsView.vue");
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

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

const defaultDescription =
  "КерамоФеникс — двери, напольные покрытия и фурнитура в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "КерамоФеникс — двери, полы и плитка в Сочи",
        description:
          "КерамоФеникс — интернет-магазин дверей, напольных покрытий и фурнитуры в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/",
      },
    },
    {
      path: "/interiors",
      name: "interiors",
      component: InteriorDoors,
      meta: {
        title: "Межкомнатные двери — КерамоФеникс",
        description:
          "Межкомнатные двери в Сочи от КерамоФеникс. Магазин: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/interiors",
      },
    },
    {
      path: "/exteriors",
      name: "exteriors",
      component: ExteriorDoors,
      meta: {
        title: "Входные двери — КерамоФеникс",
        description:
          "Входные двери в Сочи от КерамоФеникс. Адреса магазинов: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/exteriors",
      },
    },
    {
      path: "/floors",
      name: "floors",
      component: FloorsView,
      meta: {
        title: "Напольные покрытия — КерамоФеникс",
        description:
          "Напольные покрытия в Сочи от КерамоФеникс. Ламинат, кварцвинил и другие покрытия. Адреса: ул. Гагарина 63, ул. Донская 3/3. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/floors",
      },
    },
    {
      path: "/fittings",
      name: "fittings",
      component: FittingsView,
      meta: {
        title: "Фурнитура — КерамоФеникс",
        description:
          "Фурнитура для дверей и интерьера в Сочи от КерамоФеникс. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
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
          "Контакты КерамоФеникс: Сочи, ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.",
        canonical: "https://keramofenix.ru/contacts",
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
      },
    },

    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

router.beforeEach(async (to, from, next) => {
  const needsGuest = to.matched.some((r) => r.meta?.requiresGuest);
  const needsAdmin = to.matched.some((r) => r.meta?.requiresAdmin);

  if (!needsGuest && !needsAdmin) return next();

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
  document.title = to.meta.title || "КерамоФеникс";

  setMeta("description", to.meta.description || defaultDescription);

  const canonical =
    to.name === "product-detail"
      ? `https://keramofenix.ru${to.fullPath}`
      : to.meta.canonical || `https://keramofenix.ru${to.path}`;

  setCanonical(canonical);
});

export default router;
