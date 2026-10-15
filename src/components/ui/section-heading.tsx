import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  overline: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
  titleId?: string;
  className?: string;
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = "left",
  tone = "light",
  action,
  titleId,
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        <p
          className={cn(
            "inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] uppercase",
            isDark ? "text-cream" : "text-crimson",
          )}
        >
          <span className={cn("h-px w-8", isDark ? "bg-cream/70" : "bg-crimson")} aria-hidden />
          {overline}
        </p>
        <h2
          id={titleId}
          className={cn(
            "mt-4 font-serif text-3xl leading-[1.15] font-semibold text-balance sm:text-4xl lg:text-[2.75rem]",
            isDark ? "text-white" : "text-charcoal",
          )}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={cn(
              "mt-4 text-base leading-relaxed text-pretty sm:text-lg",
              isDark ? "text-white/75" : "text-charcoal/70",
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
