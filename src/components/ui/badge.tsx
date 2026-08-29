import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-foreground",
        muted: "border-transparent bg-secondary text-muted-foreground",
        blocked: "border-blocked/30 bg-blocked/15 text-blocked",
        atrisk: "border-atrisk/30 bg-atrisk/15 text-atrisk",
        ready: "border-ready/30 bg-ready/15 text-ready",
        outline: "border-border text-muted-foreground",
        paper: "border-paper-fg/15 bg-paper-fg/8 text-paper-fg",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
