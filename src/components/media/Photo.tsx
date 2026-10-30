import Image from "next/image";
import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-paper-deep", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
