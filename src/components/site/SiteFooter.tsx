import { Link } from "@tanstack/react-router";
import { MapPin, Phone, User } from "lucide-react";
import { CATEGORIES } from "@/lib/catalog";
import { BUSINESS, defaultEnquiry, mapsHref, telHref, whatsappHref } from "@/lib/business";
import { NAV_LINKS } from "./nav";
import { Ornament, WhatsAppIcon } from "./icons";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-on-dark-muted">
      <div className="container-lux py-16 md:py-20">
        <div className="flex flex-col items-center text-center">
          <p className="font-display text-3xl tracking-[0.24em] text-on-dark sm:text-4xl">PATRA</p>
          <p className="mt-2 text-[0.65rem] tracking-[0.5em] text-gold">JEWELLERS</p>
          <Ornament className="mt-5 h-4 w-14 text-gold" />
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            Gold, silver and traditional jewellery, chosen with care for your most precious
            moments.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-gold">Explore</h2>
            <ul className="mt-5 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-block py-1.5 text-sm transition-colors hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold">Jewellery</h2>
            <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-1">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/collections/$category"
                    params={{ category: c.slug }}
                    className="inline-block py-1.5 text-sm transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold">Showroom</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  <span className="block text-on-dark">Owner</span>
                  {BUSINESS.owner}
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  <span className="block text-on-dark">{BUSINESS.name}</span>
                  {BUSINESS.addressFull}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={telHref} className="inline-flex min-h-11 items-center gap-3 hover:text-gold">
                  <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(defaultEnquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 hover:text-gold"
                >
                  <WhatsAppIcon className="h-4 w-4 text-gold" />
                  WhatsApp {BUSINESS.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-14 opacity-50" />
        <div className="mt-6 flex flex-col items-center justify-between gap-3 text-center text-xs sm:flex-row sm:text-left">
          <p>© {year} PATRA JEWELLERS. All rights reserved.</p>
          <p>Mangalpur, Jajpur, Odisha – 755011</p>
        </div>
      </div>
    </footer>
  );
}
