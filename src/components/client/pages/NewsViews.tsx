"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useResortModals } from "@/components/client/InteractiveModals";
import { ROUTES } from "@/components/client/nav-items";
import { PageHero } from "@/components/client/pages/PageHero";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { formatIsoDate, interpolate } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { PromotionCategory, PromotionPost, SiteSettings } from "@/types/resort";

export function newsHref(post: PromotionPost): string {
  return `${ROUTES.news}/${post.slug}`;
}

export function NewsCard({ post }: { post: PromotionPost }) {
  const { t, locale } = useLanguage();

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-luxe">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage.url}
          alt={t(post.coverImage.alt)}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wide text-forest uppercase">
          {t(ui.offers.categories[post.category])}
        </span>
        {post.badgeText ? (
          <span className="absolute top-4 right-4 rounded-full bg-crimson px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            {t(post.badgeText)}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-xs text-charcoal/50">
          <CalendarDays className="size-3.5" aria-hidden />
          <time dateTime={post.publishedAt}>{formatIsoDate(post.publishedAt, locale)}</time>
        </p>
        <h3 className="mt-3 font-serif text-xl leading-snug font-semibold text-balance text-charcoal">
          <Link href={newsHref(post)} className="after:absolute after:inset-0">
            {t(post.title)}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-charcoal/70">{t(post.excerpt)}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {post.validUntil ? (
            <span className="text-xs font-semibold text-crimson">
              {interpolate(t(ui.offers.validUntil), { date: formatIsoDate(post.validUntil, locale) })}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-forest transition group-hover:gap-2.5 group-hover:text-crimson">
            {t(ui.cta.readMore)}
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </article>
  );
}

type NewsFilter = "ALL" | PromotionCategory;

export function NewsListView({ posts }: { posts: PromotionPost[] }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<NewsFilter>("ALL");
  const categories = [...new Set(posts.map((post) => post.category))];
  const visible = filter === "ALL" ? posts : posts.filter((post) => post.category === filter);
  const filters: { id: NewsFilter; label: string }[] = [
    { id: "ALL", label: t(ui.newsPage.all) },
    ...categories.map((category) => ({ id: category, label: t(ui.offers.categories[category]) })),
  ];

  return (
    <>
      <PageHero
        title={t(ui.newsPage.title)}
        subtitle={t(ui.newsPage.subtitle)}
        crumbs={[{ label: t(ui.nav.news) }]}
        image={posts[0]?.coverImage}
      />
      <section className="bg-sand py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label={t(ui.nav.news)} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "shrink-0 cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
                  filter === item.id ? "bg-crimson text-white" : "bg-white text-charcoal/75 hover:text-charcoal",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="mt-12 text-center text-charcoal/60">{t(ui.newsPage.empty)}</p>
          ) : (
            <motion.ul layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {visible.map((post, index) => (
                  <motion.li
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                  >
                    <NewsCard post={post} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </section>
    </>
  );
}

export function NewsDetailView({
  post,
  related,
  settings,
}: {
  post: PromotionPost;
  related: PromotionPost[];
  settings: SiteSettings;
}) {
  const { t, tl, locale } = useLanguage();
  const { openEventRfp, openServiceReservation, openBooking } = useResortModals();

  const action = () => {
    switch (post.category) {
      case "WEDDING":
        return openEventRfp({ eventType: "WEDDING" });
      case "MICE":
        return openEventRfp({ eventType: "CUSTOMER_CONFERENCE" });
      case "SPORTS":
        return openServiceReservation("SPORTS");
      case "STAY":
        return openBooking({ specialRequests: ["LONG_STAY_EXPERT"] });
      case "NEWS":
        return openBooking();
    }
  };

  const actionLabel = (() => {
    switch (post.category) {
      case "WEDDING":
      case "MICE":
        return t(ui.cta.requestQuoteMenu);
      case "SPORTS":
        return t(ui.cta.bookCourt);
      case "STAY":
      case "NEWS":
        return t(ui.cta.bookNow);
    }
  })();

  return (
    <>
      <PageHero
        title={t(post.title)}
        crumbs={[{ label: t(ui.nav.news), href: ROUTES.news }, { label: t(post.title) }]}
        image={post.coverImage}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/75">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wide uppercase">
            {t(ui.offers.categories[post.category])}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            <time dateTime={post.publishedAt}>{formatIsoDate(post.publishedAt, locale)}</time>
          </span>
          {post.validUntil ? (
            <span className="font-semibold text-cream">
              {interpolate(t(ui.offers.validUntil), { date: formatIsoDate(post.validUntil, locale) })}
            </span>
          ) : null}
        </div>
      </PageHero>

      <section className="bg-alabaster py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-8">
          <article>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
              <Image
                src={post.coverImage.url}
                alt={t(post.coverImage.alt)}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-8 text-lg leading-relaxed font-medium text-charcoal">{t(post.excerpt)}</p>
            <div className="mt-6 space-y-5 leading-relaxed text-charcoal/80">
              {tl(post.body).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link
              href={ROUTES.news}
              className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-crimson"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {t(ui.newsPage.back)}
            </Link>
          </article>

          <aside className="h-fit rounded-3xl bg-forest p-7 text-white shadow-card lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl font-semibold">{t(ui.newsPage.interested)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{t(ui.newsPage.interestedText)}</p>
            <Button variant="cream" size="lg" className="mt-6 w-full" onClick={action}>
              {actionLabel}
            </Button>
            <a
              href={`tel:${settings.hotline.replace(/\s/g, "")}`}
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-cream hover:text-white"
            >
              <Phone className="size-4" aria-hidden />
              {settings.hotline}
            </a>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-sand py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-semibold text-charcoal">{t(ui.newsPage.related)}</h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <NewsCard post={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
