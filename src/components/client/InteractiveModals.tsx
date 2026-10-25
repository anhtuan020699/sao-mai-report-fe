"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  CalendarDays,
  CircleCheck,
  Eye,
  LoaderCircle,
  Maximize2,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode,
} from "react";
import { AMENITY_ICONS } from "@/components/client/icons";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { ChoiceChip, Field, SelectInput, TextArea, TextInput } from "@/components/ui/form-fields";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { formatIsoDate, interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  submitBookingInquiry,
  submitEventInquiry,
  submitServiceReservation,
} from "@/services/inquiry-actions";
import type {
  ContactChannel,
  EventHall,
  EventServiceOption,
  EventType,
  GuestRange,
  InquiryResult,
  Locale,
  RoomCategory,
  RoomType,
  ServiceReservationKind,
  SiteSettings,
  StayPolicy,
  StaySpecialRequest,
  StayTimeRule,
} from "@/types/resort";

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface BookingPrefill {
  roomType?: RoomType;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  specialRequests?: StaySpecialRequest[];
}

export interface EventPrefill {
  eventType?: EventType;
  eventDate?: string;
  guestRange?: GuestRange;
  hallCode?: EventHall["code"];
}

export type ServiceModalMode = "DINING" | "SPORTS";

interface ModalApi {
  openRoomDetail: (roomId: string) => void;
  openBooking: (prefill?: BookingPrefill) => void;
  openEventRfp: (prefill?: EventPrefill) => void;
  openServiceReservation: (mode: ServiceModalMode, kind?: ServiceReservationKind) => void;
}

const ModalContext = createContext<ModalApi | null>(null);

export function useResortModals(): ModalApi {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useResortModals must be used inside <ResortModalsProvider>.");
  return context;
}

interface ModalSlot<T> {
  open: boolean;
  data: T;
  /** Bumped on every open so each form mounts fresh from its prefill. */
  nonce: number;
}

function openSlot<T>(slot: ModalSlot<T>, data: T): ModalSlot<T> {
  return { open: true, data, nonce: slot.nonce + 1 };
}

interface ProviderProps {
  rooms: RoomCategory[];
  halls: EventHall[];
  settings: SiteSettings;
  policy: StayPolicy;
  children: ReactNode;
}

export function ResortModalsProvider({ rooms, halls, settings, policy, children }: ProviderProps) {
  const [roomSlot, setRoomSlot] = useState<ModalSlot<string | null>>({ open: false, data: null, nonce: 0 });
  const [bookingSlot, setBookingSlot] = useState<ModalSlot<BookingPrefill>>({ open: false, data: {}, nonce: 0 });
  const [eventSlot, setEventSlot] = useState<ModalSlot<EventPrefill>>({ open: false, data: {}, nonce: 0 });
  const [serviceSlot, setServiceSlot] = useState<
    ModalSlot<{ mode: ServiceModalMode; kind?: ServiceReservationKind }>
  >({
    open: false,
    data: { mode: "DINING" },
    nonce: 0,
  });

  const api = useMemo<ModalApi>(
    () => ({
      openRoomDetail: (roomId) => setRoomSlot((slot) => openSlot(slot, roomId)),
      openBooking: (prefill = {}) => {
        setRoomSlot((slot) => ({ ...slot, open: false }));
        setBookingSlot((slot) => openSlot(slot, prefill));
      },
      openEventRfp: (prefill = {}) => setEventSlot((slot) => openSlot(slot, prefill)),
      openServiceReservation: (mode, kind) => setServiceSlot((slot) => openSlot(slot, { mode, kind })),
    }),
    [],
  );

  const detailRoom = rooms.find((room) => room.id === roomSlot.data) ?? null;

  return (
    <ModalContext.Provider value={api}>
      {children}

      <RoomDetailModal
        key={`room-${roomSlot.nonce}`}
        room={detailRoom}
        policy={policy}
        open={roomSlot.open && detailRoom !== null}
        onOpenChange={(open) => setRoomSlot((slot) => ({ ...slot, open }))}
        onBook={(roomType) => api.openBooking({ roomType })}
      />

      <BookingModal
        key={`booking-${bookingSlot.nonce}`}
        rooms={rooms}
        settings={settings}
        policy={policy}
        prefill={bookingSlot.data}
        open={bookingSlot.open}
        onOpenChange={(open) => setBookingSlot((slot) => ({ ...slot, open }))}
      />

      <EventRfpModal
        key={`event-${eventSlot.nonce}`}
        halls={halls}
        settings={settings}
        prefill={eventSlot.data}
        open={eventSlot.open}
        onOpenChange={(open) => setEventSlot((slot) => ({ ...slot, open }))}
      />

      <ServiceReservationModal
        key={`service-${serviceSlot.nonce}`}
        mode={serviceSlot.data.mode}
        initialKind={serviceSlot.data.kind}
        settings={settings}
        open={serviceSlot.open}
        onOpenChange={(open) => setServiceSlot((slot) => ({ ...slot, open }))}
      />
    </ModalContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const DEFAULT_CHANNEL: Record<Locale, ContactChannel> = {
  vi: "ZALO",
  en: "WHATSAPP",
  ko: "KAKAOTALK",
  zh: "WECHAT",
};

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.max(0, Math.round((end - start) / 86_400_000));
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item];
}

type Errors = Partial<Record<string, string>>;

function useInquirySubmit() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [failed, setFailed] = useState(false);

  const submit = useCallback((action: () => Promise<InquiryResult>) => {
    setFailed(false);
    startTransition(async () => {
      try {
        setResult(await action());
      } catch {
        setFailed(true);
      }
    });
  }, []);

  return { isPending, result, failed, submit };
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-forest uppercase">
      <span className="h-px w-5 bg-crimson" aria-hidden />
      {children}
    </h3>
  );
}

function SuccessState({
  message,
  referenceCode,
  settings,
  onDone,
}: {
  message: string;
  referenceCode: string;
  settings: SiteSettings;
  onDone: () => void;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center px-6 py-12 text-center sm:px-12"
    >
      <span className="grid size-16 place-items-center rounded-full bg-forest text-white shadow-luxe">
        <CircleCheck className="size-8" aria-hidden />
      </span>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-charcoal">{t(ui.modals.successTitle)}</h3>
      <p className="mt-3 max-w-md text-charcoal/70">{message}</p>
      <div className="mt-6 rounded-2xl border border-dashed border-forest/40 bg-sand px-6 py-4">
        <p className="text-[11px] font-bold tracking-[0.2em] text-charcoal/60 uppercase">
          {t(ui.modals.reference)}
        </p>
        <p className="mt-1 font-mono text-lg font-bold tracking-wider text-crimson">{referenceCode}</p>
      </div>
      <p className="mt-6 text-sm text-charcoal/60">
        {t(ui.modals.urgent)}{" "}
        <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} className="font-semibold text-crimson">
          {settings.hotline}
        </a>
      </p>
      <Button variant="secondary" className="mt-8" onClick={onDone}>
        {t(ui.modals.done)}
      </Button>
    </motion.div>
  );
}

function FormFooter({
  isPending,
  failed,
  label,
  tone = "primary",
}: {
  isPending: boolean;
  failed: boolean;
  label: string;
  tone?: "primary" | "secondary";
}) {
  const { t } = useLanguage();
  return (
    <div className="sticky bottom-0 -mx-5 mt-8 border-t border-stone bg-alabaster/95 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
      {failed ? <p className="mb-3 text-sm font-medium text-crimson">{t(ui.form.serverError)}</p> : null}
      <Button type="submit" variant={tone} size="lg" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            {t(ui.form.submitting)}
          </>
        ) : (
          label
        )}
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Room detail                                                      */
/* ------------------------------------------------------------------ */

interface RoomDetailModalProps {
  room: RoomCategory | null;
  policy: StayPolicy;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBook: (roomType: RoomType) => void;
}

function timeRuleWindow(rule: StayTimeRule, afterTemplate: string): string {
  return rule.to ? `${rule.from} – ${rule.to}` : interpolate(afterTemplate, { t: rule.from });
}

function StayPolicyDetails({ policy }: { policy: StayPolicy }) {
  const { t, tl, formatPrice } = useLanguage();
  const groups = [
    { kind: "EARLY_CHECKIN" as const, title: ui.modals.earlyCheckIn },
    { kind: "LATE_CHECKOUT" as const, title: ui.modals.lateCheckOut },
  ];

  return (
    <div className="mt-8 border-t border-stone pt-8">
      <SectionLabel>{t(ui.modals.policyTitle)}</SectionLabel>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: ui.modals.checkInTime, value: policy.checkInTime },
          { label: ui.modals.checkOutTime, value: policy.checkOutTime },
        ].map((item) => (
          <div key={item.value} className="rounded-xl bg-white px-4 py-3 shadow-sm">
            <p className="text-[11px] font-semibold tracking-wide text-charcoal/55 uppercase">{t(item.label)}</p>
            <p className="mt-0.5 text-lg font-bold text-forest">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.kind}>
            <p className="mb-2 text-sm font-semibold text-charcoal">{t(group.title)}</p>
            <ul className="divide-y divide-stone rounded-xl bg-white text-sm shadow-sm">
              {policy.timeRules
                .filter((rule) => rule.kind === group.kind)
                .map((rule) => (
                  <li key={rule.id} className="flex items-start justify-between gap-3 px-4 py-2.5">
                    <span className="font-medium whitespace-nowrap text-charcoal/80">{timeRuleWindow(rule, t(ui.modals.afterTime))}</span>
                    <span
                      className={cn(
                        "text-right",
                        rule.surchargePercent === 0 ? "text-forest" : "font-semibold text-crimson",
                      )}
                    >
                      {rule.surchargePercent === 0
                        ? t(ui.modals.freeSubject)
                        : interpolate(t(ui.modals.percentOfRate), { n: rule.surchargePercent })}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-semibold text-charcoal">{t(ui.modals.surchargeTitle)}</p>
          <ul className="divide-y divide-stone rounded-xl bg-white text-sm shadow-sm">
            {policy.surcharges.map((item) => (
              <li key={item.id} className="px-4 py-2.5">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-medium text-charcoal/85">{t(item.label)}</span>
                  {item.priceVnd !== null ? (
                    <span
                      className={cn(
                        "shrink-0 text-right font-semibold whitespace-nowrap",
                        item.priceVnd === 0 ? "text-forest" : "text-crimson",
                      )}
                    >
                      {item.priceVnd === 0 ? t(ui.modals.free) : formatPrice(item.priceVnd)}
                      {item.unit ? (
                        <span className="font-normal text-charcoal/55">{t(item.unit)}</span>
                      ) : null}
                    </span>
                  ) : null}
                </div>
                {item.note ? <p className="mt-0.5 text-xs text-charcoal/55">{t(item.note)}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-charcoal">{t(ui.modals.includedTitle)}</p>
          <ul className="space-y-2.5 rounded-xl bg-white p-4 text-sm shadow-sm">
            {tl(policy.inclusions).map((item) => (
              <li key={item} className="flex items-start gap-2 text-charcoal/85">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-forest" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RoomDetailModal({ room, policy, open, onOpenChange, onBook }: RoomDetailModalProps) {
  const { t, tl, locale, formatPrice } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  if (!room) return null;
  const image = room.gallery[activeImage] ?? room.coverImage;

  const specs = [
    { icon: Maximize2, label: t(ui.modals.size), value: interpolate(t(ui.rooms.sqm), { n: room.sizeSqm }) },
    { icon: Eye, label: t(ui.modals.view), value: t(ui.views[room.viewType]) },
    { icon: BedDouble, label: t(ui.modals.bed), value: t(room.bedType) },
    {
      icon: Users,
      label: t(ui.modals.occupancy),
      value: interpolate(t(ui.modals.guestsCount), { n: room.standardGuests }),
    },
  ];

  const rates = [
    { label: t(ui.modals.rateNightly), price: room.basePriceVnd, highlight: true },
    {
      label: interpolate(t(ui.modals.rateHourly), { n: policy.hourlyBlockHours }),
      price: room.hourlyPriceVnd,
      highlight: false,
    },
    { label: t(ui.modals.rateMonthly), price: room.monthlyPriceVnd, highlight: false },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={t(room.name)}
      eyebrow={room.badgeText ? t(room.badgeText) : t(ui.rooms.overline)}
      description={t(room.tagline)}
      closeLabel={t(ui.modals.close)}
      className="sm:max-w-4xl"
    >
      <div className="p-5 sm:p-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
          <AnimatePresence mode="wait">
            <motion.div
              key={image.url}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={image.url}
                alt={t(image.alt)}
                fill
                sizes="(min-width: 896px) 832px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-3 left-3 rounded-full bg-charcoal/75 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {t(ui.modals.gallery)} · {activeImage + 1}/{room.gallery.length}
          </span>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {room.gallery.map((item, index) => (
            <button
              key={item.url}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={t(item.alt)}
              aria-current={index === activeImage}
              className={cn(
                "relative h-16 w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg ring-2 transition sm:h-20 sm:w-28",
                index === activeImage ? "ring-crimson" : "opacity-70 ring-transparent hover:opacity-100",
              )}
            >
              <Image src={item.url} alt="" fill sizes="112px" className="object-cover" />
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="leading-relaxed text-charcoal/80">{t(room.description)}</p>

            <div className="mt-8">
              <SectionLabel>{t(ui.modals.highlights)}</SectionLabel>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {tl(room.features).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-charcoal/85">
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <SectionLabel>{t(ui.modals.amenitiesTitle)}</SectionLabel>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {room.amenities.map((key) => {
                  const Icon = AMENITY_ICONS[key];
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-xs font-medium text-charcoal/85 shadow-sm"
                    >
                      <Icon className="size-4 shrink-0 text-forest" aria-hidden />
                      {t(ui.amenities[key])}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-2xl bg-white p-5 shadow-card lg:sticky lg:top-4">
            <dl className="grid grid-cols-2 gap-4">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-charcoal/55 uppercase">
                    <Icon className="size-3.5" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-stone pt-5">
              <p className="text-[11px] font-bold tracking-[0.2em] text-forest uppercase">{t(ui.modals.ratesTitle)}</p>
              <dl className="mt-3 space-y-2.5">
                {rates.map((rate) => (
                  <div key={rate.label} className="flex items-baseline justify-between gap-3">
                    <dt className="text-sm text-charcoal/65">{rate.label}</dt>
                    <dd
                      className={cn(
                        "font-semibold whitespace-nowrap",
                        rate.highlight ? "font-serif text-2xl text-crimson" : "text-charcoal",
                      )}
                    >
                      {formatPrice(rate.price)}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-charcoal/55">{t(ui.rooms.priceNote)}</p>
              <p className="mt-1 text-xs text-charcoal/45">
                {interpolate(t(ui.modals.effectiveFrom), { d: formatIsoDate(policy.effectiveFrom, locale) })}
              </p>
            </div>
            <Button size="lg" className="mt-5 w-full" onClick={() => onBook(room.type)}>
              <CalendarDays className="size-4" aria-hidden />
              {t(ui.modals.bookThisRoom)}
            </Button>
          </aside>
        </div>

        <StayPolicyDetails policy={policy} />
      </div>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Booking / room inquiry                                           */
/* ------------------------------------------------------------------ */

const SPECIAL_REQUESTS: StaySpecialRequest[] = [
  "AIRPORT_TRANSFER",
  "LONG_STAY_EXPERT",
  "VAT_INVOICE",
  "EARLY_CHECKIN",
  "EXTRA_BED",
];

const CONTACT_CHANNELS: ContactChannel[] = ["PHONE", "ZALO", "KAKAOTALK", "WECHAT", "WHATSAPP"];

interface BookingModalProps {
  rooms: RoomCategory[];
  settings: SiteSettings;
  policy: StayPolicy;
  prefill: BookingPrefill;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BookingModal({ rooms, settings, policy, prefill, open, onOpenChange }: BookingModalProps) {
  const { t, locale, formatPrice } = useLanguage();
  const { isPending, result, failed, submit } = useInquirySubmit();

  const [roomType, setRoomType] = useState<RoomType>(prefill.roomType ?? rooms[0]?.type ?? "DELUXE");
  const [checkIn, setCheckIn] = useState(prefill.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(prefill.checkOut ?? "");
  const [adults, setAdults] = useState(prefill.adults ?? 2);
  const [children, setChildren] = useState(prefill.children ?? 0);
  const [fullName, setFullName] = useState("");
  const [contactChannel, setContactChannel] = useState<ContactChannel>(DEFAULT_CHANNEL[locale]);
  const [contactValue, setContactValue] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [specialRequests, setSpecialRequests] = useState<StaySpecialRequest[]>(prefill.specialRequests ?? []);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const room = rooms.find((item) => item.type === roomType);
  const nights = nightsBetween(checkIn, checkOut);
  const estimate = room && nights > 0 ? room.basePriceVnd * nights : null;

  const serverErrorField = result && !result.ok ? result.errorField : null;
  const fieldError = (name: string, message: string) =>
    errors[name] ?? (serverErrorField === name ? message : undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    const required = t(ui.form.required);
    if (!checkIn) next.checkIn = required;
    if (!checkOut) next.checkOut = required;
    else if (checkIn && checkOut <= checkIn) next.checkOut = t(ui.form.invalidDates);
    if (!fullName.trim()) next.fullName = required;
    if (!contactValue.trim()) next.contactValue = required;
    if (!EMAIL_PATTERN.test(email)) next.email = t(ui.form.invalidEmail);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    submit(() =>
      submitBookingInquiry({
        roomType,
        checkIn,
        checkOut,
        adults,
        children,
        fullName,
        contactChannel,
        contactValue,
        email,
        companyName,
        specialRequests,
        note,
        locale,
      }),
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={settings.name}
      title={t(ui.modals.bookingTitle)}
      description={t(ui.modals.bookingSubtitle)}
      closeLabel={t(ui.modals.close)}
    >
      {result?.ok ? (
        <SuccessState
          message={interpolate(t(ui.modals.successBooking), { name: fullName })}
          referenceCode={result.referenceCode}
          settings={settings}
          onDone={() => onOpenChange(false)}
        />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="px-5 pt-6 sm:px-8">
          <SectionLabel>{t(ui.modals.stayDetails)}</SectionLabel>

          {room ? (
            <div className="mb-5 flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm">
              <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={room.coverImage.url} alt={t(room.coverImage.alt)} fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-serif text-lg font-semibold text-charcoal">{t(room.name)}</p>
                <p className="text-sm text-charcoal/60">
                  {t(ui.rooms.from)}{" "}
                  <span className="font-semibold text-crimson">{formatPrice(room.basePriceVnd)}</span>
                  {t(ui.rooms.perNight)}
                </p>
                <p className="mt-0.5 text-xs text-charcoal/55">
                  {t(ui.modals.checkInTime)} {policy.checkInTime} · {t(ui.modals.checkOutTime)} {policy.checkOutTime}
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t(ui.bookingBar.roomType)} htmlFor="bk-room" className="sm:col-span-2">
              <SelectInput id="bk-room" value={roomType} onChange={(e) => setRoomType(e.target.value as RoomType)}>
                {rooms.map((item) => (
                  <option key={item.id} value={item.type}>
                    {t(item.name)}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label={t(ui.bookingBar.checkIn)} htmlFor="bk-in" error={fieldError("checkIn", t(ui.form.required))}>
              <TextInput
                id="bk-in"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                aria-invalid={Boolean(errors.checkIn)}
              />
            </Field>
            <Field
              label={t(ui.bookingBar.checkOut)}
              htmlFor="bk-out"
              error={fieldError("checkOut", t(ui.form.invalidDates))}
            >
              <TextInput
                id="bk-out"
                type="date"
                min={checkIn || undefined}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                aria-invalid={Boolean(errors.checkOut)}
              />
            </Field>
            <Field label={t(ui.modals.adults)} htmlFor="bk-adults">
              <SelectInput id="bk-adults" value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label={t(ui.modals.children)} htmlFor="bk-children">
              <SelectInput id="bk-children" value={children} onChange={(e) => setChildren(Number(e.target.value))}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>

          {estimate ? (
            <div className="mt-4 flex items-center justify-between rounded-xl bg-forest px-4 py-3 text-white">
              <span className="text-sm text-white/80">
                {t(ui.modals.estimate)} · {interpolate(t(ui.modals.nights), { n: nights })}
              </span>
              <span className="font-serif text-xl font-semibold">{formatPrice(estimate)}</span>
            </div>
          ) : null}

          <div className="mt-8">
            <SectionLabel>{t(ui.modals.contactDetails)}</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t(ui.form.fullName)} htmlFor="bk-name" error={fieldError("fullName", t(ui.form.required))}>
                <TextInput
                  id="bk-name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
              </Field>
              <Field label={t(ui.form.email)} htmlFor="bk-email" error={fieldError("email", t(ui.form.invalidEmail))}>
                <TextInput
                  id="bk-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <Field label={t(ui.form.contactVia)} htmlFor="bk-channel">
                <SelectInput
                  id="bk-channel"
                  value={contactChannel}
                  onChange={(e) => setContactChannel(e.target.value as ContactChannel)}
                >
                  {CONTACT_CHANNELS.map((channel) => (
                    <option key={channel} value={channel}>
                      {t(ui.contactChannels[channel])}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field
                label={`${t(ui.contactChannels[contactChannel])} – ${t(ui.form.contactValue)}`}
                htmlFor="bk-contact"
                error={fieldError("contactValue", t(ui.form.required))}
              >
                <TextInput
                  id="bk-contact"
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  aria-invalid={Boolean(errors.contactValue)}
                />
              </Field>
              <Field
                label={`${t(ui.form.company)} ${t(ui.form.optional)}`}
                htmlFor="bk-company"
                hint={t(ui.form.companyHint)}
                className="sm:col-span-2"
              >
                <TextInput
                  id="bk-company"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div className="mt-8">
            <SectionLabel>{t(ui.modals.specialRequests)}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {SPECIAL_REQUESTS.map((request) => (
                <ChoiceChip
                  key={request}
                  checked={specialRequests.includes(request)}
                  onToggle={() => setSpecialRequests((list) => toggleItem(list, request))}
                >
                  {t(ui.specialRequests[request])}
                </ChoiceChip>
              ))}
            </div>
            <Field label={t(ui.form.note)} htmlFor="bk-note" className="mt-4">
              <TextArea id="bk-note" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>

          <FormFooter isPending={isPending} failed={failed} label={t(ui.modals.sendBooking)} />
        </form>
      )}
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Event / wedding RFP                                              */
/* ------------------------------------------------------------------ */

const EVENT_TYPES: EventType[] = [
  "WEDDING",
  "CUSTOMER_CONFERENCE",
  "GALA_DINNER",
  "TEAM_BUILDING",
  "YEAR_END_PARTY",
];
const GUEST_RANGES: GuestRange[] = ["100_300", "300_500", "500_800", "800_1200", "1200_PLUS"];
const EVENT_SERVICES: EventServiceOption[] = [
  "LED_SCREEN",
  "SOUND_LIGHT",
  "TEA_BREAK",
  "CORPORATE_LUNCH",
  "GROUP_STAY",
  "DECORATION",
  "TEAM_BUILDING_MC",
];

interface EventRfpModalProps {
  halls: EventHall[];
  settings: SiteSettings;
  prefill: EventPrefill;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function EventRfpModal({ halls, settings, prefill, open, onOpenChange }: EventRfpModalProps) {
  const { t, locale } = useLanguage();
  const { isPending, result, failed, submit } = useInquirySubmit();

  const [eventType, setEventType] = useState<EventType>(prefill.eventType ?? "WEDDING");
  const [hallCode, setHallCode] = useState<EventHall["code"] | "UNDECIDED">(prefill.hallCode ?? "UNDECIDED");
  const [eventDate, setEventDate] = useState(prefill.eventDate ?? "");
  const [guestRange, setGuestRange] = useState<GuestRange>(prefill.guestRange ?? "300_500");
  const [tables, setTables] = useState("");
  const [services, setServices] = useState<EventServiceOption[]>(
    prefill.eventType && prefill.eventType !== "WEDDING" ? ["LED_SCREEN", "TEA_BREAK"] : ["DECORATION"],
  );
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const serverErrorField = result && !result.ok ? result.errorField : null;
  const fieldError = (name: string, message: string) =>
    errors[name] ?? (serverErrorField === name ? message : undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    const required = t(ui.form.required);
    if (!eventDate) next.eventDate = required;
    if (!fullName.trim()) next.fullName = required;
    if (!phone.trim()) next.phone = required;
    if (!EMAIL_PATTERN.test(email)) next.email = t(ui.form.invalidEmail);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const tableCount = Number.parseInt(tables, 10);
    submit(() =>
      submitEventInquiry({
        eventType,
        hallCode,
        eventDate,
        guestRange,
        tables: Number.isFinite(tableCount) && tableCount > 0 ? tableCount : null,
        services,
        fullName,
        companyName,
        phone,
        email,
        note,
        locale,
      }),
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Sao Mai Center 1 & 2"
      title={t(ui.modals.eventTitle)}
      description={t(ui.modals.eventSubtitle)}
      closeLabel={t(ui.modals.close)}
    >
      {result?.ok ? (
        <SuccessState
          message={interpolate(t(ui.modals.successEvent), { name: fullName })}
          referenceCode={result.referenceCode}
          settings={settings}
          onDone={() => onOpenChange(false)}
        />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="px-5 pt-6 sm:px-8">
          <SectionLabel>{t(ui.modals.eventDetails)}</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t(ui.bookingBar.eventType)} htmlFor="ev-type">
              <SelectInput id="ev-type" value={eventType} onChange={(e) => setEventType(e.target.value as EventType)}>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {t(ui.eventTypes[type])}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label={t(ui.modals.preferredHall)} htmlFor="ev-hall">
              <SelectInput
                id="ev-hall"
                value={hallCode}
                onChange={(e) => setHallCode(e.target.value as EventHall["code"] | "UNDECIDED")}
              >
                <option value="UNDECIDED">{t(ui.modals.undecided)}</option>
                {halls.map((hall) => (
                  <option key={hall.id} value={hall.code}>
                    {t(hall.name)} · {hall.capacity.banquet} {t(ui.mice.guestsUnit)}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label={t(ui.bookingBar.eventDate)} htmlFor="ev-date" error={fieldError("eventDate", t(ui.form.required))}>
              <TextInput
                id="ev-date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                aria-invalid={Boolean(errors.eventDate)}
              />
            </Field>
            <Field label={t(ui.bookingBar.guestCount)} htmlFor="ev-guests">
              <SelectInput id="ev-guests" value={guestRange} onChange={(e) => setGuestRange(e.target.value as GuestRange)}>
                {GUEST_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {t(ui.guestRanges[range])}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label={`${t(ui.modals.tables)} ${t(ui.form.optional)}`} htmlFor="ev-tables" className="sm:col-span-2">
              <TextInput
                id="ev-tables"
                type="number"
                inputMode="numeric"
                min={1}
                max={150}
                value={tables}
                onChange={(e) => setTables(e.target.value)}
              />
            </Field>
          </div>

          <div className="mt-8">
            <SectionLabel>{t(ui.modals.servicesNeeded)}</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {EVENT_SERVICES.map((service) => (
                <ChoiceChip
                  key={service}
                  checked={services.includes(service)}
                  onToggle={() => setServices((list) => toggleItem(list, service))}
                >
                  {t(ui.eventServices[service])}
                </ChoiceChip>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <SectionLabel>{t(ui.modals.contactDetails)}</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t(ui.form.fullName)} htmlFor="ev-name" error={fieldError("fullName", t(ui.form.required))}>
                <TextInput
                  id="ev-name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                />
              </Field>
              <Field label={`${t(ui.form.company)} ${t(ui.form.optional)}`} htmlFor="ev-company">
                <TextInput
                  id="ev-company"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Field>
              <Field label={t(ui.form.phone)} htmlFor="ev-phone" error={fieldError("phone", t(ui.form.required))}>
                <TextInput
                  id="ev-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                />
              </Field>
              <Field label={t(ui.form.email)} htmlFor="ev-email" error={fieldError("email", t(ui.form.invalidEmail))}>
                <TextInput
                  id="ev-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
            </div>
            <Field label={t(ui.form.note)} htmlFor="ev-note" className="mt-4">
              <TextArea id="ev-note" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>

          <FormFooter isPending={isPending} failed={failed} label={t(ui.modals.sendEvent)} tone="secondary" />
        </form>
      )}
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Table / VIP room / court reservation                             */
/* ------------------------------------------------------------------ */

const SERVICE_KINDS: Record<ServiceModalMode, ServiceReservationKind[]> = {
  DINING: ["VIP_ROOM", "RESTAURANT_TABLE"],
  SPORTS: ["PICKLEBALL", "TENNIS", "GOLF"],
};

interface ServiceReservationModalProps {
  mode: ServiceModalMode;
  initialKind: ServiceReservationKind | undefined;
  settings: SiteSettings;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ServiceReservationModal({ mode, initialKind, settings, open, onOpenChange }: ServiceReservationModalProps) {
  const { t, locale } = useLanguage();
  const { isPending, result, failed, submit } = useInquirySubmit();

  const kinds = SERVICE_KINDS[mode];
  const [kind, setKind] = useState<ServiceReservationKind>(
    initialKind && kinds.includes(initialKind) ? initialKind : kinds[0],
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState(mode === "SPORTS" ? "06:00" : "18:30");
  const [people, setPeople] = useState(mode === "SPORTS" ? 4 : 8);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    const required = t(ui.form.required);
    if (!date) next.date = required;
    if (!time) next.time = required;
    if (!fullName.trim()) next.fullName = required;
    if (!phone.trim()) next.phone = required;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    submit(() => submitServiceReservation({ kind, date, time, people, fullName, phone, note, locale }));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={settings.name}
      title={t(mode === "DINING" ? ui.modals.serviceTitleDining : ui.modals.serviceTitleSports)}
      description={t(ui.modals.serviceSubtitle)}
      closeLabel={t(ui.modals.close)}
      className="sm:max-w-xl"
    >
      {result?.ok ? (
        <SuccessState
          message={interpolate(t(ui.modals.successService), { name: fullName })}
          referenceCode={result.referenceCode}
          settings={settings}
          onDone={() => onOpenChange(false)}
        />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="px-5 pt-6 sm:px-8">
          <Field label={t(ui.modals.serviceKind)} htmlFor="sv-kind">
            <div id="sv-kind" role="radiogroup" className="grid grid-cols-2 gap-2">
              {kinds.map((item) => (
                <button
                  key={item}
                  type="button"
                  role="radio"
                  aria-checked={kind === item}
                  onClick={() => setKind(item)}
                  className={cn(
                    "cursor-pointer rounded-xl border px-3 py-3 text-sm font-semibold transition",
                    kind === item
                      ? "border-crimson bg-crimson-soft text-crimson"
                      : "border-stone bg-white text-charcoal/75 hover:border-forest/40",
                  )}
                >
                  {t(ui.serviceKinds[item])}
                </button>
              ))}
            </div>
          </Field>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Field label={t(ui.modals.date)} htmlFor="sv-date" error={errors.date} className="col-span-2 sm:col-span-1">
              <TextInput
                id="sv-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                aria-invalid={Boolean(errors.date)}
              />
            </Field>
            <Field label={t(ui.modals.time)} htmlFor="sv-time" error={errors.time}>
              <TextInput id="sv-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </Field>
            <Field label={t(ui.modals.people)} htmlFor="sv-people">
              <TextInput
                id="sv-people"
                type="number"
                inputMode="numeric"
                min={1}
                max={30}
                value={people}
                onChange={(e) => setPeople(Math.max(1, Number(e.target.value) || 1))}
              />
            </Field>
            <Field label={t(ui.form.fullName)} htmlFor="sv-name" error={errors.fullName} className="col-span-2 sm:col-span-3">
              <TextInput
                id="sv-name"
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
              />
            </Field>
            <Field label={t(ui.form.phone)} htmlFor="sv-phone" error={errors.phone} className="col-span-2 sm:col-span-3">
              <TextInput
                id="sv-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-invalid={Boolean(errors.phone)}
              />
            </Field>
            <Field label={t(ui.form.note)} htmlFor="sv-note" className="col-span-2 sm:col-span-3">
              <TextArea id="sv-note" value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-charcoal/55">
            <Phone className="size-3.5" aria-hidden />
            {t(ui.modals.urgent)} {settings.hotline}
          </p>
          <FormFooter isPending={isPending} failed={failed} label={t(ui.modals.sendService)} />
        </form>
      )}
    </Dialog>
  );
}
