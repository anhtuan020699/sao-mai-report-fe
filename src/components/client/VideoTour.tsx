"use client";

import { ExternalLink, Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import type { SiteSettings } from "@/types/resort";

type IntroVideo = NonNullable<SiteSettings["introVideo"]>;

export function VideoTour({ video }: { video: IntroVideo }) {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(false);
  const title = t(video.title);
  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <section aria-labelledby="video-title" className="relative overflow-hidden bg-forest-deep py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_at_top,rgb(255_255_255/0.08),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline={t(ui.video.overline)}
          title={t(ui.video.title)}
          subtitle={t(ui.video.subtitle)}
          tone="dark"
          align="center"
          titleId="video-title"
        />

        <Reveal className="mt-12">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-luxe ring-1 ring-white/10">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`${t(ui.video.play)}: ${title}`}
                className="group absolute inset-0 cursor-pointer"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(min-width: 1152px) 1088px, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="relative grid size-18 place-items-center rounded-full bg-crimson text-white shadow-luxe transition group-hover:scale-110 sm:size-22">
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-crimson/40" />
                    <Play className="relative size-7 translate-x-0.5 fill-current sm:size-9" aria-hidden />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 rounded-full bg-black/45 px-4 py-2 text-left text-sm font-semibold text-white backdrop-blur sm:bottom-6 sm:left-6">
                  {title}
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <p className="mt-6 text-center">
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream transition hover:text-white"
          >
            {t(ui.video.watchOnYoutube)}
            <ExternalLink className="size-4" aria-hidden />
          </a>
        </p>
      </div>
    </section>
  );
}
