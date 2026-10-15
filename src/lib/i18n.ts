import type { Locale, LocalizedString, LocalizedStringArray } from "@/types/resort";

export const DEFAULT_LOCALE: Locale = "vi";

export const LOCALES: readonly Locale[] = ["vi", "en", "ko", "zh"];

export const LOCALE_OPTIONS: ReadonlyArray<{
  code: Locale;
  flag: string;
  label: string;
  short: string;
  htmlLang: string;
}> = [
  { code: "vi", flag: "🇻🇳", label: "Tiếng Việt", short: "VI", htmlLang: "vi" },
  { code: "en", flag: "🇬🇧", label: "English", short: "EN", htmlLang: "en" },
  { code: "ko", flag: "🇰🇷", label: "한국어", short: "KO", htmlLang: "ko" },
  { code: "zh", flag: "🇨🇳", label: "中文", short: "中", htmlLang: "zh-CN" },
];

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Builds a `LocalizedString` in fixed `vi, en, ko, zh` order. */
export function l(vi: string, en: string, ko: string, zh: string): LocalizedString {
  return { vi, en, ko, zh };
}

/** Builds a `LocalizedStringArray` in fixed `vi, en, ko, zh` order. */
export function la(vi: string[], en: string[], ko: string[], zh: string[]): LocalizedStringArray {
  return { vi, en, ko, zh };
}

/** Replaces `{key}` tokens, e.g. `interpolate("{n} guests", { n: 4 })`. */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Locale-aware number grouping without `Intl`, so server and browser output
 * are byte-identical and never cause hydration mismatches.
 */
export function formatNumber(value: number, locale: Locale): string {
  const separator = locale === "vi" ? "." : ",";
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

export function formatVnd(value: number, locale: Locale): string {
  const amount = formatNumber(value, locale);
  return locale === "vi" ? `${amount}₫` : `${amount} VND`;
}

export function formatIsoDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  switch (locale) {
    case "vi":
      return `${day}/${month}/${year}`;
    case "en":
      return `${day}/${month}/${year}`;
    case "ko":
      return `${year}. ${Number(month)}. ${Number(day)}.`;
    case "zh":
      return `${year}年${Number(month)}月${Number(day)}日`;
  }
}
