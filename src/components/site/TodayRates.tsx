import { useQuery } from "@tanstack/react-query";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { telHref, whatsappHref } from "@/lib/business";
import { formatRupees, formatUpdatedAt, latestUpdate, ratesQueryOptions } from "@/lib/rates";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./icons";

export function TodayRates() {
  const { data, isPending, isError } = useQuery(ratesQueryOptions);
  const rates = data ?? [];
  const updated = latestUpdate(rates);
  const anyRate = updated !== null;

  return (
    <section aria-labelledby="rates-title" className="bg-cream py-16 md:py-20">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Today's Rate"
          title={<span id="rates-title">Gold &amp; Silver Rates</span>}
          description={
            anyRate
              ? `Updated ${formatUpdatedAt(updated)}. Final price depends on design, weight and making.`
              : "Today's rates will be posted here shortly. Call or WhatsApp us for the latest rate."
          }
        />

        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="rounded-sm border border-border bg-card p-5 sm:p-6">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="mt-4 h-8 w-28" />
                </li>
              ))
            : rates.map((r) => (
                <li
                  key={r.id}
                  className="rounded-sm border border-border bg-card p-5 text-center shadow-soft sm:p-6"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {r.label}
                  </p>
                  <p className="mt-3 font-display text-2xl text-burgundy sm:text-3xl">
                    {r.rate != null ? formatRupees(r.rate) : "—"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">per {r.unit}</p>
                </li>
              ))}
        </ul>

        {isError && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Rates couldn't load right now. Please call us for today's rate.
          </p>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="burgundy" size="lg" asChild>
            <a href={telHref}>
              <Phone /> Call for Today's Rate
            </a>
          </Button>
          <Button variant="whatsapp" size="lg" asChild>
            <a
              href={whatsappHref("Hello PATRA JEWELLERS, please share today's gold and silver rate.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon /> Ask on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
