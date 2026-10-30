import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">404</p>
      <h1 className="mt-4 font-heading text-5xl tracking-tight">This page is not on the desk.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The address may be old. The five systems and the contact form are still where they were.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "xl" })} mt-8`}>
        Back to the studio
      </Link>
    </Container>
  );
}
