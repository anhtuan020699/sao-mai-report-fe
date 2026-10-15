"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Dumbbell, Trophy, UtensilsCrossed, WavesLadder, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useResortModals } from "@/components/client/InteractiveModals";
import { ROUTES, SECTION_IDS } from "@/components/client/nav-items";
import { Button, buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { cn } from "@/lib/utils";
import type { ResortService, ServiceCategory } from "@/types/resort";

const LAYOUT: Record<ServiceCategory, { className: string; size: "xl" | "wide" | "sm"; icon: LucideIcon; anchor?: string }> = {
  DINING: { className: "lg:col-span-2 lg:row-span-2", size: "xl", icon: UtensilsCrossed },
  SPORTS: { className: "lg:col-span-2", size: "wide", icon: Trophy, anchor: SECTION_IDS.amenities },
  POOL_NATURE: { className: "lg:col-span-1", size: "sm", icon: WavesLadder },
  WELLNESS_ENTERTAINMENT: { className: "lg:col-span-1", size: "sm", icon: Dumbbell },
};

export function BentoAmenities({ services }: { services: ResortService[] }) {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.dining} aria-labelledby="bento-title" className="bg-alabaster py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t(ui.bento.overline)}
          title={t(ui.bento.title)}
          subtitle={t(ui.bento.subtitle)}
          titleId="bento-title"
          action={
            <Link href={ROUTES.services} className={buttonVariants({ variant: "outline" })}>
              {t(ui.servicesPage.viewAll)}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          }
        />

        <div className="mt-12 grid auto-rows-[minmax(340px,auto)] gap-4 sm:grid-cols-2 lg:auto-rows-[320px] lg:grid-cols-4 lg:gap-5">
          {services.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ service, index }: { service: ResortService; index: number }) {
  const { t, tl } = useLanguage();
  const { openServiceReservation, openBooking } = useResortModals();
  const layout = LAYOUT[service.category];
  const Icon = layout.icon;
  const isLarge = layout.size === "xl";
  const isWide = layout.size === "wide";

  const cta = (() => {
    switch (service.ctaAction) {
      case "TABLE_BOOKING":
        return { label: t(ui.cta.bookTable), onClick: () => openServiceReservation("DINING") };
      case "COURT_BOOKING":
        return { label: t(ui.cta.bookCourt), onClick: () => openServiceReservation("SPORTS") };
      case "STAY_BOOKING":
        return { label: t(ui.cta.bookStay), onClick: () => openBooking() };
      case "NONE":
        return null;
    }
  })();

  return (
    <motion.article
      id={layout.anchor}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl text-white shadow-card",
        isLarge && "sm:col-span-2 lg:min-h-0",
        isWide && "sm:col-span-2",
        layout.className,
      )}
    >
      <Image
        src={service.coverImage.url}
        alt={t(service.coverImage.alt)}
        fill
        sizes={isLarge || isWide ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"}
        className="-z-10 object-cover transition duration-[1200ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-deep via-forest-deep/55 to-forest-deep/5" />

      {isWide && service.gallery[0] ? (
        <div className="absolute top-5 right-5 hidden size-28 overflow-hidden rounded-2xl ring-4 ring-white/80 shadow-luxe sm:block lg:size-32">
          <Image src={service.gallery[0].url} alt={t(service.gallery[0].alt)} fill sizes="128px" className="object-cover" />
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-3 p-6 pb-0 sm:p-7 sm:pb-0">
        <span className="grid size-11 place-items-center rounded-2xl bg-white/15 backdrop-blur-md ring-1 ring-white/25">
          <Icon className="size-5" aria-hidden />
        </span>
        {service.badgeText ? (
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase",
              service.category === "SPORTS" ? "animate-pulse bg-crimson text-white" : "bg-cream text-forest",
              isWide && "sm:mr-36 lg:mr-40",
            )}
          >
            {t(service.badgeText)}
          </span>
        ) : null}
      </div>

      <div className="mt-auto p-6 sm:p-7">
        <h3 className={cn("font-serif leading-tight font-semibold text-balance", isLarge ? "text-3xl sm:text-4xl" : "text-2xl")}>
          {t(service.name)}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-cream">{t(service.tagline)}</p>
        {isLarge || isWide ? (
          <p className={cn("mt-3 max-w-xl text-sm leading-relaxed text-white/80", isWide && "line-clamp-2")}>
            {t(service.description)}
          </p>
        ) : null}

        {isLarge ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {tl(service.features).map((feature) => (
              <li key={feature} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                {feature}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
            <Clock className="size-3.5" aria-hidden />
            <span className="sr-only">{t(ui.bento.hours)}:</span>
            {t(service.openingHours)}
          </span>
          {cta ? (
            isLarge || isWide ? (
              <Button size="md" onClick={cta.onClick}>
                {cta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            ) : (
              <button
                type="button"
                onClick={cta.onClick}
                className="inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {cta.label}
                <ArrowUpRight className="size-4" aria-hidden />
              </button>
            )
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
