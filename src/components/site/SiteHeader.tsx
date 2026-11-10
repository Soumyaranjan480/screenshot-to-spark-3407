import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Menu, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";
import { SearchDialog } from "./SearchDialog";
import { WhatsAppIcon } from "./icons";
import { BUSINESS, defaultEnquiry, telHref, whatsappHref } from "@/lib/business";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-burgundy text-on-dark-muted">
        <div className="container-lux flex h-9 items-center justify-center gap-6 text-[0.7rem] tracking-[0.16em] uppercase md:justify-between">
          <span className="hidden items-center gap-2 md:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            Mangalpur, Jajpur, Odisha
          </span>
          <a href={telHref} className="inline-flex items-center gap-2 hover:text-on-dark">
            <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            {BUSINESS.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container-lux flex h-[4.5rem] items-center justify-between gap-3">
          <div className="flex items-center gap-1 lg:hidden">
            <Button
              variant="icon"
              size="icon"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="-ml-2"
            >
              <Menu className="!h-6 !w-6" />
            </Button>
          </div>

          <Logo className="mr-auto lg:mr-0" />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-5 xl:gap-8">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:text-burgundy data-[status=active]:text-burgundy after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100 data-[status=active]:after:scale-x-100"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="icon"
              size="icon"
              aria-label="Search jewellery"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="!h-5 !w-5" />
            </Button>
            <Button variant="icon" size="icon" asChild className="-mr-2 text-whatsapp">
              <a
                href={whatsappHref(defaultEnquiry)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp"
              >
                <WhatsAppIcon className="!h-6 !w-6" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="flex w-[86%] max-w-sm flex-col gap-0 border-gold/30 bg-ivory p-0"
        >
          <div className="border-b border-border px-6 py-5">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <Logo />
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="divide-y divide-border">
              {NAV_LINKS.map((l, i) => (
                <li
                  key={l.to}
                  className="animate-fade-up"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-14 items-center justify-between font-display text-2xl text-foreground data-[status=active]:text-burgundy"
                  >
                    {l.label}
                    <span aria-hidden="true" className="text-gold">
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-border bg-cream px-6 py-6">
            <Button variant="whatsapp" size="touch" asChild className="w-full">
              <a href={whatsappHref(defaultEnquiry)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Enquire on WhatsApp
              </a>
            </Button>
            <Button variant="outline-gold" size="touch" asChild className="w-full">
              <a href={telHref}>
                <Phone /> Call {BUSINESS.phoneDisplay}
              </a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
