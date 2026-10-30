import { services } from "@/content/site";

export function Marquee() {
  const items = [...services, ...services];
  return (
    <div className="overflow-hidden border-b border-border" aria-hidden="true">
      <div className="maks-marquee flex w-max gap-10 py-4 pr-10">
        {items.map((service, index) => (
          <span
            key={`${service.slug}-${index}`}
            className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground"
          >
            {service.index} {service.name}
          </span>
        ))}
      </div>
    </div>
  );
}
