import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRODUCTS, getCategory } from "@/lib/catalog";
import heroModel from "@/assets/hero-model.jpg";
import heroEarrings from "@/assets/hero-earrings.jpg";
import heroBangles from "@/assets/hero-bangles.jpg";
import heroNecklace from "@/assets/hero-necklace.jpg";

const SLIDES = [
  {
    image: heroModel,
    alt: "Woman in a burgundy silk saree wearing a gold temple necklace, jhumkas, maang tikka and bangles",
    label: "Bridal Temple Jewellery",
    position: "object-[72%_center]",
  },
  {
    image: heroEarrings,
    alt: "Woman in profile wearing gold chandbali earrings with pearl drops and a layered gold necklace",
    label: "Chandbalis & Pearl Necklaces",
    position: "object-[70%_center]",
  },
  {
    image: heroBangles,
    alt: "Bride's hands with henna wearing stacked carved gold bangles and a kundan ring",
    label: "Gold Bangles & Rings",
    position: "object-[68%_center]",
  },
  {
    image: heroNecklace,
    alt: "Ornate gold temple necklace and jhumka earrings displayed on velvet",
    label: "Necklace Sets",
    position: "object-[68%_center] md:object-center",
  },
];

const INTERVAL_MS = 5500;

export function HomeHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (step: number) => setActive((i) => (i + step + SLIDES.length) % SLIDES.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Jewellery showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate flex min-h-[calc(100svh-6.75rem)] items-end overflow-hidden bg-burgundy-deep md:min-h-[640px] md:items-center lg:min-h-[720px]"
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.label}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 -z-10 overflow-hidden transition-opacity duration-[1400ms] ease-out",
            i === active ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={s.image}
            alt={s.alt}
            width={1920}
            height={1088}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "h-full w-full object-cover",
              s.position,
              i === active && "animate-slow-zoom",
            )}
          />
        </div>
      ))}
      <div className="bg-hero-overlay absolute inset-0 -z-10" />

      <div className="container-lux pb-24 pt-24 md:py-24">
        <div className="max-w-xl">
          <p className="eyebrow animate-fade-up text-gold-soft">PATRA JEWELLERS · Jajpur, Odisha</p>
          <h1
            className="mt-5 animate-fade-up text-balance text-[2.6rem] leading-[1.02] text-on-dark sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            Where Tradition Meets <em className="text-gold-gradient not-italic">Timeless Elegance</em>
          </h1>
          <p
            className="mt-6 max-w-md animate-fade-up text-base leading-relaxed text-on-dark-muted sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Discover exquisite jewellery crafted to celebrate your most precious moments.
          </p>
          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Button variant="gold" size="xl" asChild>
              <Link to="/collections">Explore Collections</Link>
            </Button>
            <Button variant="outline-light" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 md:bottom-8">
        <div className="container-lux flex items-center justify-between gap-4">
          <p aria-live="polite" className="eyebrow truncate text-gold-soft">
            <span className="text-on-dark">0{active + 1}</span> / 0{SLIDES.length} · {SLIDES[active]?.label}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous view"
              className="grid h-11 w-11 place-items-center rounded-full border border-on-dark/40 text-on-dark transition-colors hover:border-gold hover:text-gold-soft"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="hidden items-center gap-2 sm:flex">
              {SLIDES.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${s.label}`}
                  aria-current={i === active}
                  className="grid h-11 w-6 place-items-center"
                >
                  <span
                    className={cn(
                      "block h-0.5 rounded-full transition-all duration-500",
                      i === active ? "w-6 bg-gold" : "w-3 bg-on-dark/50",
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next view"
              className="grid h-11 w-11 place-items-center rounded-full border border-on-dark/40 text-on-dark transition-colors hover:border-gold hover:text-gold-soft"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Endless, slowly moving ribbon of jewellery pieces. Pauses on hover or keyboard focus. */
export function JewelleryRibbon() {
  const items = PRODUCTS;
  return (
    <section aria-label="Jewellery in motion" className="overflow-hidden border-b border-border bg-cream py-10 md:py-14">
      <div className="container-lux mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Every Angle, Every Occasion</p>
          <h2 className="mt-2 text-3xl text-foreground md:text-4xl">A Glimpse of Our Showroom</h2>
        </div>
        <Link
          to="/collections"
          className="hidden text-xs font-medium uppercase tracking-[0.18em] text-burgundy hover:text-gold-deep sm:inline"
        >
          View all →
        </Link>
      </div>
      <div className="flex w-max animate-marquee gap-4 md:gap-6">
        {[0, 1].map((copy) =>
          items.map((p) => (
            <Link
              key={`${copy}-${p.code}`}
              to="/products/$code"
              params={{ code: p.code }}
              aria-hidden={copy === 1}
              tabIndex={copy === 1 ? -1 : undefined}
              className="group relative block w-44 shrink-0 overflow-hidden rounded-sm shadow-soft sm:w-52 md:w-60"
            >
              <img
                src={p.image}
                alt={copy === 1 ? "" : p.name}
                width={480}
                height={600}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="bg-card-overlay absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-soft">
                  {getCategory(p.categorySlug)?.name}
                </p>
                <p className="mt-1 font-display text-lg leading-tight text-on-dark">{p.name}</p>
              </div>
            </Link>
          )),
        )}
      </div>
    </section>
  );
}
