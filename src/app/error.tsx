"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="py-24">
      <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">Something failed</p>
      <h1 className="mt-4 font-heading text-5xl tracking-tight">The page did not come through.</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Try again. If it keeps failing, write to the desk and name the page.
      </p>
      <Button size="xl" className="mt-8" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}
