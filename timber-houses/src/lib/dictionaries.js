const dictionaries = {
  uk: () => import("@/dictionaries/uk.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
};

export const locales = ["uk", "en"];
export const defaultLocale = "uk";

export async function getDictionary(locale) {
  if (!locales.includes(locale)) {
    return dictionaries[defaultLocale]();
  }
  return dictionaries[locale]();
}
