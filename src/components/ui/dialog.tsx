"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  eyebrow?: string;
  closeLabel: string;
  children: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  eyebrow,
  closeLabel,
  children,
  className,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-forest-deep/70 backdrop-blur-sm data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-[90] flex max-h-[94dvh] flex-col overflow-hidden rounded-t-3xl bg-alabaster shadow-luxe outline-none",
            "sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[90dvh] sm:w-[calc(100%-2rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl",
            "data-[state=closed]:animate-dialog-out data-[state=open]:animate-dialog-in",
            className,
          )}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-stone bg-white px-5 py-4 sm:px-8 sm:py-5">
            <div className="min-w-0">
              {eyebrow ? (
                <p className="mb-1 text-[11px] font-bold tracking-[0.2em] text-crimson uppercase">
                  {eyebrow}
                </p>
              ) : null}
              <DialogPrimitive.Title className="font-serif text-xl leading-tight font-semibold text-charcoal sm:text-2xl">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description
                className={cn("mt-1 text-sm text-charcoal/65", !description && "sr-only")}
              >
                {description ?? title}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close
              aria-label={closeLabel}
              className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full bg-sand text-charcoal transition hover:bg-crimson hover:text-white focus-visible:ring-2 focus-visible:ring-crimson focus-visible:outline-none"
            >
              <X className="size-5" aria-hidden />
            </DialogPrimitive.Close>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
