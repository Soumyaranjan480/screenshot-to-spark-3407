import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/catalog";
import { mergeCatalog, nextDesignCode, type UploadedDesign } from "@/lib/live-catalog";

const up: UploadedDesign = {
  id: "1", code: "PJ-GN-999", name: "New", categorySlug: "gold-necklace-sets", image: "x",
  description: "", imagePath: "p", createdAt: "", uploaded: true,
};

describe("owner design manager", () => {
  it("hides deleted sample designs", () => {
    const merged = mergeCatalog(PRODUCTS, { uploaded: [], hidden: ["PJ-GN-101"] });
    expect(merged.some((p) => p.code === "PJ-GN-101")).toBe(false);
    expect(merged.length).toBe(PRODUCTS.length - 1);
  });
  it("shows uploaded designs first", () => {
    expect(mergeCatalog(PRODUCTS, { uploaded: [up], hidden: [] })[0]!.code).toBe("PJ-GN-999");
  });
  it("gives the next code for the jewellery type", () => {
    expect(nextDesignCode("gold-necklace-sets", [...PRODUCTS, up])).toBe("PJ-GN-1000");
  });
});
