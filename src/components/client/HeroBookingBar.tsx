"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  BedDouble,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  PartyPopper,
  Search,
  Send,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useResortModals } from "@/components/client/InteractiveModals";
import { SECTION_IDS } from "@/components/client/nav-items";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { EventType, GuestRange, HeroSlide, RoomCategory, RoomType } from "@/types/resort";

const SLIDE_INTERVAL_MS = 7000;

interface HeroBookingBarProps {
  slides: HeroSlide[];
  rooms: RoomCategory[];
}

export function HeroBookingBar({ slides, rooms }: HeroBookingBarProps) {
  return (
    <section id={SECTION_IDS.home} aria-label="Hero" className="relative">
      <HeroSlider slides={slides} />
      <div className="relative z-20 mx-auto -mt-28 max-w-6xl px-4 sm:-mt-24 sm:px-6 lg:px-8">
        <BookingBar rooms={rooms} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const { t } = useLanguage();
  const { openEventRfp } = useResortModals();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  const slide = slides[index];
  if (!slide) return null;

  const go = (direction: 1 | -1) => setIndex((current) => (current + direction + slides.length) % slides.length);

  return (
    <div
      ref={containerRef}
      className="relative isolate h-[calc(100svh-5.25rem)] min-h-[640px] overflow-hidden bg-forest-deep sm:min-h-[680px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_INTERVAL_MS / 1000 + 1.2, ease: "linear" } }}
          >
            <Image
              src={slide.image.url}
              alt={t(slide.image.alt)}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/25 to-forest-deep/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/70 via-forest-deep/20 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-36 sm:px-6 lg:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-cream/40 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-cream backdrop-blur-md sm:text-xs"
        >
          <Award className="size-4 text-cream" aria-hidden />
          {t(ui.hero.milestone)}
        </motion.p>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-3xl"
          >
            <p className="flex items-center gap-3 text-xs font-bold tracking-[0.3em] text-white/85 uppercase">
              <span className="h-px w-10 bg-crimson" aria-hidden />
              {t(slide.eyebrow)}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.08] font-semibold text-balance text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              {t(slide.title)}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{t(slide.subtitle)}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`#${SECTION_IDS.stay}`} className={buttonVariants({ size: "lg" })}>
            <BedDouble className="size-4" aria-hidden />
            {t(ui.cta.exploreStay)}
          </a>
          <Button variant="outlineLight" size="lg" onClick={() => openEventRfp()}>
            <PartyPopper className="size-4" aria-hidden />
            {t(ui.cta.planEvent)}
          </Button>
        </div>
      </motion.div>

      {/* Slider controls */}
      <div className="absolute right-4 bottom-36 left-4 mx-auto flex max-w-7xl items-center justify-between sm:right-6 sm:bottom-32 sm:left-6 lg:right-8 lg:left-8">
        <div className="flex items-center gap-2">
          {slides.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={interpolate(t(ui.hero.goTo), { n: dotIndex + 1 })}
              aria-current={dotIndex === index}
              className="group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/30 transition-all"
              style={{ width: dotIndex === index ? 48 : 18 }}
            >
              {dotIndex === index ? (
                paused ? (
                  <span className="absolute inset-0 bg-white" />
                ) : (
                  <motion.span
                    key={item.id}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_INTERVAL_MS / 1000, ease: "linear" }}
                  />
                )
              ) : null}
            </button>
          ))}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <SliderArrow label={t(ui.hero.prev)} onClick={() => go(-1)}>
            <ChevronLeft className="size-5" aria-hidden />
          </SliderArrow>
          <SliderArrow label={t(ui.hero.next)} onClick={() => go(1)}>
            <ChevronRight className="size-5" aria-hidden />
          </SliderArrow>
        </div>
      </div>
    </div>
  );
}

function SliderArrow({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur transition hover:bg-white hover:text-forest"
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */

type BookingTab = "stay" | "event";

const EVENT_TYPES: EventType[] = ["WEDDING", "CUSTOMER_CONFERENCE", "GALA_DINNER", "TEAM_BUILDING"];
const GUEST_RANGES: GuestRange[] = ["100_300", "300_500", "500_800", "800_1200", "1200_PLUS"];

function BarField({
  icon,
  label,
  htmlFor,
  children,
}: {
  icon: ReactNode;
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="group flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-stone bg-alabaster px-4 py-2.5 transition focus-within:border-forest focus-within:bg-white">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-charcoal/55 uppercase"
      >
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

const BAR_CONTROL =
  "w-full cursor-pointer appearance-none bg-transparent text-sm font-semibold text-charcoal focus:outline-none";

function BookingBar({ rooms }: { rooms: RoomCategory[] }) {
  const { t } = useLanguage();
  const { openBooking, openEventRfp } = useResortModals();
  const [tab, setTab] = useState<BookingTab>("stay");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState<RoomType>(rooms[0]?.type ?? "VILLA");
  const [adults, setAdults] = useState(2);

  const [eventType, setEventType] = useState<EventType>("WEDDING");
  const [eventDate, setEventDate] = useState("");
  const [guestRange, setGuestRange] = useState<GuestRange>("300_500");

  const tabs: { id: BookingTab; label: string; icon: ReactNode }[] = [
    { id: "stay", label: t(ui.bookingBar.tabStay), icon: <BedDouble className="size-4" aria-hidden /> },
    { id: "event", label: t(ui.bookingBar.tabEvent), icon: <PartyPopper className="size-4" aria-hidden /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-3xl bg-white shadow-luxe ring-1 ring-black/5"
    >
      <div role="tablist" aria-label="Booking" className="flex border-b border-stone">
        {tabs.map((item) => {
          const isActive = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`booking-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`booking-panel-${item.id}`}
              onClick={() => setTab(item.id)}
              className={cn(
                "relative flex flex-1 cursor-pointer items-center justify-center gap-2 px-3 py-4 text-xs font-bold tracking-wide transition sm:text-sm",
                isActive ? "text-crimson" : "text-charcoal/60 hover:text-charcoal",
              )}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
              {isActive ? (
                <motion.span
                  layoutId="booking-tab-indicator"
                  className={cn("absolute inset-x-0 bottom-0 h-[3px]", tab === "stay" ? "bg-crimson" : "bg-forest")}
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="p-4 sm:p-5">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "stay" ? (
            <motion.form
              key="stay"
              id="booking-panel-stay"
              role="tabpanel"
              aria-labelledby="booking-tab-stay"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.25 }}
              onSubmit={(event) => {
                event.preventDefault();
                openBooking({ roomType, checkIn, checkOut, adults });
              }}
              className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
            >
              <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">
                <BarField icon={<CalendarDays className="size-3.5" aria-hidden />} label={t(ui.bookingBar.checkIn)} htmlFor="bar-in">
                  <input id="bar-in" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={BAR_CONTROL} />
                </BarField>
                <BarField icon={<CalendarDays className="size-3.5" aria-hidden />} label={t(ui.bookingBar.checkOut)} htmlFor="bar-out">
                  <input
                    id="bar-out"
                    type="date"
                    min={checkIn || undefined}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className={BAR_CONTROL}
                  />
                </BarField>
                <BarField icon={<BedDouble className="size-3.5" aria-hidden />} label={t(ui.bookingBar.roomType)} htmlFor="bar-room">
                  <select id="bar-room" value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType)} className={BAR_CONTROL}>
                    {rooms.map((room) => (
                      <option key={room.id} value={room.type}>
                        {t(room.name)}
                      </option>
                    ))}
                  </select>
                </BarField>
                <BarField icon={<Users className="size-3.5" aria-hidden />} label={t(ui.bookingBar.guests)} htmlFor="bar-guests">
                  <select id="bar-guests" value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={BAR_CONTROL}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {interpolate(t(ui.bookingBar.adultsShort), { n })}
                      </option>
                    ))}
                  </select>
                </BarField>
              </div>
              <Button type="submit" size="lg" className="h-auto min-h-13 lg:px-8">
                <Search className="size-4" aria-hidden />
                {t(ui.bookingBar.checkAvailability)}
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="event"
              id="booking-panel-event"
              role="tabpanel"
              aria-labelledby="booking-tab-event"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
              onSubmit={(event) => {
                event.preventDefault();
                openEventRfp({ eventType, eventDate, guestRange });
              }}
              className="flex flex-col gap-3 lg:flex-row lg:items-stretch"
            >
              <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-3">
                <div className="col-span-2 lg:col-span-1">
                  <BarField icon={<PartyPopper className="size-3.5" aria-hidden />} label={t(ui.bookingBar.eventType)} htmlFor="bar-event">
                    <select id="bar-event" value={eventType} onChange={(e) => setEventType(e.target.value as EventType)} className={BAR_CONTROL}>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {t(ui.eventTypes[type])}
                        </option>
                      ))}
                    </select>
                  </BarField>
                </div>
                <BarField icon={<CalendarDays className="size-3.5" aria-hidden />} label={t(ui.bookingBar.eventDate)} htmlFor="bar-event-date">
                  <input id="bar-event-date" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={BAR_CONTROL} />
                </BarField>
                <BarField icon={<Users className="size-3.5" aria-hidden />} label={t(ui.bookingBar.guestCount)} htmlFor="bar-event-guests">
                  <select
                    id="bar-event-guests"
                    value={guestRange}
                    onChange={(e) => setGuestRange(e.target.value as GuestRange)}
                    className={BAR_CONTROL}
                  >
                    {GUEST_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {t(ui.guestRanges[range])}
                      </option>
                    ))}
                  </select>
                </BarField>
              </div>
              <Button type="submit" variant="secondary" size="lg" className="h-auto min-h-13 lg:px-8">
                <Send className="size-4" aria-hidden />
                {t(ui.bookingBar.getPackageQuote)}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
