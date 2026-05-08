export const normalizeText = (value) =>
  (value ?? "")
    .toString()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/ё/g, "е")
    .trim();

export const normalizeFloorText = (value) =>
  normalizeText(value).replace(/кварц[\s-]*винил/g, "кварцвинил");

export const sortFilter = {
  key: "sort",
  type: "sort",
  label: "Сортировка по цене",
  options: [
    { label: "Сортировка по цене", value: "" },
    { label: "По цене ↑", value: "asc" },
    { label: "По цене ↓", value: "desc" },
  ],
};

export function applySearch(items, query, normalize = normalizeText) {
  const search = normalize(query);
  if (!search) return items;
  return items.filter((item) => normalize(item.name).includes(search));
}

export function applySingleValueFilters(
  items,
  filters,
  keys,
  normalize = normalizeText
) {
  let result = items;

  for (const key of keys) {
    const selected = normalize(filters[key]);
    if (selected) {
      result = result.filter((item) => normalize(item[key]) === selected);
    }
  }

  return result;
}

export function applyMultiValueFilter(
  items,
  selectedValues,
  key,
  normalize = normalizeText
) {
  if (!Array.isArray(selectedValues) || selectedValues.length === 0) {
    return items;
  }

  const selected = selectedValues.map(normalize);

  return items.filter((item) => {
    const values = Array.isArray(item[key]) ? item[key].map(normalize) : [];
    return selected.every((value) => values.includes(value));
  });
}

export function sortByPrice(items, direction) {
  if (direction === "asc") {
    return [...items].sort((a, b) => a.price - b.price);
  }
  if (direction === "desc") {
    return [...items].sort((a, b) => b.price - a.price);
  }
  return items;
}

export function hasActiveFilters(filters, normalize = normalizeText) {
  return Object.values(filters).some((value) =>
    Array.isArray(value) ? value.length > 0 : !!normalize(value)
  );
}
