import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import bannerImage from "@/assets/p-traditional-1.jpg";
import { CATEGORIES, METAL_LABEL, productsByMetal, type Metal } from "@/lib/catalog";
import { useCatalogProducts } from "@/lib/live-catalog";
import { CategoryGrid } from "@/components/site/CategoryCard";
import { PageBanner } from "@/components/site/PageBanner";
import { ProductGrid } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "All Collections – Gold, Silver & Traditional | PATRA JEWELLERS" },
      {
        name: "description",
        content:
          "Browse every jewellery category at PATRA JEWELLERS: gold necklace sets, earrings, rings, bangles, chains, mangalsutra, silver and traditional jewellery.",
      },
      { property: "og:title", content: "All Collections | PATRA JEWELLERS" },
      {
        property: "og:description",
        content: "Gold, silver and traditional jewellery collections in Jajpur, Odisha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionsPage,
});

type Filter = "all" | Metal;
const FILTERS: Filter[] = ["all", "gold", "silver", "traditional"];

function CollectionsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const { products: all } = useCatalogProducts();
  const products = filter === "all" ? all : productsByMetal(filter, all);

  return (
    <>
      <PageBanner
        image={bannerImage}
        crumbs={[{ label: "Home", to: "/" }, { label: "Collections" }]}
        eyebrow="Our Collections"
        title="Every Piece, One Showroom"
        description="Explore gold, silver and traditional jewellery — and enquire about any piece directly on WhatsApp."
      />

      <section className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Categories" title="Browse by Category" />
          <div className="mt-12">
            <CategoryGrid categories={CATEGORIES} />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading
            eyebrow="The Showcase"
            title="All Jewellery"
            description="Contact us for current pricing and availability of any piece."
          />
          <div
            role="tablist"
            aria-label="Filter by type"
            className="mt-10 flex flex-wrap justify-center gap-2"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "min-h-11 rounded-full border px-5 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                  filter === f
                    ? "border-burgundy bg-burgundy text-on-dark"
                    : "border-border bg-background text-foreground hover:border-gold",
                )}
              >
                {f === "all" ? "All" : METAL_LABEL[f]}
              </button>
            ))}
          </div>
          <div className="mt-10">
            <ProductGrid products={products} />
          </div>
        </div>
      </section>
    </>
  );
}
