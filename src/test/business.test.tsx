import { describe, expect, it } from "vitest";
import { BUSINESS, productEnquiry, telHref, whatsappHref } from "@/lib/business";
import { CATEGORIES, PRODUCTS, getCategory, searchCatalog } from "@/lib/catalog";

describe("PATRA JEWELLERS contact details", () => {
  it("calls and messages +91 9938288284", () => {
    expect(telHref).toBe("tel:+919938288284");
    expect(whatsappHref()).toBe("https://wa.me/919938288284");
  });

  it("shows the owner and address from the brief", () => {
    expect(BUSINESS.owner).toBe("VIJAY KUMAR PATRA");
    expect(BUSINESS.addressFull).toContain("Mangalpur, Jajpur, Odisha");
    expect(BUSINESS.addressFull).toContain("755011");
  });

  it("includes the product code in WhatsApp enquiries", () => {
    expect(decodeURIComponent(whatsappHref(productEnquiry("Gold Ring", "PJ-GR-301")))).toContain(
      "PJ-GR-301",
    );
  });
});

describe("catalog", () => {
  it("has the ten requested categories", () => {
    expect(CATEGORIES.map((c) => c.name)).toEqual([
      "Gold Necklace Sets",
      "Gold Earrings",
      "Gold Rings",
      "Gold Bangles",
      "Gold Chains",
      "Mangalsutra",
      "Silver Jewellery",
      "Silver Anklets",
      "Silver Rings",
      "Traditional Jewellery",
    ]);
  });

  it("gives every category at least one product", () => {
    for (const c of CATEGORIES) {
      expect(PRODUCTS.some((p) => p.categorySlug === c.slug)).toBe(true);
    }
  });

  it("uses unique product codes that point to real categories", () => {
    const codes = PRODUCTS.map((p) => p.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const p of PRODUCTS) expect(getCategory(p.categorySlug)).toBeDefined();
  });

  it("search for 'ring' finds rings but not earrings", () => {
    const { categories } = searchCatalog("ring");
    expect(categories.map((c) => c.name)).toEqual(["Gold Rings", "Silver Rings"]);
  });

  it("does not list prices", () => {
    for (const p of PRODUCTS) expect(Object.keys(p)).not.toContain("price");
  });
});
