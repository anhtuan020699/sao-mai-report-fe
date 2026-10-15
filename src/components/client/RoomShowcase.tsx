"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarRange, CircleCheck, Eye, Maximize2, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AMENITY_ICONS } from "@/components/client/icons";
import { useResortModals } from "@/components/client/InteractiveModals";
import { SECTION_IDS } from "@/components/client/nav-items";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LocalizedString, RoomCategory, RoomGroup, StayPolicy } from "@/types/resort";

type Filter = "ALL" | RoomGroup;

const FILTERS: { id: Filter; label: LocalizedString }[] = [
  { id: "ALL", label: ui.rooms.filterAll },
  { id: "VILLA", label: ui.rooms.filterVilla },
  { id: "HOTEL", label: ui.rooms.filterHotel },
];

export function RoomShowcase({ rooms, policy }: { rooms: RoomCategory[]; policy: StayPolicy }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>("ALL");
  const visible = filter === "ALL" ? rooms : rooms.filter((room) => room.group === filter);

  return (
    <section id={SECTION_IDS.stay} aria-labelledby="rooms-title" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t(ui.rooms.overline)}
          title={t(ui.rooms.title)}
          subtitle={t(ui.rooms.subtitle)}
          titleId="rooms-title"
        />

        <div role="tablist" aria-label={t(ui.rooms.overline)} className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((item) => {
            const isActive = item.id === filter;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "relative shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  isActive ? "text-white" : "bg-white text-charcoal/75 hover:text-charcoal",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="room-filter-pill"
                    className="absolute inset-0 rounded-full bg-crimson shadow-[0_10px_24px_-12px_rgb(184_20_20/0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{t(item.label)}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((room, index) => {
              const featured = index === 0 && filter === "ALL";
              return (
                <motion.li
                  key={room.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(featured && "lg:col-span-2")}
                >
                  <RoomCard room={room} featured={featured} hourlyBlockHours={policy.hourlyBlockHours} />
                </motion.li>
              );
            })}
            <motion.li
              key="long-stay"
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: visible.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <LongStayCard policy={policy} />
            </motion.li>
          </AnimatePresence>
        </motion.ul>

        <p className="mt-8 text-center text-xs text-charcoal/55">{t(ui.rooms.priceNote)}</p>
      </div>
    </section>
  );
}

function LongStayCard({ policy }: { policy: StayPolicy }) {
  const { t, tl } = useLanguage();
  const { openBooking } = useResortModals();

  return (
    <article className="flex h-full flex-col rounded-3xl bg-forest p-7 text-white shadow-card">
      <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-cream">
        <CalendarRange className="size-6" aria-hidden />
      </span>
      <h3 className="mt-5 font-serif text-2xl font-semibold">{t(ui.rooms.policyCardTitle)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        {interpolate(t(ui.rooms.policyCardText), { in: policy.checkInTime, out: policy.checkOutTime })}
      </p>
      <ul className="mt-5 space-y-2.5">
        {tl(policy.inclusions).map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-white/85">
            <CircleCheck className="mt-0.5 size-4 shrink-0 text-cream" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <Button
          variant="cream"
          size="md"
          className="w-full"
          onClick={() => openBooking({ specialRequests: ["LONG_STAY_EXPERT"] })}
        >
          {t(ui.rooms.policyCardCta)}
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </article>
  );
}

function RoomCard({
  room,
  featured,
  hourlyBlockHours,
}: {
  room: RoomCategory;
  featured: boolean;
  hourlyBlockHours: number;
}) {
  const { t, formatPrice } = useLanguage();
  const { openRoomDetail, openBooking } = useResortModals();

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-luxe",
        featured && "lg:flex-row",
      )}
    >
      <button
        type="button"
        onClick={() => openRoomDetail(room.id)}
        aria-label={`${t(ui.cta.viewDetails)}: ${t(room.name)}`}
        className={cn(
          "relative block aspect-[4/3] w-full shrink-0 cursor-pointer overflow-hidden",
          featured && "lg:aspect-auto lg:w-[58%]",
        )}
      >
        <Image
          src={room.coverImage.url}
          alt={t(room.coverImage.alt)}
          fill
          sizes={featured ? "(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
        {room.badgeText ? (
          <span className="absolute top-4 left-4 rounded-full bg-crimson px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase shadow">
            {t(room.badgeText)}
          </span>
        ) : null}
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-forest backdrop-blur">
          <Eye className="size-3.5" aria-hidden />
          {t(ui.views[room.viewType])}
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {interpolate(t(ui.rooms.units), { n: room.totalUnits })}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl font-semibold text-charcoal">{t(room.name)}</h3>
        <p className="mt-1 text-sm text-charcoal/60">{t(room.tagline)}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal/75">
          <span className="inline-flex items-center gap-1.5">
            <Maximize2 className="size-4 text-forest" aria-hidden />
            {interpolate(t(ui.rooms.sqm), { n: room.sizeSqm })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="size-4 text-forest" aria-hidden />
            {interpolate(t(ui.rooms.standardGuests), { n: room.standardGuests })}
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={t(ui.modals.amenitiesTitle)}>
          {room.amenities.slice(0, featured ? 7 : 5).map((key) => {
            const Icon = AMENITY_ICONS[key];
            return (
              <li
                key={key}
                title={t(ui.amenities[key])}
                className="grid size-9 place-items-center rounded-full bg-sand text-forest"
              >
                <Icon className="size-4" aria-hidden />
                <span className="sr-only">{t(ui.amenities[key])}</span>
              </li>
            );
          })}
        </ul>

        {featured ? (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-charcoal/70">{t(room.description)}</p>
        ) : null}

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-3 border-t border-stone pt-5">
            <div>
              <p className="text-[11px] font-semibold tracking-wide text-charcoal/50 uppercase">{t(ui.rooms.from)}</p>
              <p className="font-serif text-2xl font-semibold text-crimson">
                {formatPrice(room.basePriceVnd)}
                <span className="ml-1 font-sans text-xs font-medium text-charcoal/50">{t(ui.rooms.perNight)}</span>
              </p>
              <p className="mt-1 text-xs text-charcoal/60">
                <span className="font-semibold text-charcoal/80">{formatPrice(room.hourlyPriceVnd)}</span>
                {interpolate(t(ui.rooms.perHours), { n: hourlyBlockHours })}
                <span className="mx-1.5 text-charcoal/30" aria-hidden>
                  ·
                </span>
                <span className="font-semibold text-charcoal/80">{formatPrice(room.monthlyPriceVnd)}</span>
                {t(ui.rooms.perMonth)}
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" size="md" onClick={() => openRoomDetail(room.id)}>
              {t(ui.cta.viewDetails)}
            </Button>
            <Button size="md" onClick={() => openBooking({ roomType: room.type })}>
              {t(ui.cta.bookRoom)}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
