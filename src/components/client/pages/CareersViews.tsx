"use client";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarClock,
  CircleCheck,
  LoaderCircle,
  MapPin,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition, type FormEvent, type ReactNode } from "react";
import { ROUTES } from "@/components/client/nav-items";
import { PageHero } from "@/components/client/pages/PageHero";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/form-fields";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { formatIsoDate, interpolate } from "@/lib/i18n";
import { submitJobApplication } from "@/services/inquiry-actions";
import type { InquiryResult, JobPosting, ResortImage, SiteSettings } from "@/types/resort";

function jobHref(job: JobPosting): string {
  return `${ROUTES.careers}/${job.slug}`;
}

function Meta({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-4 shrink-0 text-forest" aria-hidden />
      {children}
    </span>
  );
}

export function CareersListView({ jobs, heroImage }: { jobs: JobPosting[]; heroImage: ResortImage }) {
  const { t, tl, locale } = useLanguage();

  return (
    <>
      <PageHero
        title={t(ui.careers.title)}
        subtitle={t(ui.careers.subtitle)}
        crumbs={[{ label: t(ui.nav.careers) }]}
        image={heroImage}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {tl(ui.careers.why).map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/20 backdrop-blur"
            >
              <CircleCheck className="size-4 text-cream" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="bg-sand py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-charcoal/60">{interpolate(t(ui.careers.openings), { n: jobs.length })}</p>
          <ul className="mt-6 space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.05}>
                <li className="group relative rounded-3xl bg-white p-6 shadow-card ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-luxe sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-bold tracking-[0.2em] text-crimson uppercase">{t(job.department)}</p>
                      <h2 className="mt-2 font-serif text-xl font-semibold text-charcoal sm:text-2xl">
                        <Link href={jobHref(job)} className="after:absolute after:inset-0">
                          {t(job.title)}
                        </Link>
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{t(job.summary)}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-crimson">
                      {t(ui.cta.viewDetails)}
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone pt-4 text-sm text-charcoal/75">
                    <Meta icon={Briefcase}>{t(ui.careers.employment[job.employmentType])}</Meta>
                    <Meta icon={Users}>{interpolate(t(ui.careers.headcountValue), { n: job.headcount })}</Meta>
                    <Meta icon={Wallet}>{t(job.salary)}</Meta>
                    <Meta icon={CalendarClock}>
                      {t(ui.careers.deadline)}: {formatIsoDate(job.deadline, locale)}
                    </Meta>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-forest uppercase">
        <span className="h-px w-5 bg-crimson" aria-hidden />
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 leading-relaxed text-charcoal/80">
            <CircleCheck className="mt-1 size-4 shrink-0 text-forest" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_PATTERN = /^https?:\/\/\S+$/i;

function ApplicationForm({ job, settings }: { job: JobPosting; settings: SiteSettings }) {
  const { t, locale } = useLanguage();
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", cvUrl: "", message: "" });

  const update = (field: keyof typeof form) => (value: string) => setForm((current) => ({ ...current, [field]: value }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Partial<Record<string, string>> = {};
    const required = t(ui.form.required);
    if (!form.fullName.trim()) next.fullName = required;
    if (!form.phone.trim()) next.phone = required;
    if (!EMAIL_PATTERN.test(form.email)) next.email = t(ui.form.invalidEmail);
    if (form.cvUrl.trim() && !URL_PATTERN.test(form.cvUrl.trim())) next.cvUrl = required;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setFailed(false);
    startTransition(async () => {
      try {
        const response = await submitJobApplication({ jobSlug: job.slug, ...form, locale });
        setResult(response);
        if (!response.ok) setErrors({ [response.errorField]: required });
      } catch {
        setFailed(true);
      }
    });
  }

  if (result?.ok) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-forest text-white">
          <CircleCheck className="size-7" aria-hidden />
        </span>
        <p className="mt-4 text-charcoal/80">{interpolate(t(ui.careers.success), { name: form.fullName })}</p>
        <p className="mt-4 rounded-xl border border-dashed border-forest/40 bg-sand px-4 py-2 font-mono text-sm font-bold text-crimson">
          {result.referenceCode}
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-4">
      <Field label={t(ui.form.fullName)} htmlFor="job-name" error={errors.fullName}>
        <TextInput
          id="job-name"
          autoComplete="name"
          value={form.fullName}
          onChange={(e) => update("fullName")(e.target.value)}
          aria-invalid={Boolean(errors.fullName)}
        />
      </Field>
      <Field label={t(ui.form.phone)} htmlFor="job-phone" error={errors.phone}>
        <TextInput
          id="job-phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => update("phone")(e.target.value)}
          aria-invalid={Boolean(errors.phone)}
        />
      </Field>
      <Field label={t(ui.form.email)} htmlFor="job-email" error={errors.email}>
        <TextInput
          id="job-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => update("email")(e.target.value)}
          aria-invalid={Boolean(errors.email)}
        />
      </Field>
      <Field
        label={t(ui.careers.cvUrl)}
        htmlFor="job-cv"
        error={errors.cvUrl}
        hint={interpolate(t(ui.careers.cvHint), { email: settings.emails.reception })}
      >
        <TextInput
          id="job-cv"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={form.cvUrl}
          onChange={(e) => update("cvUrl")(e.target.value)}
          aria-invalid={Boolean(errors.cvUrl)}
        />
      </Field>
      <Field label={t(ui.careers.message)} htmlFor="job-message">
        <TextArea id="job-message" value={form.message} onChange={(e) => update("message")(e.target.value)} />
      </Field>
      {failed ? <p className="text-sm font-medium text-crimson">{t(ui.form.serverError)}</p> : null}
      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            {t(ui.form.submitting)}
          </>
        ) : (
          t(ui.careers.submit)
        )}
      </Button>
    </form>
  );
}

export function JobDetailView({
  job,
  settings,
  heroImage,
}: {
  job: JobPosting;
  settings: SiteSettings;
  heroImage: ResortImage;
}) {
  const { t, tl, locale } = useLanguage();

  const facts: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Briefcase, label: t(ui.careers.department), value: `${t(job.department)} · ${t(ui.careers.employment[job.employmentType])}` },
    { icon: Users, label: t(ui.careers.headcount), value: interpolate(t(ui.careers.headcountValue), { n: job.headcount }) },
    { icon: Wallet, label: t(ui.careers.salary), value: t(job.salary) },
    { icon: CalendarClock, label: t(ui.careers.deadline), value: formatIsoDate(job.deadline, locale) },
    { icon: MapPin, label: t(ui.careers.workplace), value: t(ui.careers.workplaceValue) },
  ];

  return (
    <>
      <PageHero
        title={t(job.title)}
        subtitle={t(job.summary)}
        crumbs={[{ label: t(ui.nav.careers), href: ROUTES.careers }, { label: t(job.title) }]}
        image={heroImage}
      >
        <a
          href="#apply"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-crimson px-6 text-sm font-semibold text-white shadow-luxe transition hover:bg-crimson-dark"
        >
          {t(ui.careers.apply)}
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </PageHero>

      <section className="bg-alabaster py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
          <div className="space-y-10">
            <dl className="grid gap-4 rounded-3xl bg-white p-6 shadow-card sm:grid-cols-2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div key={label}>
                  <dt className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-charcoal/55 uppercase">
                    <Icon className="size-3.5" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-1 font-semibold text-charcoal">{value}</dd>
                </div>
              ))}
            </dl>
            <ListBlock title={t(ui.careers.responsibilities)} items={tl(job.responsibilities)} />
            <ListBlock title={t(ui.careers.requirements)} items={tl(job.requirements)} />
            <ListBlock title={t(ui.careers.benefits)} items={tl(job.benefits)} />
            <Link
              href={ROUTES.careers}
              className="inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-crimson"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {t(ui.careers.back)}
            </Link>
          </div>

          <aside id="apply" className="h-fit scroll-mt-28 rounded-3xl bg-white p-6 shadow-luxe ring-1 ring-black/5 sm:p-7 xl:sticky xl:top-28">
            <h2 className="font-serif text-2xl font-semibold text-charcoal">{t(ui.careers.applyTitle)}</h2>
            <p className="mt-1 mb-6 text-sm text-charcoal/60">{t(job.title)}</p>
            <ApplicationForm job={job} settings={settings} />
          </aside>
        </div>
      </section>
    </>
  );
}
