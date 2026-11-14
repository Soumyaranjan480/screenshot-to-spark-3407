import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const TABS = [
  { to: "/patra-owner-rates", label: "Today's Rates" },
  { to: "/patra-owner-designs", label: "Designs" },
] as const;

type Props = { user: User; title: string; wide?: boolean; children: ReactNode };

/** Header, tabs and owner check shared by the private owner pages. */
export function OwnerShell({ user, title, wide, children }: Props) {
  const navigate = useNavigate();
  const isOwner = useQuery({
    queryKey: ["is-owner", user.id],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      if (error) throw error;
      return Boolean(data);
    },
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  return (
    <section className="bg-cream py-10 md:py-16">
      <div className={cn("container-lux", wide ? "max-w-6xl" : "max-w-3xl")}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="eyebrow">Owner</p>
            <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">{title}</h1>
            <p className="mt-2 truncate text-sm text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <Button variant="outline-gold" size="touch" onClick={signOut}>
            <LogOut /> Sign out
          </Button>
        </div>

        <nav aria-label="Owner pages" className="mt-6 flex gap-2 border-b border-border">
          {TABS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className="-mb-px flex min-h-11 items-center border-b-2 border-transparent px-4 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "border-burgundy text-foreground" }}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">
          {isOwner.isPending ? (
            <Skeleton className="h-64 w-full" />
          ) : isOwner.data ? (
            children
          ) : (
            <div className="rounded-sm border border-border bg-ivory p-6 text-sm">
              This account can't make changes. Please sign in with the shop owner's email.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
