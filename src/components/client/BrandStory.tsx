"use client";

import { CircleCheck, Leaf } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { cn } from "@/lib/utils";
import type { CorporatePartner, ResortImage, ResortStat, SiteSettings } from "@/types/resort";

interface BrandStoryProps {
  stats: ResortStat[];
  partners: CorporatePartner[];
  images: ResortImage[];
  settings: SiteSettings;
}

const STAT_TONES = [
  "bg-forest text-white",
  "bg-white text-charcoal",
  "bg-white text-charcoal",
  "bg-crimson text-white",
];

export function BrandStory({ stats, partners, images, settings }: BrandStoryProps) {
  const { t, tl } = useLanguage();
  const [primary, secondary, tertiary] = images;

  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden pt-24 pb-20 sm:pt-28 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgb(24_58_40/0.08),transparent_65%)]"
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal className="flex flex-col justify-center">
          <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-crimson uppercase">
            <span className="h-px w-8 bg-crimson" aria-hidden />
            {t(ui.story.overline)} · {settings.foundedYear} – {settings.milestoneYear}
          </p>
          <h2 id="story-title" className="mt-4 font-serif text-3xl leading-[1.15] font-semibold text-balance text-charcoal sm:text-4xl lg:text-5xl">
            {t(ui.story.title)}
          </h2>
          <p className="mt-6 border-l-2 border-crimson pl-5 font-serif text-lg leading-relaxed text-forest italic sm:text-xl">
            {t(ui.story.lead)}
          </p>
          <p className="mt-6 leading-relaxed text-charcoal/75">{t(ui.story.body1)}</p>
          <p className="mt-4 leading-relaxed text-charcoal/75">{t(ui.story.body2)}</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-3">
            {tl(ui.story.pillars).map((pillar) => (
              <li key={pillar} className="flex items-start gap-2 rounded-xl bg-sand px-3.5 py-3 text-sm font-medium text-charcoal/85">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
                {pillar}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="relative">
          <div className="grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-3 sm:gap-4" style={{ aspectRatio: "1 / 1.05" }}>
            {primary ? (
              <Reveal className="relative col-span-4 row-span-4 overflow-hidden rounded-3xl shadow-luxe" y={40}>
                <Image src={primary.url} alt={t(primary.alt)} fill sizes="(min-width: 1024px) 400px, 66vw" className="object-cover transition duration-700 hover:scale-105" />
                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-forest backdrop-blur">
                  <Leaf className="size-3.5" aria-hidden />
                  {settings.foundedYear} – {settings.milestoneYear}
                </span>
              </Reveal>
            ) : null}
            {secondary ? (
              <Reveal delay={0.15} className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl" y={40}>
                <Image src={secondary.url} alt={t(secondary.alt)} fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </Reveal>
            ) : null}
            {tertiary ? (
              <Reveal delay={0.25} className="relative col-span-2 row-span-3 overflow-hidden rounded-3xl" y={40}>
                <Image src={tertiary.url} alt={t(tertiary.alt)} fill sizes="(min-width: 1024px) 200px, 33vw" className="object-cover transition duration-700 hover:scale-105" />
              </Reveal>
            ) : null}
            <div className="col-span-4 row-span-2 grid grid-cols-2 gap-3 sm:gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <StatCard key={stat.id} stat={stat} tone={STAT_TONES[index]} delay={0.1 * index} />
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
            {stats.slice(2).map((stat, index) => (
              <StatCard key={stat.id} stat={stat} tone={STAT_TONES[index + 2]} delay={0.2 + 0.1 * index} />
            ))}
          </div>
        </div>
      </div>

      {/* Corporate trust marquee */}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
        <Reveal className="text-center">
          <h3 className="font-serif text-2xl font-semibold text-charcoal sm:text-3xl">{t(ui.story.partnersTitle)}</h3>
          <p className="mt-2 text-sm text-charcoal/60">{t(ui.story.partnersSubtitle)}</p>
        </Reveal>
      </div>
      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {[...partners, ...partners].map((partner, index) => (
            <li
              key={`${partner.id}-${index}`}
              aria-hidden={index >= partners.length}
              className="flex h-20 min-w-56 items-center gap-4 rounded-2xl border border-stone bg-white px-6 shadow-sm transition hover:border-forest/30 hover:shadow-card"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand text-[11px] font-bold text-forest">
                {partner.countryCode}
              </span>
              <span className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight whitespace-nowrap text-charcoal">{partner.name}</span>
                <span className="text-xs whitespace-nowrap text-charcoal/55">{t(partner.industry)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatCard({ stat, tone, delay }: { stat: ResortStat; tone: string; delay: number }) {
  const { t } = useLanguage();
  const isDark = tone.includes("text-white");
  return (
    <Reveal
      delay={delay}
      className={cn("flex h-full flex-col justify-center rounded-3xl p-4 shadow-card sm:p-6", tone)}
    >
      <p className="font-serif text-2xl leading-none font-semibold whitespace-nowrap sm:text-4xl lg:text-[2.6rem]">
        {stat.value}
      </p>
      <p className={cn("mt-2 text-sm font-bold", isDark ? "text-white" : "text-forest")}>{t(stat.label)}</p>
      <p className={cn("mt-1 hidden text-xs sm:block", isDark ? "text-white/70" : "text-charcoal/55")}>
        {t(stat.description)}
      </p>
    </Reveal>
  );
}
