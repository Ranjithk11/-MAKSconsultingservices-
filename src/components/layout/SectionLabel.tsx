export function SectionLabel({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-[0.72rem] uppercase tracking-[0.22em] text-brass">
      {index ? <span className="mr-3 text-foreground/70">{index}</span> : null}
      {children}
    </p>
  );
}
