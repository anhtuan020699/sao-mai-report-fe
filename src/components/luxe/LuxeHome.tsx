"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { useResortModals } from "@/components/client/InteractiveModals";
import {
  LUXE_SECTIONS,
  formatCompactVnd,
  luxe,
} from "@/components/luxe/luxe-copy";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { formatIsoDate, interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { MediaCollections } from "@/services/resort-service";
import type {
  PromotionPost,
  ResortFacility,
  ResortStat,
  RoomCategory,
  SiteSettings,
} from "@/types/resort";

const EASE = [0.22, 1, 0.36, 1] as const;

function Fade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.li>
  );
}

function Overline({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-medium tracking-[0.32em] uppercase",
        light ? "text-brass-light" : "text-brass",
        className,
      )}
    >
      <span aria-hidden className="h-px w-10 bg-current" />
      {children}
    </p>
  );
}

function TextLink({
  children,
  onClick,
  href,
  light = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  light?: boolean;
}) {
  const className = cn(
    "group inline-flex cursor-pointer items-center gap-3 border-b pb-1.5 text-[11px] font-medium tracking-[0.24em] uppercase transition-colors",
    light
      ? "border-white/40 text-white hover:border-white"
      : "border-ink/30 text-ink hover:border-ink",
  );
  const content = (
    <>
      {children}
      <ArrowRight
        className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
        aria-hidden
      />
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------ */

function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function Hero({ image }: { image: MediaCollections["luxe"]["hero"] }) {
  const { t } = useLanguage();
  const { openBooking } = useResortModals();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);

  const field =
    "w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-[15px] text-white [color-scheme:dark] focus:ring-0 focus:outline-none";

  return (
    <section className="relative h-svh min-h-[40rem] overflow-hidden bg-ink text-white">
      <Image
        src={image.url}
        alt={t(image.alt)}
        fill
        priority
        sizes="100vw"
        className="animate-ken-burns object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70"
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
          className="max-w-4xl"
        >
          <p className="text-[11px] font-medium tracking-[0.42em] text-white/80 uppercase">
            {t(luxe.hero.overline)}
          </p>
          <h1 className="mt-8 font-serif text-[2.6rem] leading-[1.1] font-normal text-balance sm:text-6xl lg:text-7xl">
            {t(luxe.hero.title)}
          </h1>
          <span
            aria-hidden
            className="mx-auto mt-10 block h-px w-16 bg-brass-light"
          />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed font-light text-white/80 sm:text-lg">
            {t(luxe.hero.subtitle)}
          </p>
        </motion.div>

        <a
          href={`#${LUXE_SECTIONS.stay}`}
          className="absolute bottom-36 hidden flex-col items-center gap-3 text-[10px] tracking-[0.32em] text-white/70 uppercase transition hover:text-white md:flex"
        >
          {t(luxe.hero.scroll)}
          <span className="relative h-12 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-0 animate-scroll-cue bg-white" />
          </span>
        </a>
      </div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.9 }}
        onSubmit={(event) => {
          event.preventDefault();
          openBooking({
            checkIn: checkIn || undefined,
            checkOut: checkOut || undefined,
            adults,
          });
        }}
        className="absolute inset-x-0 bottom-0 border-t border-white/15 bg-black/25 backdrop-blur-md"
      >
        <div className="mx-auto hidden max-w-[96rem] grid-cols-[1fr_1fr_1fr_auto] md:grid">
          <label className="border-r border-white/15 px-8 py-6 lg:px-12">
            <span className="block text-[10px] tracking-[0.28em] text-white/60 uppercase">
              {t(luxe.hero.checkIn)}
            </span>
            <input
              type="date"
              value={checkIn}
              onChange={(event) => {
                setCheckIn(event.target.value);
                if (!checkOut || checkOut <= event.target.value)
                  setCheckOut(addDays(event.target.value, 1));
              }}
              className={cn(field, "mt-2")}
            />
          </label>
          <label className="border-r border-white/15 px-8 py-6 lg:px-12">
            <span className="block text-[10px] tracking-[0.28em] text-white/60 uppercase">
              {t(luxe.hero.checkOut)}
            </span>
            <input
              type="date"
              value={checkOut}
              min={checkIn || undefined}
              onChange={(event) => setCheckOut(event.target.value)}
              className={cn(field, "mt-2")}
            />
          </label>
          <label className="border-r border-white/15 px-8 py-6 lg:px-12">
            <span className="block text-[10px] tracking-[0.28em] text-white/60 uppercase">
              {t(luxe.hero.guests)}
            </span>
            <select
              value={adults}
              onChange={(event) => setAdults(Number(event.target.value))}
              className={cn(field, "mt-2")}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n} className="text-ink">
                  {interpolate(t(luxe.hero.guestsValue), { n })}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="cursor-pointer bg-ivory px-10 text-[11px] font-medium tracking-[0.24em] text-ink uppercase transition hover:bg-white lg:px-14"
          >
            {t(luxe.hero.check)}
          </button>
        </div>
        <button
          type="submit"
          className="flex h-16 w-full cursor-pointer items-center justify-center text-[11px] font-medium tracking-[0.28em] uppercase md:hidden"
        >
          {t(luxe.hero.check)}
        </button>
      </motion.form>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Intro({ stats }: { stats: ResortStat[] }) {
  const { t } = useLanguage();
  return (
    <section className="bg-ivory px-6 py-28 sm:py-36 lg:py-44">
      <div className="mx-auto max-w-4xl text-center">
        <Fade>
          <Overline className="justify-center">
            {t(luxe.intro.overline)}
          </Overline>
          <p className="mt-10 font-serif text-[1.75rem] leading-[1.45] font-normal text-balance text-ink sm:text-4xl sm:leading-[1.4]">
            {t(luxe.intro.text)}
          </p>
        </Fade>
      </div>
      <dl className="mx-auto mt-24 grid max-w-6xl grid-cols-2 gap-y-12 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Fade
            key={stat.id}
            delay={0.1 * index}
            className={cn(
              "flex flex-col border-ink/10 px-4 text-center",
              index % 2 === 1 && "border-l",
              index === 2 && "lg:border-l",
            )}
          >
            <dt className="order-2 mt-3 text-[11px] tracking-[0.24em] text-ink/55 uppercase">
              {t(stat.label)}
            </dt>
            <dd className="font-serif text-5xl font-normal text-ink sm:text-6xl">
              {stat.value}
            </dd>
          </Fade>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function FeatureRoom({
  room,
  reverse,
  index,
}: {
  room: RoomCategory;
  reverse: boolean;
  index: number;
}) {
  const { t, locale } = useLanguage();
  const { openRoomDetail } = useResortModals();
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Fade className={cn("lg:col-span-7", reverse && "lg:order-2")}>
        <button
          type="button"
          onClick={() => openRoomDetail(room.id)}
          aria-label={t(room.name)}
          className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-stone"
        >
          <Image
            src={room.coverImage.url}
            alt={t(room.coverImage.alt)}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]"
          />
        </button>
      </Fade>
      <Fade
        delay={0.15}
        className={cn("lg:col-span-5", reverse && "lg:order-1")}
      >
        <p className="font-serif text-sm text-brass">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-4 font-serif text-4xl font-normal text-ink sm:text-5xl">
          {t(room.name)}
        </h3>
        <p className="mt-6 max-w-md leading-relaxed text-ink/65">
          {t(room.description)}
        </p>
        <p className="mt-8 text-[11px] tracking-[0.22em] text-ink/55 uppercase">
          {room.sizeSqm} m² ·{" "}
          {interpolate(t(luxe.stay.guests), { n: room.standardGuests })} ·{" "}
          {interpolate(t(luxe.stay.units), { n: room.totalUnits })}
        </p>
        <p className="mt-3 font-serif text-lg text-ink">
          {interpolate(t(luxe.stay.from), {
            price: formatCompactVnd(room.basePriceVnd, locale),
          })}
        </p>
        <div className="mt-10">
          <TextLink onClick={() => openRoomDetail(room.id)}>
            {t(luxe.stay.discover)}
          </TextLink>
        </div>
      </Fade>
    </article>
  );
}

function Stay({ rooms }: { rooms: RoomCategory[] }) {
  const { t, locale } = useLanguage();
  const { openRoomDetail, openBooking } = useResortModals();
  const villas = rooms.filter((room) => room.group === "VILLA");
  const hotel = rooms.filter((room) => room.group === "HOTEL");

  return (
    <section
      id={LUXE_SECTIONS.stay}
      className="scroll-mt-16 bg-ivory px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12"
    >
      <div className="mx-auto max-w-[88rem]">
        <Fade className="max-w-3xl">
          <Overline>{t(luxe.stay.overline)}</Overline>
          <h2 className="mt-8 font-serif text-4xl leading-[1.15] font-normal text-balance text-ink sm:text-5xl lg:text-6xl">
            {t(luxe.stay.title)}
          </h2>
        </Fade>

        <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
          {villas.map((room, index) => (
            <FeatureRoom
              key={room.id}
              room={room}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-28 lg:mt-40">
          <Fade>
            <p className="text-[11px] tracking-[0.32em] text-ink/55 uppercase">
              {t(luxe.stay.otherRooms)}
            </p>
          </Fade>
          <ul className="mt-8 border-t border-ink/15">
            {hotel.map((room, index) => (
              <FadeItem key={room.id} delay={0.05 * index}>
                <button
                  type="button"
                  onClick={() => openRoomDetail(room.id)}
                  className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-6 border-b border-ink/15 py-7 text-left sm:grid-cols-[minmax(0,1fr)_10rem_12rem_auto]"
                >
                  <span>
                    <span className="block font-serif text-2xl text-ink transition-colors group-hover:text-brass sm:text-3xl">
                      {t(room.name)}
                    </span>
                    <span className="mt-1.5 block text-xs text-ink/55 sm:hidden">
                      {room.sizeSqm} m² ·{" "}
                      {interpolate(t(luxe.stay.from), { price: formatCompactVnd(room.basePriceVnd, locale) })}
                    </span>
                  </span>
                  <span className="hidden text-[11px] tracking-[0.22em] text-ink/55 uppercase sm:block">
                    {room.sizeSqm} m² ·{" "}
                    {interpolate(t(luxe.stay.guests), {
                      n: room.standardGuests,
                    })}
                  </span>
                  <span className="hidden text-sm text-ink/70 sm:block">
                    {interpolate(t(luxe.stay.from), {
                      price: formatCompactVnd(room.basePriceVnd, locale),
                    })}
                  </span>
                  <ArrowRight
                    className="size-4 text-ink/40 transition duration-500 group-hover:translate-x-1 group-hover:text-ink"
                    aria-hidden
                  />
                </button>
              </FadeItem>
            ))}
          </ul>
          <Fade className="mt-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-xl leading-relaxed text-ink/65">
              {t(luxe.stay.longStay)}
            </p>
            <TextLink
              onClick={() =>
                openBooking({ specialRequests: ["LONG_STAY_EXPERT"] })
              }
            >
              {t(luxe.stay.longStayCta)}
            </TextLink>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Film({ video }: { video: NonNullable<SiteSettings["introVideo"]> }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);

  return (
    <section className="bg-ink px-5 py-28 text-white sm:px-8 sm:py-36 lg:px-12">
      <div className="mx-auto max-w-[88rem]">
        <Fade className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Overline light>{t(luxe.video.overline)}</Overline>
            <h2 className="mt-8 font-serif text-4xl font-normal sm:text-5xl">
              {t(luxe.video.title)}
            </h2>
          </div>
        </Fade>
        <Fade delay={0.15} className="mt-14">
          <div className="relative aspect-video overflow-hidden bg-black">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={t(video.title)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${t(luxe.video.play)}: ${t(video.title)}`}
                className="group absolute inset-0 cursor-pointer"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1408px) 1408px, 100vw"
                  className="object-cover opacity-80 transition duration-[1.6s] ease-out group-hover:scale-[1.03] group-hover:opacity-90"
                />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="flex flex-col items-center gap-5">
                    <span className="grid size-20 place-items-center rounded-full border border-white/70 transition duration-500 group-hover:scale-105 group-hover:bg-white/10 sm:size-24">
                      <Play
                        className="size-6 translate-x-0.5 fill-current"
                        aria-hidden
                      />
                    </span>
                    <span className="text-[11px] tracking-[0.32em] uppercase">
                      {t(luxe.video.play)}
                    </span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Events({ images }: { images: MediaCollections["luxe"] }) {
  const { t } = useLanguage();
  const { openEventRfp } = useResortModals();
  const panels = [
    {
      image: images.wedding,
      overline: luxe.events.weddingOverline,
      title: luxe.events.weddingTitle,
      onClick: () => openEventRfp({ eventType: "WEDDING" }),
    },
    {
      image: images.conference,
      overline: luxe.events.corporateOverline,
      title: luxe.events.corporateTitle,
      onClick: () => openEventRfp({ eventType: "CUSTOMER_CONFERENCE" }),
    },
  ];

  return (
    <section id={LUXE_SECTIONS.events} className="scroll-mt-16 bg-ivory">
      <div className="mx-auto max-w-[88rem] px-5 py-28 sm:px-8 sm:py-36 lg:px-12">
        <Fade className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Overline>{t(luxe.events.overline)}</Overline>
            <h2 className="mt-8 font-serif text-4xl leading-[1.15] font-normal text-balance text-ink sm:text-5xl lg:text-6xl">
              {t(luxe.events.title)}
            </h2>
          </div>
          <p className="max-w-xs text-[11px] leading-loose tracking-[0.22em] text-ink/55 uppercase lg:col-span-4 lg:justify-self-end lg:text-right">
            {t(luxe.events.facts)}
          </p>
        </Fade>
      </div>
      <div className="grid md:grid-cols-2">
        {panels.map((panel) => (
          <article
            key={panel.image.url}
            className="group relative h-[34rem] overflow-hidden bg-ink sm:h-[42rem] lg:h-[48rem]"
          >
            <Image
              src={panel.image.url}
              alt={t(panel.image.alt)}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-90 transition duration-[2s] ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-12 lg:p-16">
              <Overline light>{t(panel.overline)}</Overline>
              <h3 className="mt-6 max-w-md font-serif text-3xl leading-tight font-normal sm:text-4xl">
                {t(panel.title)}
              </h3>
              <div className="mt-8">
                <TextLink light onClick={panel.onClick}>
                  {t(luxe.events.enquire)}
                </TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const SIGNATURE_FACILITIES: ResortFacility["kind"][] = ["RESTAURANT_BAR", "POOL", "TENNIS_PICKLEBALL"];

function Experiences({ facilities }: { facilities: ResortFacility[] }) {
  const { t } = useLanguage();
  const signature = facilities.filter((facility) => SIGNATURE_FACILITIES.includes(facility.kind));
  return (
    <section
      id={LUXE_SECTIONS.experiences}
      className="scroll-mt-16 bg-ivory px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
    >
      <div className="mx-auto max-w-[88rem]">
        <Fade className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Overline>{t(luxe.experiences.overline)}</Overline>
            <h2 className="mt-8 font-serif text-4xl font-normal text-ink sm:text-5xl lg:text-6xl">
              {t(luxe.experiences.title)}
            </h2>
          </div>
          <TextLink href="/dich-vu">{t(luxe.experiences.all)}</TextLink>
        </Fade>
        <ul className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {signature.map((facility, index) => (
            <FadeItem
              key={facility.id}
              delay={0.08 * (index % 3)}
              className={cn(index % 3 === 1 && "lg:mt-20")}
            >
              <Link href={`/dich-vu#${facility.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={facility.coverImage.url}
                    alt={t(facility.coverImage.alt)}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 font-serif text-sm text-brass">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-normal text-ink transition-colors group-hover:text-brass sm:text-3xl">
                  {t(facility.name)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {t(facility.tagline)}
                </p>
              </Link>
            </FadeItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Heritage({ image }: { image: MediaCollections["luxe"]["heritage"] }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative h-[42rem] overflow-hidden bg-ink text-white sm:h-[48rem]"
    >
      <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
        <Image
          src={image.url}
          alt={t(image.alt)}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-black/45" />
      <div className="relative flex h-full items-center justify-center px-6">
        <Fade className="max-w-4xl text-center">
          <span
            aria-hidden
            className="font-serif text-6xl leading-none text-brass-light"
          >
            “
          </span>
          <blockquote className="mt-2 font-serif text-3xl leading-[1.35] font-normal text-balance italic sm:text-5xl">
            {t(luxe.heritage.quote)}
          </blockquote>
          <p className="mt-10 text-[11px] tracking-[0.32em] text-white/70 uppercase">
            {t(luxe.heritage.caption)}
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Journal({ posts }: { posts: PromotionPost[] }) {
  const { t, locale } = useLanguage();
  return (
    <section
      id={LUXE_SECTIONS.journal}
      className="scroll-mt-16 bg-ivory px-5 py-28 sm:px-8 sm:py-36 lg:px-12"
    >
      <div className="mx-auto max-w-[88rem]">
        <Fade className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <Overline>{t(luxe.journal.overline)}</Overline>
            <h2 className="mt-8 font-serif text-4xl font-normal text-ink sm:text-5xl">
              {t(luxe.journal.title)}
            </h2>
          </div>
          <TextLink href="/tin-tuc">{t(luxe.journal.all)}</TextLink>
        </Fade>
        <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {posts.map((post, index) => (
            <FadeItem key={post.id} delay={0.08 * index}>
              <Link href={`/tin-tuc/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                  <Image
                    src={post.coverImage.url}
                    alt={t(post.coverImage.alt)}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition duration-[1.6s] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-6 text-[11px] tracking-[0.22em] text-ink/50 uppercase">
                  {t(ui.offers.categories[post.category])} ·{" "}
                  {formatIsoDate(post.publishedAt, locale)}
                </p>
                <h3 className="mt-3 font-serif text-2xl leading-snug font-normal text-balance text-ink transition-colors group-hover:text-brass">
                  {t(post.title)}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink/60">
                  {t(post.excerpt)}
                </p>
              </Link>
            </FadeItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Contact({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const block = "border-t border-ink/15 pt-6";
  const label = "text-[11px] tracking-[0.24em] text-ink/50 uppercase";

  return (
    <section
      id={LUXE_SECTIONS.contact}
      className="scroll-mt-16 bg-ivory px-5 pb-28 sm:px-8 sm:pb-36 lg:px-12"
    >
      <div className="mx-auto grid max-w-[88rem] gap-16 lg:grid-cols-12">
        <Fade className="lg:col-span-5">
          <Overline>{t(luxe.contact.overline)}</Overline>
          <h2 className="mt-8 font-serif text-4xl leading-[1.15] font-normal text-balance text-ink sm:text-5xl">
            {t(luxe.contact.title)}
          </h2>
          <div className="mt-14 space-y-8">
            <div className={block}>
              <p className={label}>{t(luxe.contact.address)}</p>
              <p className="mt-3 max-w-sm leading-relaxed text-ink/80">
                {t(settings.address)}
              </p>
              <div className="mt-5">
                <TextLink href={settings.mapLink}>
                  {t(luxe.contact.directions)}
                </TextLink>
              </div>
            </div>
            <div className={block}>
              <p className={label}>{t(luxe.contact.reservations)}</p>
              <p className="mt-3 font-serif text-2xl text-ink">
                <a
                  href={`tel:${settings.hotline.replace(/\s/g, "")}`}
                  className="transition hover:text-brass"
                >
                  {settings.hotline}
                </a>
              </p>
              <p className="mt-1 text-sm text-ink/65">
                <a
                  href={`mailto:${settings.emails.reception}`}
                  className="transition hover:text-ink"
                >
                  {settings.emails.reception}
                </a>
              </p>
            </div>
            <div className={block}>
              <p className={label}>{t(luxe.contact.events)}</p>
              <p className="mt-3 text-sm text-ink/65">
                {settings.phones.join(" · ")}
                <br />
                <a
                  href={`mailto:${settings.emails.sales}`}
                  className="transition hover:text-ink"
                >
                  {settings.emails.sales}
                </a>
              </p>
            </div>
          </div>
        </Fade>
        <Fade delay={0.15} className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-stone lg:aspect-auto lg:h-full lg:min-h-[36rem]">
            <iframe
              src={settings.mapEmbedUrl}
              title={settings.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[0.85] contrast-[0.95]"
            />
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export interface LuxeHomeProps {
  images: MediaCollections["luxe"];
  stats: ResortStat[];
  rooms: RoomCategory[];
  facilities: ResortFacility[];
  posts: PromotionPost[];
  settings: SiteSettings;
}

export function LuxeHome({
  images,
  stats,
  rooms,
  facilities,
  posts,
  settings,
}: LuxeHomeProps) {
  return (
    <>
      <Hero image={images.hero} />
      <Intro stats={stats} />
      <Stay rooms={rooms} />
      {settings.introVideo ? <Film video={settings.introVideo} /> : null}
      <Events images={images} />
      <Heritage image={images.heritage} />
      <Experiences facilities={facilities} />
      <Journal posts={posts} />
      <Contact settings={settings} />
    </>
  );
}
