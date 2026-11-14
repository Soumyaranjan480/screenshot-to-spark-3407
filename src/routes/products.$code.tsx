import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCatalogProducts } from "@/lib/live-catalog";
import { getCategory, getProduct, productsInCategory } from "@/lib/catalog";
import { BUSINESS, mapsHref, productEnquiry, telHref, whatsappHref } from "@/lib/business";
import { ProductGrid } from "@/components/site/ProductCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Ornament, WhatsAppIcon } from "@/components/site/icons";

export const Route = createFileRoute("/products/$code")({
  // Built-in pieces are known up front; the owner's uploads load in the browser.
  loader: ({ params }) => ({ product: getProduct(params.code) ?? null }),
  head: ({ loaderData, params }) => {
    const product = loaderData?.product;
    const category = product ? getCategory(product.categorySlug) : undefined;
    if (!product || !category) {
      const title = `Design ${params.code.toUpperCase()} | PATRA JEWELLERS, Mangalpur`;
      const description = "A jewellery design at PATRA JEWELLERS, Mangalpur. Enquire on WhatsApp for details.";
      return {
        meta: [
          { title },
          { name: "description", content: description },
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:type", content: "product" },
          { name: "twitter:card", content: "summary_large_image" },
        ],
      };
    }
    const title = `${product.name} (${product.code}) – ${category.name} | PATRA JEWELLERS`;
    return {
      meta: [
        { title },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | PATRA JEWELLERS` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductPage() {
  const { code } = Route.useParams();
  const { products, ready } = useCatalogProducts();
  const product = getProduct(code, products);
  const category = product ? getCategory(product.categorySlug) : undefined;

  if (!product || !category) {
    if (!ready) return <ProductSkeleton />;
    return <ProductNotFound />;
  }

  const sameCategory = productsInCategory(category.slug, products).filter((p) => p.code !== product.code);
  const others = products.filter(
    (p) => p.categorySlug !== category.slug && getCategory(p.categorySlug)?.metal === category.metal,
  );
  const related = [...sameCategory, ...others].slice(0, 4);
  const parent =
    category.metal === "silver"
      ? ({ label: "Silver Jewellery", to: "/silver-jewellery" } as const)
      : category.metal === "gold"
        ? ({ label: "Gold Jewellery", to: "/gold-jewellery" } as const)
        : ({ label: "Collections", to: "/collections" } as const);

  return (
    <>
      <section className="py-10 md:py-16">
        <div className="container-lux">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <li><Link to="/" className="hover:text-gold-deep">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li><Link to={parent.to} className="hover:text-gold-deep">{parent.label}</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
              <li>
                <Link to="/collections/$category" params={{ category: category.slug }} className="hover:text-gold-deep">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-sm border border-gold sm:block" />
              <img
                src={product.image}
                alt={product.name}
                width={896}
                height={1120}
                fetchPriority="high"
                className="relative aspect-[4/5] w-full rounded-sm object-cover shadow-lift"
              />
            </div>

            <div className="lg:py-6">
              <p className="eyebrow">{category.name}</p>
              <h1 className="mt-3 text-balance text-4xl sm:text-5xl">{product.name}</h1>
              <Ornament className="mt-5 h-4 w-14 text-gold" />
              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Product Code</dt>
                  <dd className="mt-1 font-medium text-foreground">{product.code}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Category</dt>
                  <dd className="mt-1 font-medium text-foreground">{category.name}</dd>
                </div>
              </dl>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground/85">
                {product.description}
              </p>
              <p className="mt-6 rounded-sm border border-gold/40 bg-cream px-5 py-4 text-sm text-foreground/80">
                For current pricing, weight and availability, please contact us on WhatsApp or call
                the showroom.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button variant="whatsapp" size="xl" asChild>
                  <a
                    href={whatsappHref(productEnquiry(product.name, product.code))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon /> Enquire on WhatsApp
                  </a>
                </Button>
                <Button variant="outline-gold" size="xl" asChild>
                  <a href={telHref}>
                    <Phone /> Call Now
                  </a>
                </Button>
              </div>

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-start gap-3 text-sm text-muted-foreground hover:text-burgundy"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
                <span>
                  See it in person at {BUSINESS.name}, {BUSINESS.addressFull}
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-card py-16 md:py-24">
          <div className="container-lux">
            <SectionHeading eyebrow="You May Also Like" title="Related Pieces" />
            <div className="mt-12">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function ProductSkeleton() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-lux grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="space-y-4 lg:py-6">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    </section>
  );
}

function ProductNotFound() {
  return (
    <section className="container-lux flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">We couldn't find this piece</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        It may no longer be listed. Explore our collections or ask us on WhatsApp.
      </p>
      <Button variant="burgundy" size="xl" asChild className="mt-8">
        <Link to="/collections">View Collections</Link>
      </Button>
    </section>
  );
}
