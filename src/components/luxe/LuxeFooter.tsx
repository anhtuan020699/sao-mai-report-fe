"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MessengerIcon } from "@/components/client/icons";
import { SaoMaiLogo } from "@/components/client/SaoMaiLogo";
import { LUXE_SECTIONS, luxe } from "@/components/luxe/luxe-copy";
import { useLanguage } from "@/context/LanguageContext";
import type { SiteSettings } from "@/types/resort";

export function LuxeFooter({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const links = [
    { label: luxe.nav.stay, href: `#${LUXE_SECTIONS.stay}` },
    { label: luxe.nav.events, href: `#${LUXE_SECTIONS.events}` },
    { label: luxe.nav.experiences, href: "/dich-vu" },
    { label: luxe.nav.journal, href: "/tin-tuc" },
    { label: luxe.nav.careers, href: "/tuyen-dung" },
    { label: luxe.nav.contact, href: `#${LUXE_SECTIONS.contact}` },
  ];

  return (
    <footer className="bg-ink px-5 pt-24 pb-10 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-col items-center text-center">
          <SaoMaiLogo tone="light" />
          <p className="mt-6 font-serif text-lg text-white/70 italic">
            {t(luxe.footer.tagline)}
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="mt-16 border-y border-white/10 py-8"
        >
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[11px] tracking-[0.24em] text-white/70 uppercase transition hover:text-white"
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-white/45 sm:flex-row">
          <p>
            © {settings.foundedYear} – {settings.milestoneYear}{" "}
            {settings.legalName}. {t(luxe.footer.rights)}
          </p>
          <Link
            href="/"
            className="underline-offset-4 transition hover:text-white hover:underline"
          >
            {t(luxe.footer.classic)}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function LuxeConcierge({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    {
      label: `${t(luxe.contact.call)} · ${settings.hotline}`,
      href: `tel:${settings.hotline.replace(/\s/g, "")}`,
      icon: <Phone className="size-4" aria-hidden />,
    },
    {
      label: "Zalo",
      href: settings.social.zalo,
      icon: <MessageCircle className="size-4" aria-hidden />,
    },
    {
      label: "Messenger",
      href: settings.social.messenger,
      icon: <MessengerIcon className="size-4" />,
    },
  ];

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5 }}
          className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-2 sm:right-8 sm:bottom-8"
        >
          <AnimatePresence>
            {open ? (
              <motion.ul
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
                className="min-w-60 border border-ink/10 bg-ivory py-2 shadow-[0_20px_50px_-20px_rgb(20_27_22/0.4)]"
              >
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex items-center gap-3 px-5 py-3 text-sm text-ink/80 transition hover:bg-stone/60 hover:text-ink"
                    >
                      <span className="text-brass">{item.icon}</span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            ) : null}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="inline-flex h-12 cursor-pointer items-center gap-3 bg-ink px-5 text-[11px] font-medium tracking-[0.24em] text-white uppercase shadow-[0_20px_50px_-20px_rgb(20_27_22/0.6)] transition hover:bg-forest"
          >
            {open ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Phone className="size-4 text-brass-light" aria-hidden />
            )}
            {t(luxe.nav.contact)}
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
