"use client";

import { CalendarCheck, Mail, MapPin, PartyPopper, Phone } from "lucide-react";
import Link from "next/link";
import { FacebookIcon, MessengerIcon, ZaloIcon } from "@/components/client/icons";
import { useResortModals } from "@/components/client/InteractiveModals";
import { NAV_ITEMS } from "@/components/client/nav-items";
import { SaoMaiLogo } from "@/components/client/SaoMaiLogo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import type { SiteSettings } from "@/types/resort";

export function Footer({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const { openBooking, openEventRfp } = useResortModals();

  return (
    <footer className="relative overflow-hidden bg-forest-deep text-white">
      <div className="h-1 bg-gradient-to-r from-crimson via-crimson-dark to-crimson" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr] lg:px-8">
        <div>
          <span className="inline-block rounded-2xl bg-white px-4 py-3">
            <SaoMaiLogo src={settings.logoUrl} />
          </span>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{t(ui.footer.tagline)}</p>
          <div className="mt-6 flex gap-3">
            <a
              href={settings.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-crimson"
            >
              <FacebookIcon className="size-5" />
            </a>
            <a
              href={settings.social.messenger}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Messenger"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-crimson"
            >
              <MessengerIcon className="size-5" />
            </a>
            <a
              href={settings.social.zalo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zalo"
              className="grid size-10 place-items-center overflow-hidden rounded-full transition hover:opacity-85"
            >
              <ZaloIcon className="size-10" />
            </a>
          </div>
        </div>

        <nav aria-label={t(ui.footer.explore)}>
          <h2 className="text-xs font-bold tracking-[0.2em] text-cream uppercase">{t(ui.footer.explore)}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="text-white/75 transition hover:text-white">
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-cream uppercase">{t(ui.footer.contact)}</h2>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
              <span>{t(settings.address)}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
              <span className="flex flex-col gap-1">
                <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} className="font-semibold text-white hover:text-cream">
                  Hotline/Zalo: {settings.hotline}
                </a>
                {settings.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^\d]/g, "")}`} className="hover:text-white">
                    Tel: {phone}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
              <span className="flex flex-col gap-1">
                <a href={`mailto:${settings.emails.reception}`} className="hover:text-white">
                  <span className="text-white/50">{t(ui.footer.reception)}: </span>
                  {settings.emails.reception}
                </a>
                <a href={`mailto:${settings.emails.sales}`} className="hover:text-white">
                  <span className="text-white/50">{t(ui.footer.sales)}: </span>
                  {settings.emails.sales}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold tracking-[0.2em] text-cream uppercase">{t(ui.footer.reservations)}</h2>
          <div className="mt-5 grid gap-3">
            <Button onClick={() => openBooking()}>
              <CalendarCheck className="size-4" aria-hidden />
              {t(ui.cta.bookNow)}
            </Button>
            <Button variant="outlineLight" onClick={() => openEventRfp()}>
              <PartyPopper className="size-4" aria-hidden />
              {t(ui.cta.eventQuote)}
            </Button>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/55">{t(ui.footer.languagesServed)}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {settings.foundedYear} – {settings.milestoneYear} {settings.legalName}. {t(ui.footer.rights)}
          </p>
          <p className="font-serif text-white/40 italic">{t(ui.story.title)}</p>
        </div>
      </div>
    </footer>
  );
}
