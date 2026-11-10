import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Ornament } from "./icons";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "dark",
  as: Tag = "h2",
  className,
}: Props) {
  const center = align === "center";
  return (
    <div className={cn("flex flex-col", center ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag
        className={cn(
          "mt-3 text-balance text-4xl sm:text-5xl lg:text-[3.4rem]",
          tone === "dark" ? "text-foreground" : "text-on-dark",
        )}
      >
        {title}
      </Tag>
      <Ornament className="mt-5 h-4 w-14 text-gold" />
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-base leading-relaxed",
            tone === "dark" ? "text-muted-foreground" : "text-on-dark-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
