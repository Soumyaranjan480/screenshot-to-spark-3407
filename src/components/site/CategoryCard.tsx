import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/lib/catalog";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to="/collections/$category"
      params={{ category: category.slug }}
      className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-cream shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
    >
      <img
        src={category.image}
        alt={category.name}
        width={896}
        height={1120}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="bg-card-overlay absolute inset-0" />
      <div className="absolute inset-2 rounded-sm border border-on-dark/0 transition-colors duration-500 group-hover:border-gold/60" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="font-display text-xl leading-tight text-on-dark sm:text-2xl">
          {category.name}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1.5 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-soft sm:text-[0.68rem]">
          Explore Collection
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export function CategoryGrid({
  categories,
  columns = 5,
  swipeOnMobile = false,
}: {
  categories: Category[];
  columns?: 3 | 5;
  /** On phones, show one swipeable row instead of a long grid. */
  swipeOnMobile?: boolean;
}) {
  const cols = columns === 3 ? "md:grid-cols-3" : "lg:grid-cols-5";
  return (
    <ul
      className={
        swipeOnMobile
          ? `scrollbar-none -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 ${cols}`
          : `grid grid-cols-2 gap-3 sm:gap-5 ${cols}`
      }
    >
      {categories.map((c) => (
        <li key={c.slug} className={swipeOnMobile ? "w-[42%] shrink-0 snap-start sm:w-auto" : undefined}>
          <CategoryCard category={c} />
        </li>
      ))}
    </ul>
  );
}
