import { describe, expect, it } from "vitest";
import { formatRupees, latestUpdate, parseRateInput, visibleRates, type MetalRate } from "@/lib/rates";

const row = (rate: number | null, updated_at: string): MetalRate => ({
  id: "x", label: "Gold 22K", unit: "10 g", rate, sort_order: 1, updated_at,
});

describe("daily rates", () => {
  it("offers only 22K 916 gold and silver", () => {
    const rates = visibleRates(["gold_24k", "gold_22k", "gold_18k", "silver"].map((id) => ({
      ...row(null, "2026-11-14T04:30:00Z"), id,
    })));
    expect(rates.map((r) => r.id)).toEqual(["gold_22k", "silver"]);
    expect(rates[0]?.label).toBe("Gold 22K (916)");
  });

  it("keeps silver owner-entered rates on the 10 g basis", () => {
    const rates = visibleRates([{ ...row(950, "2026-11-14T04:30:00Z"), id: "silver", unit: "10 g" }]);
    expect(rates[0]?.unit).toBe("10 g");
    expect(rates[0]?.rate).toBe(950);
  });

  it("shows rupees in Indian format", () => {
    expect(formatRupees(123456)).toBe("₹1,23,456");
    expect(formatRupees(72500.5)).toBe("₹72,500.50");
  });

  it("reads what the owner types, with commas or ₹", () => {
    expect(parseRateInput("1,23,456")).toBe(123456);
    expect(parseRateInput("₹ 72500.50")).toBe(72500.5);
    expect(parseRateInput("")).toBeNull();
    expect(parseRateInput("abc")).toBeUndefined();
    expect(parseRateInput("-5")).toBeUndefined();
  });

  it("never shows an 'updated' time when the owner has not entered any rate", () => {
    expect(latestUpdate([row(null, "2026-11-12T10:00:00Z")])).toBeNull();
    expect(latestUpdate([row(70000, "2026-11-12T10:00:00Z"), row(null, "2026-11-13T10:00:00Z")])?.toISOString()).toBe(
      "2026-11-12T10:00:00.000Z",
    );
  });
});
