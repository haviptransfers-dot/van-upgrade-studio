export const LANGUAGES = ["en", "el", "de", "es", "fr", "it", "he", "ar"] as const;
export type SiteLanguage = typeof LANGUAGES[number];
export const SITE_ORIGIN = "https://haviptransfers.gr";
export const MAX_PASSENGERS = 7;
export const LEGACY_SLUGS: Record<string, string> = {
  "mercedes-v-class-chauffeur-service-athens": "mercedes-vito-vip-chauffeur-service-athens",
  "wedding-transfers-greece-mercedes-v-class": "wedding-transfers-greece-mercedes-vito-vip",
};
export function languageFromPath(path: string): SiteLanguage {
  const candidate = path.split("/")[1];
  return LANGUAGES.find((language) => language !== "en" && language === candidate) ?? "en";
}
export function basePath(path: string) {
  const language = languageFromPath(path);
  const unprefixed = language === "en" ? path : path.slice(language.length + 1);
  return unprefixed.replace(/\/+$/, "") || "/";
}
export function localizedPath(path: string, language: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const separator = path.search(/[?#]/);
  const pathname = separator < 0 ? path : path.slice(0, separator);
  const suffix = separator < 0 ? "" : path.slice(separator);
  const base = basePath(pathname);
  const slug = base.startsWith("/blog/") ? base.slice(6) : "";
  const resolved = LEGACY_SLUGS[slug] ? `/blog/${LEGACY_SLUGS[slug]}` : base;
  const prefix = language !== "en" && LANGUAGES.includes(language as SiteLanguage) ? `/${language}` : "";
  return `${prefix}${resolved === "/" ? "/" : resolved}${suffix}`;
}
/** Localized href with exactly one trailing slash on page paths, matching canonical URLs. */
export function linkPath(path: string, language: string): string {
  const localized = localizedPath(path, language);
  if (!localized.startsWith("/") || localized.startsWith("//")) return localized;
  const separator = localized.search(/[?#]/);
  const pathname = separator < 0 ? localized : localized.slice(0, separator);
  const suffix = separator < 0 ? "" : localized.slice(separator);
  if (/\.[a-z0-9]{2,5}$/i.test(pathname)) return localized;
  return `${pathname.replace(/\/+$/, "")}/${suffix}`;
}
export function pageUrl(path: string, language: string) {
  const pathname = localizedPath(path, language).split(/[?#]/)[0];
  return `${SITE_ORIGIN}${pathname.replace(/\/+$/, "")}/`;
}