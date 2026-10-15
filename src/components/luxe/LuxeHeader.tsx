"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useResortModals } from "@/components/client/InteractiveModals";
import { SaoMaiLogo } from "@/components/client/SaoMaiLogo";
import { LUXE_SECTIONS, luxe } from "@/components/luxe/luxe-copy";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALE_OPTIONS } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocalizedString } from "@/types/resort";

const LEFT: { label: LocalizedString; href: string }[] = [
  { label: luxe.nav.stay, href: `#${LUXE_SECTIONS.stay}` },
  { label: luxe.nav.events, href: `#${LUXE_SECTIONS.events}` },
  { label: luxe.nav.experiences, href: `#${LUXE_SECTIONS.experiences}` },
];

const RIGHT: { label: LocalizedString; href: string }[] = [
  { label: luxe.nav.journal, href: `#${LUXE_SECTIONS.journal}` },
  { label: luxe.nav.contact, href: `#${LUXE_SECTIONS.contact}` },
];

const LINK =
  "relative py-2 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors";

function LanguageInline({ light }: { light: boolean }) {
  const { locale, setLocale } = useLanguage();
  return (
    <div className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.15em]">
      {LOCALE_OPTIONS.map((option, index) => (
        <span key={option.code} className="flex items-center gap-2.5">
          {index > 0 ? (
            <span
              aria-hidden
              className={light ? "text-white/30" : "text-ink/20"}
            >
              /
            </span>
          ) : null}
          <button
            type="button"
            lang={option.htmlLang}
            aria-label={option.label}
            aria-pressed={option.code === locale}
            onClick={() => setLocale(option.code)}
            className={cn(
              "cursor-pointer transition-colors",
              option.code === locale
                ? light
                  ? "text-white"
                  : "text-ink"
                : light
                  ? "text-white/55 hover:text-white"
                  : "text-ink/45 hover:text-ink",
            )}
          >
            {option.short}
          </button>
        </span>
      ))}
    </div>
  );
}

export function LuxeHeader() {
  const { t } = useLanguage();
  const { openBooking } = useResortModals();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = !scrolled;
  const linkTone = light
    ? "text-white/85 hover:text-white"
    : "text-ink/70 hover:text-ink";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500",
          scrolled
            ? "border-b border-ink/10 bg-ivory/95 backdrop-blur-md"
            : "border-b border-white/15 bg-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto grid max-w-[96rem] grid-cols-[1fr_auto_1fr] items-center px-5 transition-[height] duration-500 sm:px-8 lg:px-12",
            scrolled ? "h-18" : "h-24",
          )}
        >
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {LEFT.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={cn(LINK, linkTone)}>
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className={cn(
              LINK,
              "flex cursor-pointer items-center gap-3 justify-self-start lg:hidden",
              linkTone,
            )}
          >
            <span aria-hidden className="flex w-6 flex-col gap-1.5">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-4 bg-current" />
            </span>
            <span className="max-sm:sr-only">{t(luxe.nav.menu)}</span>
          </button>

          <Link
            href="/luxe"
            aria-label="Sao Mai Phú Mỹ Resort"
            className="justify-self-center"
          >
            <SaoMaiLogo tone={light ? "light" : "default"} compact={scrolled} />
          </Link>

          <div className="flex items-center justify-end gap-8 xl:gap-10">
            <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
              {RIGHT.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={cn(LINK, linkTone)}>
                    {t(item.label)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden xl:block">
              <LanguageInline light={light} />
            </div>
            <button
              type="button"
              onClick={() => openBooking()}
              className={cn(
                "hidden h-11 cursor-pointer items-center border px-6 text-[11px] font-medium tracking-[0.22em] uppercase transition-colors sm:inline-flex",
                light
                  ? "border-white/60 text-white hover:bg-white hover:text-ink"
                  : "border-ink/80 text-ink hover:bg-ink hover:text-ivory",
              )}
            >
              {t(luxe.nav.reserve)}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t(luxe.nav.menu)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-white"
          >
            <div className="flex h-24 items-center justify-between px-5 sm:px-8">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={cn(
                  LINK,
                  "cursor-pointer text-white/85 hover:text-white",
                )}
              >
                {t(luxe.nav.close)}
              </button>
              <SaoMaiLogo tone="light" compact />
              <span className="w-12" aria-hidden />
            </div>
            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col justify-center px-8"
            >
              <ul className="space-y-5">
                {[...LEFT, ...RIGHT].map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.06,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-serif text-4xl font-normal text-white/90 transition hover:text-brass-light"
                    >
                      {t(item.label)}
                    </a>
                  </motion.li>
                ))}
                <li>
                  <Link
                    href="/tuyen-dung"
                    className="font-serif text-4xl font-normal text-white/90 transition hover:text-brass-light"
                  >
                    {t(luxe.nav.careers)}
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex items-center justify-between border-t border-white/10 px-8 py-6">
              <LanguageInline light />
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="inline-flex h-11 cursor-pointer items-center border border-white/60 px-6 text-[11px] font-medium tracking-[0.22em] uppercase transition hover:bg-white hover:text-ink"
              >
                {t(luxe.nav.reserve)}
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
