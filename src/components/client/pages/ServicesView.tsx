"use client";

import { ArrowUpRight, CircleCheck, Clock } from "lucide-react";
import Image from "next/image";
import { FACILITY_ICONS } from "@/components/client/facility-icons";
import { useResortModals } from "@/components/client/InteractiveModals";
import { PageHero } from "@/components/client/pages/PageHero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { cn } from "@/lib/utils";
import type { FacilityKind, ResortFacility, ServiceReservationKind } from "@/types/resort";

const RESERVATION_KIND: Partial<Record<FacilityKind, ServiceReservationKind>> = {
  RESTAURANT_BAR: "RESTAURANT_TABLE",
  TENNIS_PICKLEBALL: "PICKLEBALL",
  GOLF: "GOLF",
};

export function ServicesView({ facilities }: { facilities: ResortFacility[] }) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t(ui.servicesPage.title)}
        subtitle={t(ui.servicesPage.subtitle)}
        crumbs={[{ label: t(ui.nav.services) }]}
        image={facilities[0]?.coverImage}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {facilities.map((facility) => {
            const Icon = FACILITY_ICONS[facility.kind];
            return (
              <li key={facility.id}>
                <a
                  href={`#${facility.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20 backdrop-blur transition hover:bg-white hover:text-forest"
                >
                  <Icon className="size-4" aria-hidden />
                  {t(facility.name)}
                </a>
              </li>
            );
          })}
        </ul>
      </PageHero>

      <div className="bg-alabaster">
        {facilities.map((facility, index) => (
          <FacilitySection key={facility.id} facility={facility} reversed={index % 2 === 1} />
        ))}
      </div>
    </>
  );
}

function FacilitySection({ facility, reversed }: { facility: ResortFacility; reversed: boolean }) {
  const { t, tl } = useLanguage();
  const { openServiceReservation, openBooking } = useResortModals();
  const Icon = FACILITY_ICONS[facility.kind];

  const cta = (() => {
    const kind = RESERVATION_KIND[facility.kind];
    switch (facility.ctaAction) {
      case "TABLE_BOOKING":
        return { label: t(ui.cta.bookTable), onClick: () => openServiceReservation("DINING", kind) };
      case "COURT_BOOKING":
        return { label: t(ui.cta.bookCourt), onClick: () => openServiceReservation("SPORTS", kind) };
      case "STAY_BOOKING":
        return { label: t(ui.cta.bookStay), onClick: () => openBooking() };
      case "NONE":
        return null;
    }
  })();

  return (
    <section
      id={facility.slug}
      aria-labelledby={`${facility.slug}-title`}
      className="border-b border-stone/70 py-16 last:border-b-0 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal className={cn(reversed && "lg:order-2")}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-luxe">
            <Image
              src={facility.coverImage.url}
              alt={t(facility.coverImage.alt)}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
            {facility.badgeText ? (
              <span className="absolute top-4 left-4 rounded-full bg-crimson px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase shadow">
                {t(facility.badgeText)}
              </span>
            ) : null}
          </div>
          {facility.gallery.length > 0 ? (
            <ul className="mt-3 grid grid-cols-3 gap-3">
              {facility.gallery.map((image) => (
                <li key={image.url} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={image.url} alt={t(image.alt)} fill sizes="200px" className="object-cover" />
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <span className="grid size-12 place-items-center rounded-2xl bg-forest text-white shadow-card">
            <Icon className="size-6" aria-hidden />
          </span>
          <h2
            id={`${facility.slug}-title`}
            className="mt-5 font-serif text-3xl leading-tight font-semibold text-balance text-charcoal sm:text-4xl"
          >
            {t(facility.name)}
          </h2>
          <p className="mt-2 text-base font-medium text-crimson">{t(facility.tagline)}</p>
          <p className="mt-5 leading-relaxed text-charcoal/75">{t(facility.description)}</p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {tl(facility.features).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-charcoal/85">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {cta ? (
              <Button size="lg" onClick={cta.onClick}>
                {cta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            ) : null}
            <span className="inline-flex items-center gap-1.5 text-sm text-charcoal/60">
              <Clock className="size-4" aria-hidden />
              <span className="sr-only">{t(ui.bento.hours)}:</span>
              {t(facility.openingHours)}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
