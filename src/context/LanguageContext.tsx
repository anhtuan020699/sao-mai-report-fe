"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LOCALE, LOCALE_OPTIONS, formatVnd, isLocale } from "@/lib/i18n";
import type { Locale, LocalizedString, LocalizedStringArray } from "@/types/resort";

const STORAGE_KEY = "saomai.locale";

/* A tiny external store keeps the locale outside React state so the server
   snapshot (default locale) and the persisted client choice reconcile
   without hydration mismatches or effect-driven re-renders. */
const listeners = new Set<() => void>();
let currentLocale: Locale | null = null;

function readLocale(): Locale {
  if (currentLocale) return currentLocale;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    currentLocale = isLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    currentLocale = DEFAULT_LOCALE;
  }
  return currentLocale;
}

function writeLocale(next: Locale) {
  currentLocale = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable (private mode); keep the in-memory choice.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Resolves a localized field to the active locale. */
  t: (value: LocalizedString) => string;
  /** Resolves a localized list to the active locale. */
  tl: (value: LocalizedStringArray) => string[];
  formatPrice: (vnd: number) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, readLocale, () => DEFAULT_LOCALE);

  useEffect(() => {
    const option = LOCALE_OPTIONS.find((item) => item.code === locale);
    document.documentElement.lang = option?.htmlLang ?? locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => writeLocale(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: (field) => field[locale] || field[DEFAULT_LOCALE],
      tl: (field) => (field[locale]?.length ? field[locale] : field[DEFAULT_LOCALE]),
      formatPrice: (vnd) => formatVnd(vnd, locale),
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside <LanguageProvider>.");
  }
  return context;
}
