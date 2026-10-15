"use client";

import {
  ArrowRight,
  Building,
  CircleCheck,
  Factory,
  Landmark as LandmarkIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Route,
  Send,
  Ship,
  TreePalm,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";
import { ROUTES, SECTION_IDS } from "@/components/client/nav-items";
import { NewsCard } from "@/components/client/pages/NewsViews";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/form-fields";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { submitContactMessage } from "@/services/inquiry-actions";
import type { Landmark, LandmarkKind, PromotionPost, SiteSettings } from "@/types/resort";

/* ------------------------------------------------------------------ */
/* Offers & news                                                       */
/* ------------------------------------------------------------------ */

export function PromotionsSection({ posts }: { posts: PromotionPost[] }) {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.offers} aria-labelledby="offers-title" className="bg-sand py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t(ui.offers.overline)}
          title={t(ui.offers.title)}
          subtitle={t(ui.offers.subtitle)}
          titleId="offers-title"
          action={
            <Link href={ROUTES.news} className={buttonVariants({ variant: "outline" })}>
              {t(ui.newsPage.viewAll)}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.id} delay={index * 0.1} className="h-full">
              <NewsCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Connectivity, map & quick contact                                   */
/* ------------------------------------------------------------------ */

const LANDMARK_ICONS: Record<LandmarkKind, LucideIcon> = {
  INDUSTRIAL: Factory,
  PORT: Ship,
  PAGODA: LandmarkIcon,
  BEACH: TreePalm,
  CITY: Building,
  HIGHWAY: Route,
};

export function LocationSection({ landmarks, settings }: { landmarks: Landmark[]; settings: SiteSettings }) {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.contact} aria-labelledby="location-title" className="bg-alabaster py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t(ui.location.overline)}
          title={t(ui.location.title)}
          subtitle={t(ui.location.subtitle)}
          titleId="location-title"
          action={
            <span className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white">
              <Route className="size-4 text-cream" aria-hidden />
              {t(ui.location.highway)}
            </span>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {landmarks.map((landmark, index) => {
            const Icon = LANDMARK_ICONS[landmark.kind];
            const isNear = landmark.unit === "MIN";
            return (
              <motion.li
                key={landmark.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={cn(
                  "flex h-full flex-col rounded-2xl p-4 ring-1 transition-shadow hover:shadow-card",
                  isNear ? "bg-white ring-stone" : "bg-sand ring-transparent",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-xl",
                    isNear ? "bg-crimson text-white" : "bg-forest text-white",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="mt-4 font-serif text-2xl font-semibold text-charcoal">
                  {interpolate(t(isNear ? ui.location.minutes : ui.location.km), { n: landmark.value })}
                </span>
                <span className="mt-1 text-xs leading-snug font-medium text-charcoal/65">{t(landmark.name)}</span>
              </motion.li>
            );
          })}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="relative min-h-[380px] overflow-hidden rounded-3xl bg-sand shadow-card ring-1 ring-black/5 lg:min-h-full">
            <iframe
              title={t(ui.location.mapTitle)}
              src={settings.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[30%]"
              allowFullScreen
            />
            <div className="absolute right-4 bottom-4 left-4 flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-sm text-charcoal/80">
                <MapPin className="mt-0.5 size-4 shrink-0 text-crimson" aria-hidden />
                {t(settings.address)}
              </p>
              <a
                href={settings.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "secondary", size: "sm", className: "shrink-0" })}
              >
                <Navigation className="size-3.5" aria-hidden />
                {t(ui.cta.getDirections)}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <QuickContactForm settings={settings} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function QuickContactForm({ settings }: { settings: SiteSettings }) {
  const { t, locale } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [referenceCode, setReferenceCode] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = t(ui.form.required);
    if (!phone.trim()) next.phone = t(ui.form.required);
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t(ui.form.invalidEmail);
    if (!message.trim()) next.message = t(ui.form.required);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setFailed(false);
    startTransition(async () => {
      try {
        const result = await submitContactMessage({ fullName, phone, email, message, locale });
        if (result.ok) setReferenceCode(result.referenceCode);
        else setErrors({ [result.errorField]: t(ui.form.required) });
      } catch {
        setFailed(true);
      }
    });
  }

  return (
    <div className="h-full rounded-3xl bg-forest p-6 text-white shadow-luxe sm:p-8">
      <h3 className="font-serif text-2xl font-semibold">{t(ui.location.formTitle)}</h3>
      <p className="mt-1 text-sm text-white/70">{t(ui.location.formSubtitle)}</p>

      <div className="mt-5 grid gap-2 text-sm">
        <a href={`tel:${settings.hotline.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 font-semibold hover:text-cream">
          <Phone className="size-4 text-cream" aria-hidden />
          {settings.hotline}
        </a>
        <a href={`mailto:${settings.emails.sales}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white">
          <Mail className="size-4 text-cream" aria-hidden />
          {settings.emails.sales}
        </a>
      </div>

      {referenceCode ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center ring-1 ring-white/15">
          <CircleCheck className="size-10 text-cream" aria-hidden />
          <p className="mt-3 font-serif text-xl font-semibold">{t(ui.location.sentTitle)}</p>
          <p className="mt-2 text-sm text-white/75">{t(ui.location.sentBody)}</p>
          <p className="mt-4 font-mono text-sm font-bold tracking-wider text-cream">
            {t(ui.modals.reference)}: {referenceCode}
          </p>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-4 [&_label]:text-white/80 [&_[id$=-error]]:text-cream">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t(ui.form.fullName)} htmlFor="ct-name" error={errors.fullName}>
              <TextInput id="ct-name" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} aria-invalid={Boolean(errors.fullName)} />
            </Field>
            <Field label={t(ui.form.phone)} htmlFor="ct-phone" error={errors.phone}>
              <TextInput id="ct-phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={Boolean(errors.phone)} />
            </Field>
          </div>
          <Field label={`${t(ui.form.email)} ${t(ui.form.optional)}`} htmlFor="ct-email" error={errors.email}>
            <TextInput id="ct-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} />
          </Field>
          <Field label={t(ui.location.message)} htmlFor="ct-message" error={errors.message}>
            <TextArea
              id="ct-message"
              value={message}
              placeholder={t(ui.location.messagePlaceholder)}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={Boolean(errors.message)}
            />
          </Field>
          {failed ? <p className="text-sm font-medium text-cream">{t(ui.form.serverError)}</p> : null}
          <Button type="submit" size="lg" disabled={isPending} className="w-full">
            {isPending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
            {isPending ? t(ui.form.submitting) : t(ui.location.send)}
          </Button>
        </form>
      )}
    </div>
  );
}
