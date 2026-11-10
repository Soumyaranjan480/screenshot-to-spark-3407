import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getCategory, type Product } from "@/lib/catalog";
import { productEnquiry, whatsappHref } from "@/lib/business";
import { WhatsAppIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card shadow-soft transition-shadow hover:shadow-lift">
      <Link
        to="/products/$code"
        params={{ code: product.code }}
        className="relative block aspect-[4/5] overflow-hidden bg-cream"
        aria-label={`View details of ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          width={896}
          height={1120}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-sm bg-ivory/90 px-2 py-1 text-[0.6rem] font-medium tracking-[0.12em] text-charcoal sm:left-3 sm:top-3">
          {product.code}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep sm:text-[0.68rem]">
          {category?.name}
        </p>
        <h3 className="mt-1.5 font-display text-lg leading-snug text-foreground sm:text-[1.4rem]">
          <Link to="/products/$code" params={{ code: product.code }} className="hover:text-burgundy">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">Code: {product.code}</p>
        <div className="mt-auto grid gap-2 pt-4">
          <Button variant="outline-gold" size="touch" asChild className="w-full px-2">
            <Link to="/products/$code" params={{ code: product.code }}>
              View Details
            </Link>
          </Button>
          <Button variant="whatsapp" size="touch" asChild className="w-full px-2">
            <a
              href={whatsappHref(productEnquiry(product.name, product.code))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
            >
              <WhatsAppIcon />
              <span className="sm:hidden">Enquire</span>
              <span className="hidden sm:inline">Enquire on WhatsApp</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <li key={p.code}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
