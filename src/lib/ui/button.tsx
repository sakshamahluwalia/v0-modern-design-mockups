import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Optional shared button. Templates may use this or roll their own Tailwind —
 * whatever produces the best look for the type. Variants use `currentColor`-free
 * neutral defaults; pass className to apply the template's accent.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base py-3.5",
} as const;

const variants = {
  solid: "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900",
  outline:
    "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:ring-neutral-400",
  ghost: "text-neutral-900 hover:bg-neutral-100 focus-visible:ring-neutral-400",
} as const;

type Common = { variant?: keyof typeof variants; size?: keyof typeof sizes };

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & Common>(
  ({ className, variant = "solid", size = "md", ...props }, ref) => (
    <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />
  ),
);
Button.displayName = "Button";

export const ButtonLink = forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement> & Common>(
  ({ className, variant = "solid", size = "md", ...props }, ref) => (
    <a ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props} />
  ),
);
ButtonLink.displayName = "ButtonLink";
