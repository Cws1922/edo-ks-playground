import { Link } from 'react-router-dom';
import { KsText, KsTag } from '@byted-keystone/react';
import { Header } from '@/layouts/Header';

const DIRECTIONS = [
  {
    id: 'd1',
    title: 'D1 · Quick Scan',
    desc: 'Compact 48px rows · pure table · top banner education',
    tone: 'Density: Compact  /  Layout: Pure  /  Edu: Top banner',
    badge: 'info' as const,
  },
  {
    id: 'd2',
    title: 'D2 · Immersive Reading',
    desc: 'Spacious 72px rows · highlight cards + table · inline ⓘ hint',
    tone: 'Density: Spacious  /  Layout: Highlight cards  /  Edu: Inline ⓘ',
    badge: 'warning' as const,
  },
  {
    id: 'd3',
    title: 'D3 · KPI-led',
    desc: 'Medium 56px rows · KPI summary cards + table · first-visit modal',
    tone: 'Density: Medium  /  Layout: KPI cards  /  Edu: First-visit modal',
    badge: 'success' as const,
  },
];

export default function TransactionsIndex() {
  return (
    <div className="min-h-screen bg-neutral-surface2">
      <Header />
      <div className="max-w-[1100px] mx-auto py-12 px-6">
        <KsText variant="headlineMd" color="neutralHigh">
          Lo-fi Exploration · Transaction Page Redesign
        </KsText>
        <div className="mt-2">
          <KsText variant="bodyMd" color="neutralLow">
            3 design directions diverging on{' '}
            <strong>A) information density</strong>, <strong>B) presentation format</strong>, and{' '}
            <strong>D) education bar treatment</strong>. Open each in a separate route. All directions
            share the same Drawer / Failed Modal / Custom Columns Modal.
          </KsText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {DIRECTIONS.map((d) => (
            <Link
              key={d.id}
              to={`/transactions/${d.id}`}
              className="block rounded-md border border-neutral-fillLow bg-neutral-surface p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-2">
                <KsTag variant={d.badge} size="sm">{d.title.split(' · ')[0]}</KsTag>
              </div>
              <KsText variant="titleMd" color="neutralHigh">{d.title.split(' · ')[1]}</KsText>
              <div className="mt-2">
                <KsText variant="bodySm" color="neutralLow">{d.desc}</KsText>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-fillLow">
                <span className="tiktok-labelSm text-neutral-lowOnSurface">{d.tone}</span>
              </div>
              <div className="mt-3 tiktok-labelMd text-primary-onFill">Open →</div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-4 rounded-md bg-primary-surface1 border border-primary-fillLow">
          <div className="tiktok-labelLg text-neutral-highOnSurface mb-2">
            💡 Critique-ready interactions in each direction
          </div>
          <ul className="tiktok-bodySm text-neutral-onSurface space-y-1 list-disc pl-5">
            <li>Click <strong>View details</strong> on any row → opens the shared <strong>Drawer</strong> (Details · Related · Activity log tabs)</li>
            <li>Click the red <strong>[Recovery CTA]</strong> on the Failed row → opens the <strong>Failed Modal</strong></li>
            <li>Click <strong>Custom columns</strong> → opens the <strong>Modal + Transfer pattern</strong> (per PM reference)</li>
            <li>D3 auto-opens the <strong>First-visit Modal</strong> on load (close it to see the table)</li>
            <li>D1 has a dismissible <strong>top banner</strong> · D2 has an <strong>inline ⓘ icon</strong> next to the title</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
