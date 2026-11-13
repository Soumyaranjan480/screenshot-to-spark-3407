import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CATEGORIES, getCategory, searchCatalog } from "@/lib/catalog";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export function SearchDialog({ open, onOpenChange }: Props) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchCatalog(query), [query]);
  const close = () => {
    onOpenChange(false);
    setQuery("");
  };
  const hasQuery = query.trim().length > 0;
  const empty = hasQuery && results.categories.length === 0 && results.products.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[10%] max-h-[80vh] w-[calc(100%-2rem)] translate-y-0 gap-0 overflow-hidden rounded-sm border-gold/40 p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search jewellery</DialogTitle>
        <DialogDescription className="sr-only">
          Search by product name, category or product code.
        </DialogDescription>
        <div className="flex items-center gap-3 border-b border-border px-5 py-4 pr-12">
          <Search className="h-5 w-5 shrink-0 text-gold-deep" aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search necklaces, rings, PJ-GR-301…"
            aria-label="Search jewellery"
            className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3">
          {!hasQuery && (
            <div className="p-2">
              <p className="eyebrow mb-3">Browse categories</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/collections/$category"
                    params={{ category: c.slug }}
                    onClick={close}
                    className="rounded-full border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-gold hover:bg-secondary"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {empty && (
            <p className="p-4 text-sm text-muted-foreground">
              No pieces match “{query}”. Try another name, or ask us on WhatsApp.
            </p>
          )}

          {results.categories.length > 0 && (
            <div className="p-2">
              <p className="eyebrow mb-2">Categories</p>
              <ul>
                {results.categories.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/collections/$category"
                      params={{ category: c.slug }}
                      onClick={close}
                      className="block rounded-sm px-3 py-3 text-sm hover:bg-secondary"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.products.length > 0 && (
            <div className="p-2">
              <p className="eyebrow mb-2">Pieces</p>
              <ul className="space-y-1">
                {results.products.slice(0, 30).map((p) => (
                  <li key={p.code}>
                    <Link
                      to="/products/$code"
                      params={{ code: p.code }}
                      onClick={close}
                      className="flex items-center gap-3 rounded-sm p-2 hover:bg-secondary"
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={48}
                        height={60}
                        loading="lazy"
                        className="h-14 w-11 shrink-0 rounded-sm object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate font-display text-lg text-foreground">
                          {p.name}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {getCategory(p.categorySlug)?.name} · {p.code}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
