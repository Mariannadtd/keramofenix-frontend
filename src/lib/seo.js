export const SITE_URL = "https://keramofenix.ru";
export const SITE_NAME = "КерамоФеникс";
export const SITE_PHONE = "+7 988 406-88-87";
export const SITE_DESCRIPTION =
  "КерамоФеникс — двери, керамогранит, напольные покрытия и фурнитура в Сочи. Подбор комплекта для ремонта, образцы в салоне, замер и доставка. Адреса: ул. Гагарина 63, ул. Донская 3/3.";

export function toAbsoluteUrl(value = "") {
  if (!value) return SITE_URL;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function compactText(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function limitText(value = "", maxLength = 0) {
  const text = compactText(value);
  if (!maxLength || text.length <= maxLength) return text;
  return `${text.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

function hasTextPart(text = "", part = "") {
  const normalizedText = compactText(text).toLowerCase();
  const normalizedPart = compactText(part).toLowerCase();
  return Boolean(normalizedPart && normalizedText.includes(normalizedPart));
}

function pushUniquePart(parts, part) {
  const value = compactText(part);
  if (!value) return;
  if (
    parts.some(
      (existing) => hasTextPart(existing, value) || hasTextPart(value, existing),
    )
  ) {
    return;
  }
  parts.push(value);
}

export function productDisplayName(product, maxLength = 150) {
  const rawName = compactText(product?.name || "Товар");
  const brand = compactText(product?.manufacturerName || "");
  const manufacturerName = compactText(product?.manufacturer || "");
  const color = compactText(product?.color || "");
  const isThinName = rawName.length < 8 || /^\d+[\w\-./]*$/u.test(rawName);
  const parts = [];

  if (brand && !hasTextPart(rawName, brand)) parts.push(brand);
  parts.push(rawName);
  if (isThinName) pushUniquePart(parts, manufacturerName);
  pushUniquePart(parts, color);

  return limitText(parts.join(" "), maxLength);
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
