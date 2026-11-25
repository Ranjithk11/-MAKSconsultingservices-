import Link from "next/link";
import { offerings } from "@/content/offerings";
import { studio } from "@/content/site";
import { cn } from "@/lib/utils";

export function BrandTitle({
  tone = "onDark",
  size = "display",
}: {
  tone?: "onDark" | "onLight";
  size?: "display" | "section";
}) {
  const Tag = size === "display" ? "h1" : "p";
  return (
    <Tag
      className={cn(
        "max-w-4xl text-balance font-heading tracking-[-0.03em]",
        size === "display" ? "text-4xl leading-[0.98] sm:text-6xl lg:text-7xl" : "text-2xl sm:text-3xl",
      )}
    >
      <span
        className={cn(
          "bg-clip-text text-transparent",
          tone === "onDark"
            ? "bg-gradient-to-r from-[#d8fbff] via-white to-[#7ee0ea]"
            : "bg-gradient-to-r from-[#071a33] via-[#0c6e78] to-[#071a33]",
        )}
      >
        {studio.scheme}
      </span>
    </Tag>
  );
}

export function ServiceSubline({
  current,
  tone = "onDark",
}: {
  current?: string;
  tone?: "onDark" | "onLight";
}) {
  return (
    <nav
      aria-label="Six services"
      className={cn(
        "mt-4 max-w-3xl text-sm leading-7 sm:text-base",
        tone === "onDark" ? "text-white/70" : "text-muted-foreground",
      )}
    >
      {offerings.map((offering, index) => {
        const active = offering.slug === current;
        return (
          <span key={offering.slug}>
            {index > 0 ? (
              <span aria-hidden="true" className="mx-1.5 opacity-50">
                ·
              </span>
            ) : null}
            <Link
              href={`/services/${offering.slug}`}
              aria-current={active ? "page" : undefined}
              className={cn(
                "underline-offset-4 hover:underline",
                active && (tone === "onDark" ? "font-medium text-[#d8fbff]" : "font-medium text-[#0c6e78]"),
              )}
            >
              {offering.name}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
