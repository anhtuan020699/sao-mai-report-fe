"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { MessengerIcon } from "@/components/client/icons";
import { useLanguage } from "@/context/LanguageContext";
import { ui } from "@/data/ui-dictionary";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/resort";

function DockItem({
  label,
  href,
  onClick,
  className,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}) {
  const shared = cn(
    "group relative grid size-11 cursor-pointer place-items-center rounded-full shadow-luxe transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:outline-none sm:size-13",
    className,
  );
  const tooltip = (
    <span className="pointer-events-none absolute right-full mr-3 hidden rounded-full bg-charcoal px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow transition group-hover:opacity-100 md:block">
      {label}
    </span>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        aria-label={label}
        className={shared}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {tooltip}
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={shared}>
      {tooltip}
      {children}
    </button>
  );
}

export function FloatingContactDock({ settings }: { settings: SiteSettings }) {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showTop = scrollY > 800;

  return (
    <div
      className={cn(
        "fixed right-3 bottom-3 z-40 flex flex-col items-end gap-2 transition duration-300 sm:right-6 sm:bottom-6 sm:gap-3",
        scrollY < 320 && "max-xl:pointer-events-none max-xl:translate-y-4 max-xl:opacity-0",
      )}
    >
      <AnimatePresence>
        {showTop ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <DockItem
              label={t(ui.dock.top)}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-forest ring-1 ring-stone"
            >
              <ArrowUp className="size-5" aria-hidden />
            </DockItem>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <DockItem label={t(ui.dock.messenger)} href={settings.social.messenger} className="bg-[#0866FF] text-white">
        <MessengerIcon className="size-6" />
      </DockItem>
      <DockItem label={t(ui.dock.zalo)} href={settings.social.zalo} className="bg-[#0068FF] text-white">
        <span className="font-sans text-[13px] font-extrabold tracking-tight">Zalo</span>
      </DockItem>
      <DockItem
        label={`${t(ui.dock.call)} ${settings.hotline}`}
        href={`tel:${settings.hotline.replace(/\s/g, "")}`}
        className="bg-crimson text-white"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-crimson/50" aria-hidden />
        <Phone className="relative size-5" aria-hidden />
      </DockItem>
    </div>
  );
}
