import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Ornament } from "./icons";

type Crumb = { label: string; to?: "/" | "/collections" | "/gold-jewellery" | "/silver-jewellery" };

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  image?: string;
  crumbs?: Crumb[];
};

export function PageBanner({ eyebrow, title, description, image, crumbs }: Props) {
  const dark = Boolean(image);
  return (
    <section
      className={
        dark
          ? "relative isolate overflow-hidden bg-burgundy-deep"
          : "relative overflow-hidden bg-cream"
      }
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            width={896}
            height={1120}
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          />
          <div className="bg-hero-overlay absolute inset-0 -z-10" />
        </>
      )}
      <div className="container-lux py-14 sm:py-20 lg:py-24">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className={`flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-[0.16em] ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}
            >
              {crumbs.map((c, i) => (
                <li key={c.label} className="inline-flex items-center gap-1.5">
                  {c.to ? (
                    <Link to={c.to} className="hover:text-gold">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className={dark ? "text-on-dark" : "text-foreground"}>
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-2xl animate-fade-up">
          {eyebrow && <p className={dark ? "eyebrow text-gold-soft" : "eyebrow"}>{eyebrow}</p>}
          <h1
            className={`mt-3 text-balance text-4xl sm:text-5xl lg:text-6xl ${dark ? "text-on-dark" : "text-foreground"}`}
          >
            {title}
          </h1>
          <Ornament className="mt-5 h-4 w-14 text-gold" />
          {description && (
            <p
              className={`mt-5 text-pretty text-base leading-relaxed sm:text-lg ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
