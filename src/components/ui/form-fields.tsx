import { Check, ChevronDown } from "lucide-react";
import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const CONTROL =
  "w-full rounded-xl border border-stone bg-white px-3.5 text-sm text-charcoal placeholder:text-charcoal/40 " +
  "transition focus:border-forest focus:ring-2 focus:ring-forest/15 focus:outline-none aria-[invalid=true]:border-crimson aria-[invalid=true]:ring-crimson/15";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, hint, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-xs font-semibold tracking-wide text-charcoal/80">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs font-medium text-crimson">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-charcoal/50">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(CONTROL, "h-11", className)} {...props} />;
}

export function SelectInput({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(CONTROL, "h-11 cursor-pointer appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-charcoal/60"
        aria-hidden
      />
    </div>
  );
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(CONTROL, "min-h-24 resize-y py-3", className)} {...props} />;
}

interface ChoiceChipProps {
  checked: boolean;
  onToggle: () => void;
  children: ReactNode;
  tone?: "crimson" | "forest";
}

export function ChoiceChip({ checked, onToggle, children, tone = "forest" }: ChoiceChipProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition",
        checked
          ? tone === "crimson"
            ? "border-crimson bg-crimson text-white"
            : "border-forest bg-forest text-white"
          : "border-stone bg-white text-charcoal/80 hover:border-forest/50",
      )}
    >
      <span
        className={cn(
          "grid size-4 place-items-center rounded-full border",
          checked ? "border-white/70 bg-white/20" : "border-charcoal/30",
        )}
      >
        {checked ? <Check className="size-3" aria-hidden /> : null}
      </span>
      {children}
    </button>
  );
}
