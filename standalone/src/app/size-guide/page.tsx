import { PageShell } from "@/components/Prose";
const rows = [["S", "[–]", "[–]"], ["M", "[–]", "[–]"], ["L", "[–]", "[–]"], ["XL", "[–]", "[–]"], ["XXL", "[–]", "[–]"]];
export default function SizeGuide() {
  return (
    <PageShell title="Size guide" intro="Measurements below are placeholders — add your real garment measurements before launch.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left">
          <caption className="sr-only">Garment measurements by size</caption>
          <thead><tr className="border-b border-line text-bone"><th className="py-3">Size</th><th>Chest (cm)</th><th>Length (cm)</th></tr></thead>
          <tbody>{rows.map((r) => <tr key={r[0]} className="border-b border-line">{r.map((c, i) => <td key={i} className="py-3">{c}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </PageShell>
  );
}
