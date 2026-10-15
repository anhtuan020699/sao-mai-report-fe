"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FACILITY_ICONS } from "@/components/client/facility-icons";
import { Flag } from "@/components/client/Flag";
import { useResortModals } from "@/components/client/InteractiveModals";
import {
  NAV_ITEMS,
  ROUTES,
  SECTION_IDS,
  type NavItem,
} from "@/components/client/nav-items";
import { SaoMaiLogo } from "@/components/client/SaoMaiLogo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { LOCALE_OPTIONS } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ResortFacility, SiteSettings } from "@/types/resort";

function LanguageDropdown() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current =
    LOCALE_OPTIONS.find((option) => option.code === locale) ??
    LOCALE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t(ui.topbar.language)}: ${current.label}`}
        className={cn(
          "inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold text-charcoal transition sm:px-3",
          open ? "border-forest bg-sand" : "border-stone hover:border-forest",
        )}
      >
        <Flag locale={current.code} />
        <span className="max-[359px]:sr-only">{current.short}</span>
        <ChevronDown
          className={cn(
            "size-3.5 text-charcoal/60 transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            role="listbox"
            aria-label={t(ui.topbar.language)}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-2xl bg-white p-1.5 shadow-luxe ring-1 ring-black/5"
          >
            {LOCALE_OPTIONS.map((option) => {
              const isActive = option.code === locale;
              return (
                <li key={option.code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    lang={option.htmlLang}
                    onClick={() => {
                      setLocale(option.code);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                      isActive
                        ? "bg-sand text-crimson"
                        : "text-charcoal hover:bg-sand/70",
                    )}
                  >
                    <Flag locale={option.code} />
                    <span className="flex-1">{option.label}</span>
                    {isActive ? <Check className="size-4" aria-hidden /> : null}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function DrawerLanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-bold tracking-[0.2em] text-charcoal/50 uppercase">
        {t(ui.topbar.language)}
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {LOCALE_OPTIONS.map((option) => {
          const isActive = option.code === locale;
          return (
            <button
              key={option.code}
              type="button"
              lang={option.htmlLang}
              aria-pressed={isActive}
              onClick={() => setLocale(option.code)}
              className={cn(
                "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full border px-3 py-2.5 text-sm font-semibold whitespace-nowrap transition",
                isActive
                  ? "border-crimson bg-crimson text-white"
                  : "border-stone bg-white text-charcoal hover:border-forest",
              )}
            >
              <Flag locale={option.code} />
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const TRACKED_SECTIONS = Object.values(SECTION_IDS);

/** Active nav id: route match on standalone pages, scroll spy on the homepage. */
function useActiveNavId(): string | null {
  const pathname = usePathname();
  const [section, setSection] = useState<string | null>(null);
  const isHome = pathname === ROUTES.home;

  useEffect(() => {
    if (!isHome) return;
    const sections = TRACKED_SECTIONS.map((id) =>
      document.getElementById(id),
    ).filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [isHome]);

  if (!isHome) {
    return (
      NAV_ITEMS.find((item) => item.route && pathname.startsWith(item.route))
        ?.id ?? null
    );
  }
  return NAV_ITEMS.find((item) => item.sectionId === section)?.id ?? null;
}

const NAV_LINK_CLASS =
  "relative inline-flex items-center gap-1 px-2.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors 2xl:px-3.5";

function ActiveUnderline() {
  return (
    <motion.span
      layoutId="nav-underline"
      className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-crimson 2xl:inset-x-3.5"
    />
  );
}

function ServicesMenuItem({
  item,
  isActive,
  facilities,
}: {
  item: NavItem;
  isActive: boolean;
  facilities: ResortFacility[];
}) {
  const { t } = useLanguage();

  return (
    <li className="group relative">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        aria-haspopup="true"
        className={cn(
          NAV_LINK_CLASS,
          isActive ? "text-crimson" : "text-charcoal hover:text-crimson",
        )}
      >
        {t(item.label)}
        <ChevronDown
          className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180"
          aria-hidden
        />
        {isActive ? <ActiveUnderline /> : null}
      </Link>

      <div className="invisible absolute top-full left-1/2 z-50 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="rounded-3xl bg-white p-3 shadow-luxe ring-1 ring-black/5">
          <ul className="grid grid-cols-2 gap-1">
            {facilities.map((facility) => {
              const Icon = FACILITY_ICONS[facility.kind];
              return (
                <li key={facility.id}>
                  <Link
                    href={`${ROUTES.services}#${facility.slug}`}
                    className="flex items-start gap-3 rounded-2xl p-3 transition hover:bg-sand"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-forest/10 text-forest">
                      <Icon className="size-4.5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-charcoal">
                        {t(facility.name)}
                      </span>
                      <span className="mt-0.5 line-clamp-1 block text-xs text-charcoal/60">
                        {t(facility.tagline)}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={ROUTES.services}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl bg-sand px-4 py-2.5 text-sm font-semibold text-forest transition hover:text-crimson"
          >
            {t(ui.nav.allServices)}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </li>
  );
}

export function Navbar({
  settings,
  facilities,
}: {
  settings: SiteSettings;
  facilities: ResortFacility[];
}) {
  const { t } = useLanguage();
  const { openBooking, openEventRfp } = useResortModals();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveNavId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const hotlineHref = `tel:${settings.hotline.replace(/\s/g, "")}`;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b-4 border-forest bg-white transition-shadow duration-300",
          scrolled && "shadow-[0_8px_30px_-12px_rgb(24_58_40/0.35)]",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[90rem] items-center justify-between gap-2 px-3 transition-[height] duration-300 sm:gap-4 sm:px-6 lg:px-8",
            scrolled ? "h-16" : "h-20",
          )}
        >
          <Link
            href={ROUTES.home}
            aria-label={settings.name}
            className="shrink-0"
          >
            <SaoMaiLogo src={settings.logoUrl} />
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-x-1 2xl:gap-x-2">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                if (item.hasServicesMenu) {
                  return (
                    <ServicesMenuItem
                      key={item.id}
                      item={item}
                      isActive={isActive}
                      facilities={facilities}
                    />
                  );
                }
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        NAV_LINK_CLASS,
                        isActive
                          ? "text-crimson"
                          : "text-charcoal hover:text-crimson",
                      )}
                    >
                      {t(item.label)}
                      {isActive ? <ActiveUnderline /> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageDropdown />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t(ui.nav.openMenu)}
              aria-expanded={menuOpen}
              className="grid size-11 cursor-pointer place-items-center rounded-full text-charcoal transition hover:bg-sand xl:hidden"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              className="fixed inset-0 z-[60] bg-forest-deep/60 backdrop-blur-sm xl:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(24rem,90vw)] flex-col bg-alabaster shadow-luxe xl:hidden"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between border-b-4 border-forest bg-white px-5 py-4">
                <SaoMaiLogo src={settings.logoUrl} compact />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label={t(ui.nav.closeMenu)}
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-sand transition hover:bg-crimson hover:text-white"
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>
              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto px-5 py-4"
              >
                <ul className="divide-y divide-stone">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={cn(
                          "flex items-center justify-between py-3.5 font-serif text-lg",
                          active === item.id ? "text-crimson" : "text-charcoal",
                        )}
                      >
                        {t(item.label)}
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            active === item.id
                              ? "bg-crimson"
                              : "bg-transparent",
                          )}
                        />
                      </Link>
                      {item.hasServicesMenu ? (
                        <ul className="mb-3 grid grid-cols-2 gap-1.5">
                          {facilities.map((facility) => (
                            <li key={facility.id}>
                              <Link
                                href={`${ROUTES.services}#${facility.slug}`}
                                onClick={closeMenu}
                                className="block rounded-xl bg-white px-3 py-2 text-sm text-charcoal/80 shadow-sm transition hover:text-crimson"
                              >
                                {t(facility.name)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6">
                  <DrawerLanguageSwitcher />
                </div>
              </nav>
              <div className="grid gap-2 border-t border-stone bg-white p-5">
                <Button
                  size="lg"
                  onClick={() => {
                    closeMenu();
                    openBooking();
                  }}
                >
                  {t(ui.cta.bookNow)}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    closeMenu();
                    openEventRfp();
                  }}
                >
                  {t(ui.cta.eventQuote)}
                </Button>
                <a
                  href={hotlineHref}
                  className="mt-1 text-center text-sm font-semibold text-forest"
                >
                  <Phone className="mr-1.5 inline size-4" aria-hidden />
                  {settings.hotline}
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
