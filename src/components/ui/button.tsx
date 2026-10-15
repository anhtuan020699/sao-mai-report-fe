import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-crimson text-white shadow-[0_10px_24px_-12px_rgb(184_20_20/0.8)] hover:bg-crimson-dark focus-visible:ring-crimson",
  secondary: "bg-forest text-white hover:bg-forest-light focus-visible:ring-forest",
  outline:
    "border-2 border-forest text-forest bg-transparent hover:bg-forest hover:text-white focus-visible:ring-forest",
  outlineLight:
    "border border-white/60 text-white bg-white/5 backdrop-blur-sm hover:bg-white hover:text-forest focus-visible:ring-white",
  cream: "bg-cream text-forest hover:bg-white focus-visible:ring-cream",
  ghost: "text-charcoal hover:bg-sand focus-visible:ring-charcoal",
} as const;

const SIZES = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export function buttonVariants({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide whitespace-nowrap",
    "transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] cursor-pointer",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonVariants({ variant, size, className })} {...props} />;
}
