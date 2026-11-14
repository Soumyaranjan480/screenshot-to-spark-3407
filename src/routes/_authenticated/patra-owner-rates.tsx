import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { fieldClass, labelClass } from "@/components/site/fields";
import { OwnerShell } from "@/components/site/OwnerShell";
import {
  formatRupees,
  formatUpdatedAt,
  parseRateInput,
  ratesQueryOptions,
  type MetalRate,
} from "@/lib/rates";

export const Route = createFileRoute("/_authenticated/patra-owner-rates")({
  head: () => ({
    meta: [
      { title: "Update Today's Rates – PATRA JEWELLERS" },
      { name: "description", content: "Owner page to update daily gold and silver rates." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Update Today's Rates – PATRA JEWELLERS" },
      { property: "og:description", content: "Owner-only rate editor." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user } = Route.useRouteContext();
  return (
    <OwnerShell user={user} title="Today's Rates">
      <RatesEditor />
    </OwnerShell>
  );
}

function RatesEditor() {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery(ratesQueryOptions);
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setValues(Object.fromEntries(data.map((r) => [r.id, r.rate != null ? String(r.rate) : ""])));
  }, [data]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data) return;
    const changes: { row: MetalRate; rate: number | null }[] = [];
    for (const row of data) {
      const parsed = parseRateInput(values[row.id] ?? "");
      if (parsed === undefined) { toast.error(`${row.label}: please enter a number like 72500`); return; }
      if (parsed !== row.rate) changes.push({ row, rate: parsed });
    }
    if (changes.length === 0) { toast("Nothing changed"); return; }

    setSaving(true);
    for (const { row, rate } of changes) {
      const { error } = await supabase.from("metal_rates").update({ rate }).eq("id", row.id);
      if (error) {
        setSaving(false);
        { toast.error(`Couldn't save ${row.label}. Please try again.`); return; }
      }
    }
    setSaving(false);
    await queryClient.invalidateQueries({ queryKey: ratesQueryOptions.queryKey });
    toast.success("Rates updated on the website");
  }

  if (isPending || !data) return <Skeleton className="h-64 w-full" />;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-sm border border-border bg-ivory p-6 shadow-soft sm:p-8">
      <p className="text-sm text-muted-foreground">
        Type the rate in rupees. Leave a box empty to hide that rate.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {data.map((r) => (
          <div key={r.id}>
            <label htmlFor={`rate-${r.id}`} className={labelClass}>
              {r.label} <span className="normal-case tracking-normal text-muted-foreground">(per {r.unit})</span>
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-muted-foreground">₹</span>
              <input
                id={`rate-${r.id}`}
                inputMode="decimal"
                placeholder="e.g. 72500"
                value={values[r.id] ?? ""}
                onChange={(e) => setValues((v) => ({ ...v, [r.id]: e.target.value }))}
                className={`${fieldClass} pl-8`}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {r.rate != null
                ? `Now showing ${formatRupees(r.rate)} · ${formatUpdatedAt(new Date(r.updated_at))}`
                : "Not shown yet"}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="submit" variant="burgundy" size="xl" disabled={saving}>
          {saving ? "Saving…" : "Save Today's Rates"}
        </Button>
        <Button variant="outline-gold" size="xl" asChild>
          <Link to="/">View Website</Link>
        </Button>
      </div>
    </form>
  );
}
