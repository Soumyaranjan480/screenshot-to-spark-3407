import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Props = { tone?: "dark" | "light"; className?: string };

export function Logo({ tone = "dark", className }: Props) {
  return (
    <Link
      to="/"
      aria-label="PATRA JEWELLERS – Home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        aria-hidden="true"
        className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold"
      >
        <span className="font-display text-xl leading-none text-gold-gradient">P</span>
        <span className="absolute inset-1 rounded-full border border-gold/40" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-semibold tracking-[0.22em] sm:text-xl",
            tone === "dark" ? "text-foreground" : "text-on-dark",
          )}
        >
          PATRA
        </span>
        <span className="mt-1 text-[0.58rem] font-medium tracking-[0.42em] text-gold-deep">
          JEWELLERS
        </span>
      </span>
    </Link>
  );
}
