import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CATEGORIES, featuredProducts } from "@/lib/catalog";
import { useCatalogProducts } from "@/lib/live-catalog";
import { CategoryGrid } from "@/components/site/CategoryCard";
import { ProductGrid } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { JewelleryRibbon } from "@/components/site/HomeShowcase";
import { TodayRates } from "@/components/site/TodayRates";
import { AboutSection, ContactSection, HomeHero, WhyChooseUs } from "@/components/site/sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PATRA JEWELLERS – Where Tradition Meets Timeless Elegance" },
      {
        name: "description",
        content:
          "Explore gold necklace sets, earrings, bangles, mangalsutra, silver and traditional jewellery at PATRA JEWELLERS, Mangalpur, Jajpur, Odisha.",
      },
      { property: "og:title", content: "PATRA JEWELLERS – Where Tradition Meets Timeless Elegance" },
      {
        property: "og:description",
        content:
          "Gold, silver and traditional jewellery in Mangalpur, Jajpur, Odisha. Enquire on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HomeHero />
      <JewelleryRibbon />
      <TodayRates />

      <section className="py-14 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Shop by Category"
            title="Discover Our Jewellery"
            description="From bridal gold to delicate silver, explore collections for every occasion."
          />
          <div className="mt-8 md:mt-14">
            <CategoryGrid categories={CATEGORIES} swipeOnMobile />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-14 md:py-28">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Featured Collections"
            title="Pieces We Love"
            description="Ask us on WhatsApp for current availability and pricing of any piece."
          />
          <div className="mt-8 md:mt-14">
            <ProductGrid products={featuredProducts(products).slice(0, 8)} />
          </div>
          <div className="mt-10 flex justify-center md:mt-12">
            <Button variant="burgundy" size="xl" asChild>
              <Link to="/collections">View All Collections</Link>
            </Button>
          </div>
        </div>
      </section>

      <AboutSection />
      <WhyChooseUs />
      <ContactSection />
    </>
  );
}
