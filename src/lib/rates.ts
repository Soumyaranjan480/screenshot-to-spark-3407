import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MetalRate = {
  id: string;
  label: string;
  unit: string;
  rate: number | null;
  sort_order: number;
  updated_at: string;
};

export const OWNER_EMAIL = "kundusoumyaranjan480@gmail.com";

/** Indian-style rupee format: 123456 -> "₹1,23,456". Keeps paise only when present. */
export function formatRupees(value: number): string {
  const hasPaise = Math.round(value * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: hasPaise ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Parses what the owner types ("1,23,456" or "₹ 72000.50"). Empty -> null, invalid -> undefined. */
export function parseRateInput(input: string): number | null | undefined {
  const cleaned = input.replace(/[₹,\s]/g, "");
  if (cleaned === "") return null;
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return undefined;
  const n = Number(cleaned);
  return n > 9_999_999_999 ? undefined : n;
}

export function latestUpdate(rates: MetalRate[]): Date | null {
  const withRate = rates.filter((r) => r.rate != null);
  if (withRate.length === 0) return null;
  return new Date(Math.max(...withRate.map((r) => new Date(r.updated_at).getTime())));
}

export function formatUpdatedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export const ratesQueryOptions = queryOptions({
  queryKey: ["metal-rates"],
  queryFn: async (): Promise<MetalRate[]> => {
    const { data, error } = await supabase
      .from("metal_rates")
      .select("id, label, unit, rate, sort_order, updated_at")
      .order("sort_order");
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 60_000,
});
