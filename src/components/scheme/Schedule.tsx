import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { payouts, scheme } from "@/content/site";

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionLabel>Monthly winner payout</SectionLabel>
        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <h2 className="max-w-2xl font-heading text-4xl tracking-tight sm:text-5xl">
            The published credit for each month.
          </h2>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Every person contributes 10 BOT that month. One selected member is credited the payout for that month.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:hidden">
          {payouts.map((row) => (
            <li
              key={row.month}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-border bg-card px-4 py-4"
            >
              <span className="font-heading text-2xl text-brass">
                {String(row.month).padStart(2, "0")}
              </span>
              <span>
                <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Contribution
                </span>
                <span className="mt-1 block text-sm">{row.contribution}</span>
              </span>
              <span className="text-right">
                <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Payout
                </span>
                <span className="mt-1 block font-heading text-xl text-[#0c5c66]">{row.payout}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_40px_-28px_rgba(7,26,51,0.45)] sm:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Monthly contribution and winner payout for the ten-month MAKS Coin Scheme
            </caption>
            <thead className="bg-[#071426] text-white">
              <tr>
                <th scope="col" className="px-5 py-4 font-medium">
                  Month
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Contribution per person
                </th>
                <th scope="col" className="px-5 py-4 font-medium">
                  Winner payout credited
                </th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((row) => (
                <tr key={row.month} className="border-t border-border odd:bg-paper-deep/40">
                  <th scope="row" className="px-5 py-4 font-heading text-lg font-medium">
                    {String(row.month).padStart(2, "0")}
                  </th>
                  <td className="px-5 py-4">{row.contribution}</td>
                  <td className="px-5 py-4 font-heading text-xl text-[#0c5c66]">{row.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground">{scheme.afterLift}</p>
      </Container>
    </section>
  );
}
