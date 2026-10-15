"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Crown, Gem, Presentation, Ruler, Sparkles, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useResortModals } from "@/components/client/InteractiveModals";
import { SECTION_IDS } from "@/components/client/nav-items";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { formatNumber, interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { EventHall, HallCapacity, LocalizedString, ResortImage } from "@/types/resort";

type Mode = "wedding" | "mice";

interface MiceWeddingSectionProps {
  halls: EventHall[];
  images: Record<Mode, ResortImage[]>;
}

const CAPACITY_COLUMNS: { key: keyof HallCapacity; label: LocalizedString }[] = [
  { key: "theater", label: ui.mice.colTheater },
  { key: "banquet", label: ui.mice.colBanquet },
  { key: "classroom", label: ui.mice.colClassroom },
  { key: "uShape", label: ui.mice.colUShape },
];

export function MiceWeddingSection({ halls, images }: MiceWeddingSectionProps) {
  const { t, tl, locale } = useLanguage();
  const { openEventRfp } = useResortModals();
  const [mode, setMode] = useState<Mode>("wedding");
  const [selectedHallId, setSelectedHallId] = useState<string>(
    halls.find((hall) => hall.isFlagship)?.id ?? halls[0]?.id ?? "",
  );

  const selectedHall = halls.find((hall) => hall.id === selectedHallId) ?? halls[0];
  const maxCapacity = Math.max(...halls.map((hall) => hall.capacity.theater), 1);
  const modeImages = images[mode];

  const content =
    mode === "wedding"
      ? { title: ui.mice.weddingTitle, body: ui.mice.weddingBody, points: ui.mice.weddingPoints, icon: Gem }
      : { title: ui.mice.miceTitle, body: ui.mice.miceBody, points: ui.mice.micePoints, icon: Presentation };

  const requestQuote = (hallCode?: EventHall["code"]) =>
    openEventRfp({ eventType: mode === "wedding" ? "WEDDING" : "CUSTOMER_CONFERENCE", hallCode });

  return (
    <section
      id={SECTION_IDS.events}
      aria-labelledby="mice-title"
      className="relative isolate overflow-hidden bg-forest py-20 text-white lg:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-48 -z-10 size-[600px] rounded-full bg-[radial-gradient(circle,rgb(184_20_20/0.25),transparent_65%)]"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          overline={t(ui.mice.overline)}
          title={t(ui.mice.title)}
          subtitle={t(ui.mice.subtitle)}
          titleId="mice-title"
        />

        {/* Mode toggle */}
        <div role="tablist" aria-label={t(ui.mice.overline)} className="mt-10 inline-flex rounded-full bg-forest-deep/60 p-1.5 ring-1 ring-white/10">
          {(["wedding", "mice"] as const).map((item) => {
            const isActive = mode === item;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setMode(item)}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6",
                  isActive ? "text-forest" : "text-white/75 hover:text-white",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="mice-mode-pill"
                    className="absolute inset-0 rounded-full bg-cream"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative inline-flex items-center gap-2">
                  {item === "wedding" ? <Crown className="size-4" aria-hidden /> : <Presentation className="size-4" aria-hidden />}
                  {t(item === "wedding" ? ui.mice.tabWedding : ui.mice.tabMice)}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16"
          >
            <div className="flex flex-col justify-center">
              <content.icon className="size-9 text-cream" aria-hidden />
              <h3 className="mt-4 font-serif text-3xl leading-tight font-semibold text-balance sm:text-4xl">
                {t(content.title)}
              </h3>
              <p className="mt-5 leading-relaxed text-white/75">{t(content.body)}</p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {tl(content.points).map((point) => (
                  <li key={point} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
                    <span className="text-sm text-white/90">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => requestQuote()}>
                  <UtensilsCrossed className="size-4" aria-hidden />
                  {t(ui.cta.requestQuoteMenu)}
                </Button>
              </div>
            </div>

            <div className="grid h-[420px] grid-cols-5 grid-rows-2 gap-3 sm:h-[520px] sm:gap-4">
              {modeImages[0] ? (
                <div className="relative col-span-3 row-span-2 overflow-hidden rounded-3xl">
                  <Image src={modeImages[0].url} alt={t(modeImages[0].alt)} fill sizes="(min-width: 1024px) 420px, 60vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 to-transparent" />
                  <p className="absolute right-5 bottom-5 left-5 font-serif text-lg font-semibold sm:text-xl">
                    {t(modeImages[0].alt)}
                  </p>
                </div>
              ) : null}
              {modeImages.slice(1, 3).map((image) => (
                <div key={image.url} className="relative col-span-2 overflow-hidden rounded-3xl">
                  <Image src={image.url} alt={t(image.alt)} fill sizes="(min-width: 1024px) 280px, 40vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
                  <p className="absolute right-3 bottom-3 left-3 text-xs font-semibold sm:text-sm">{t(image.alt)}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hall capacity comparison */}
        <Reveal className="mt-20 overflow-hidden rounded-3xl bg-white text-charcoal shadow-luxe">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div className="min-w-0 p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold">{t(ui.mice.tableTitle)}</h3>
              <p className="mt-1 text-sm text-charcoal/60">{t(ui.mice.tableSubtitle)}</p>

              <div className="-mx-6 mt-6 overflow-x-auto px-6 sm:-mx-8 sm:px-8">
                <table className="w-full min-w-[560px] border-separate border-spacing-y-2 text-sm">
                  <thead>
                    <tr className="text-left text-[11px] font-bold tracking-wider text-charcoal/50 uppercase">
                      <th scope="col" className="px-3 py-2">{t(ui.mice.colHall)}</th>
                      <th scope="col" className="px-3 py-2 text-right">{t(ui.mice.colArea)}</th>
                      {CAPACITY_COLUMNS.map((column) => (
                        <th key={column.key} scope="col" className="px-3 py-2 text-right">
                          {t(column.label)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {halls.map((hall) => {
                      const isSelected = hall.id === selectedHall?.id;
                      return (
                        <tr
                          key={hall.id}
                          onClick={() => setSelectedHallId(hall.id)}
                          className={cn(
                            "cursor-pointer transition",
                            isSelected ? "bg-forest text-white" : "bg-sand hover:bg-stone",
                          )}
                        >
                          <th scope="row" className="rounded-l-xl px-3 py-3.5 text-left font-semibold">
                            <button
                              type="button"
                              onClick={() => setSelectedHallId(hall.id)}
                              aria-pressed={isSelected}
                              className="flex cursor-pointer items-center gap-2 text-left"
                            >
                              {hall.isFlagship ? <Crown className={cn("size-4", isSelected ? "text-cream" : "text-crimson")} aria-hidden /> : null}
                              {t(hall.name)}
                            </button>
                          </th>
                          <td className="px-3 py-3.5 text-right tabular-nums">{formatNumber(hall.areaSqm, locale)}</td>
                          {CAPACITY_COLUMNS.map((column, index) => (
                            <td
                              key={column.key}
                              className={cn(
                                "px-3 py-3.5 text-right font-semibold tabular-nums",
                                index === CAPACITY_COLUMNS.length - 1 && "rounded-r-xl",
                                column.key === "banquet" && !isSelected && "text-crimson",
                              )}
                            >
                              {formatNumber(hall.capacity[column.key], locale)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-[11px] font-bold tracking-wider text-charcoal/50 uppercase">
                  {t(ui.mice.colTheater)} ({t(ui.mice.guestsUnit)})
                </p>
                {halls.map((hall) => (
                  <div key={hall.id} className="flex items-center gap-3 text-xs">
                    <span className="w-32 shrink-0 truncate font-semibold text-charcoal/70">{t(hall.name)}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-sand">
                      <motion.div
                        className={cn("h-full rounded-full", hall.id === selectedHall?.id ? "bg-crimson" : "bg-forest/50")}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(hall.capacity.theater / maxCapacity) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="w-16 shrink-0 text-right font-semibold tabular-nums">
                      {formatNumber(hall.capacity.theater, locale)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {selectedHall ? (
              <AnimatePresence mode="wait">
                <motion.aside
                  key={selectedHall.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex min-h-[420px] flex-col justify-end overflow-hidden"
                >
                  <Image
                    src={selectedHall.coverImage.url}
                    alt={t(selectedHall.coverImage.alt)}
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/75 to-forest-deep/10" />
                  <div className="relative p-6 text-white sm:p-8">
                    {selectedHall.badgeText ? (
                      <span className="rounded-full bg-crimson px-3 py-1 text-[11px] font-bold tracking-wide uppercase">
                        {t(selectedHall.badgeText)}
                      </span>
                    ) : null}
                    <h4 className="mt-3 font-serif text-2xl font-semibold">{t(selectedHall.name)}</h4>
                    <p className="mt-1 text-sm text-cream">{t(selectedHall.tagline)}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/80">{t(selectedHall.description)}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                        <Ruler className="size-3.5" aria-hidden />
                        {interpolate(t(ui.mice.ceiling), { n: selectedHall.ceilingHeightM })}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                        <UtensilsCrossed className="size-3.5" aria-hidden />
                        {interpolate(t(ui.mice.tables), { n: selectedHall.banquetTables })}
                      </span>
                      {tl(selectedHall.features).slice(0, 2).map((feature) => (
                        <span key={feature} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button size="md" className="mt-6 w-full" onClick={() => requestQuote(selectedHall.code)}>
                      {t(ui.cta.requestQuoteMenu)}
                    </Button>
                  </div>
                </motion.aside>
              </AnimatePresence>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
