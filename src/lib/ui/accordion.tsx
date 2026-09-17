import * as Acc from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SiteFaq } from "@/lib/site-config";

/** Optional shared FAQ accordion built on Radix. Style via className overrides. */
export function FaqAccordion({ items, className }: { items: SiteFaq[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <Acc.Root type="single" collapsible className={cn("divide-y divide-neutral-200", className)}>
      {items.map((f, i) => (
        <Acc.Item key={i} value={`item-${i}`} className="py-1">
          <Acc.Header>
            <Acc.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-base font-semibold text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 rounded-md">
              {f.q}
              <ChevronDown className="h-5 w-5 shrink-0 text-neutral-500 transition-transform group-data-[state=open]:rotate-180" />
            </Acc.Trigger>
          </Acc.Header>
          <Acc.Content className="overflow-hidden data-[state=open]:animate-[acc-down_150ms_ease] data-[state=closed]:animate-[acc-up_150ms_ease]">
            <p className="pb-4 pr-8 leading-relaxed text-neutral-600">{f.a}</p>
          </Acc.Content>
        </Acc.Item>
      ))}
    </Acc.Root>
  );
}
