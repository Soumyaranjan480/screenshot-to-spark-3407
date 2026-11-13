import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CATEGORIES, getCategory, productsInCategory } from "@/lib/catalog";
import { defaultEnquiry, whatsappHref } from "@/lib/business";
import { CategoryCard } from "@/components/site/CategoryCard";
import { PageBanner } from "@/components/site/PageBanner";
import { ProductGrid } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/collections/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category, products: productsInCategory(category.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Collection not found | PATRA JEWELLERS" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const title = `${category.name} | PATRA JEWELLERS, Jajpur`;
    const description = `${category.blurb} Explore ${category.name.toLowerCase()} at PATRA JEWELLERS, Mangalpur, Jajpur, Odisha.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryPage() {
  const { category, products } = Route.useLoaderData();
  const others = CATEGORIES.filter((c) => c.slug !== category.slug && c.metal === category.metal).slice(0, 4);
  const fill = others.length < 4
    ? CATEGORIES.filter((c) => c.slug !== category.slug && c.metal !== category.metal).slice(0, 4 - others.length)
    : [];
  const related = [...others, ...fill];
  const parent =
    category.metal === "silver"
      ? ({ label: "Silver Jewellery", to: "/silver-jewellery" } as const)
      : category.metal === "gold"
        ? ({ label: "Gold Jewellery", to: "/gold-jewellery" } as const)
        : ({ label: "Collections", to: "/collections" } as const);

  return (
    <>
      <PageBanner
        image={category.image}
        crumbs={[{ label: "Home", to: "/" }, parent, { label: category.name }]}
        eyebrow="Collection"
        title={category.name}
        description={category.blurb}
      />

      <section className="py-12 md:py-24">
        <div className="container-lux">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">{products.length} {products.length === 1 ? "design" : "designs"}</p>
              <h2 className="mt-2 text-3xl sm:text-4xl">All {category.name} Designs</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Many more designs are available at our showroom. Ask us on WhatsApp for pricing and
              availability.
            </p>
          </div>
          <div className="mt-8 md:mt-10">
            <ProductGrid products={products} />
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="whatsapp" size="xl" asChild>
              <a
                href={whatsappHref(`${defaultEnquiry} I'm interested in ${category.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon /> Ask About More Designs
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream py-12 md:py-24">
        <div className="container-lux">
          <SectionHeading eyebrow="Keep Exploring" title="You May Also Like" />
          <ul className="mt-8 grid grid-cols-2 md:mt-12 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((c) => (
              <li key={c.slug}>
                <CategoryCard category={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function CategoryNotFound() {
  return (
    <section className="container-lux flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">This collection isn't available</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Please explore our other jewellery collections.
      </p>
      <Button variant="burgundy" size="xl" asChild className="mt-8">
        <Link to="/collections">View Collections</Link>
      </Button>
    </section>
  );
}
