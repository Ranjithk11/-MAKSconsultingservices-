import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="MAKS Business Consulting and Services"
      width={639}
      height={313}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
