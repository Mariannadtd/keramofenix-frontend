export const SITE_URL = "https://keramofenix.ru";
export const SITE_NAME = "КерамоФеникс";
export const SITE_PHONE = "+7 988 406-88-87";
export const SITE_DESCRIPTION =
  "КерамоФеникс — двери, напольные покрытия и фурнитура в Сочи. Адреса: ул. Гагарина 63, ул. Донская 3/3. Ежедневно с 9:00 до 21:00. Телефон: +7 988 406-88-87.";

export function toAbsoluteUrl(value = "") {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

export function setMeta(name, content) {
  if (!content) return removeMeta(name);
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function removeMeta(name) {
  document.querySelector(`meta[name="${name}"]`)?.remove();
}

export function setProperty(property, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export function setCanonical(url) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", url);
}

export function setJsonLd(id, data) {
  let tag = document.getElementById(id);
  if (!tag) {
    tag = document.createElement("script");
    tag.id = id;
    tag.type = "application/ld+json";
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

export function removeJsonLd(id) {
  document.getElementById(id)?.remove();
}

export function formatPriceForSeo(value) {
  const price = Number(value);
  if (!Number.isFinite(price)) return "";
  return `${Math.round(price).toLocaleString("ru-RU")} ₽`;
}
