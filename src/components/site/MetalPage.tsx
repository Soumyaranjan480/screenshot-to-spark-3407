import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { categoriesByMetal, highlights, type Metal } from "@/lib/catalog";
import { useCatalogProducts } from "@/lib/live-catalog";
import { defaultEnquiry, whatsappHref } from "@/lib/business";
import { CategoryGrid } from "./CategoryCard";
import { PageBanner } from "./PageBanner";
import { ProductGrid } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppIcon } from "./icons";

type Props = {
  metal: Extract<Metal, "gold" | "silver">;
  title: string;
  description: string;
  image: string;
};

export function MetalPage({ metal, title, description, image }: Props) {
  const categories = categoriesByMetal(metal);
  const { products: all } = useCatalogProducts();
  const products = highlights(2, metal, all);

  return (
    <>
      <PageBanner
        image={image}
        crumbs={[{ label: "Home", to: "/" }, { label: title }]}
        eyebrow="Collections"
        title={title}
        description={description}
      />

      <section className="py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Categories" title={`Shop ${title}`} />
          <div className="mt-12">
            <CategoryGrid categories={categories} columns={3} />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card py-16 md:py-24">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Highlights"
            title={`${title} Showcase`}
            description="A few favourites from each type. Tap a category above to see all its designs."
          />
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="whatsapp" size="xl" asChild>
              <a href={whatsappHref(defaultEnquiry)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Ask on WhatsApp
              </a>
            </Button>
            <Button variant="outline-gold" size="xl" asChild>
              <Link to="/collections">All Collections</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
