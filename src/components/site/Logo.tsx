import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/patra-logo.png";

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
        className={cn(
          "grid h-12 w-14 shrink-0 place-items-center",
          tone === "light" && "rounded-md bg-background/95 p-1",
        )}
      >
        <img src={logoImg} alt="" className="h-full w-full object-contain" />
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
