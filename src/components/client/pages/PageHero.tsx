"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ROUTES } from "@/components/client/nav-items";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import type { ResortImage } from "@/types/resort";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  image?: ResortImage;
  children?: ReactNode;
}

export function PageHero({ title, subtitle, crumbs, image, children }: PageHeroProps) {
  const { t } = useLanguage();
  const trail: Crumb[] = [{ label: t(ui.nav.home), href: ROUTES.home }, ...crumbs];

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      {image ? (
        <>
          <Image src={image.url} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/40" />
        </>
      ) : null}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
            {trail.map((crumb, index) => (
              <li key={`${crumb.label}-${index}`} className="inline-flex items-center gap-1.5">
                {index > 0 ? <ChevronRight className="size-3.5" aria-hidden /> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="line-clamp-1 text-white/85">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-6 max-w-4xl font-serif text-3xl leading-tight font-semibold text-balance sm:text-5xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}
