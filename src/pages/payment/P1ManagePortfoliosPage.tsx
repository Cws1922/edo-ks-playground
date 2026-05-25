import { useState } from 'react';
import { KsButton, KsText, KsTag, KsSelect, KsInput, KsPagination, KsInlineAlert } from '@byted-keystone/react';
import { KsIconSearch } from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';
import { AllocateCreditLineModal } from '@/components/payment/modals/AllocateCreditLineModal';

const PORTFOLIOS = [
  { id: '674632849385636483716', name: 'Payment Portfolio 1 name', type: 'Advanced' as const, linked: 26, users: 5, cashBalance: [{ amount: '100.00', currency: 'USD' }] },
  { id: '674632849385636483717', name: 'Payment Portfolio 2 name', type: 'Advanced' as const, linked: 26, users: 5, cashBalance: [{ amount: '100.00', currency: 'USD' }] },
  { id: '674632849385636483718', name: 'Payment Portfolio 3 name', type: 'Advanced' as const, linked: 26, users: 5, cashBalance: [{ amount: '100.00', currency: 'USD' }, { amount: '100.00', currency: 'JPY' }] },
  { id: '674632849385636483719', name: 'Payment Portfolio 4 name', type: 'Standard' as const, linked: 26, users: 5, cashBalance: [{ amount: '100.00', currency: 'USD' }, { amount: '100.00', currency: 'JPY' }] },
  { id: '674632849385636483720', name: 'Payment Portfolio 5 name', type: 'Standard' as const, linked: 26, users: 5, cashBalance: [{ amount: '100.00', currency: 'USD' }] },
];

const TYPE_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: 'Advanced', value: 'advanced' },
  { label: 'Standard', value: 'standard' },
];

const NOTICE_TEXT =
  "Payment Portfolios you don't have permission to view are not shown here, and their allocated credit lines are not included in the figures above.";

type Variant = 'none' | 'p1' | 'p1prime';

const VARIANT_LABELS: Record<Variant, string> = {
  none: 'Normal user',
  p1: 'P1 — inline text',
  'p1prime': "P1' — inline alert",
};

export default function P1ManagePortfoliosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>('p1');
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PORTFOLIOS.filter((p) => {
    const typeMatch = typeFilter === 'all' || p.type.toLowerCase() === typeFilter;
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <TTBCShell>
      <div className="px-6 py-6 bg-neutral-surface2 min-h-full">
        {/* ─── Demo toggle ─── */}
        <div className="mb-5 flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border border-warning-fill rounded-lg flex-wrap">
          <span className="tiktok-labelSm text-warning-highOnSurface mr-1">Demo:</span>
          {(['none', 'p1', 'p1prime'] as Variant[]).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-3 py-1 rounded tiktok-labelSm transition-colors ${
                variant === v
                  ? 'bg-warning-fill text-warning-onFill'
                  : 'bg-neutral-surface border border-neutral-fill text-neutral-highOnSurface hover:bg-neutral-fillLow'
              }`}
            >
              {VARIANT_LABELS[v]}
            </button>
          ))}
        </div>

        {/* ─── Page title ─── */}
        <div className="mb-5">
          <KsText variant="headlineLg" color="neutralHigh">Manage Payment Portfolios</KsText>
        </div>

        {/* ─── Top card ─── */}
        <div className="bg-neutral-surface rounded-xl mb-4">
          <div className="px-6 py-4">
            <span className="tiktok-titleLg text-neutral-highOnSurface">
              Business: &#123;Company name&#125;
            </span>
          </div>
          <div className="border-t border-neutral-fillLow" />
          <div className="px-6 py-6 flex gap-16 items-start">
            {/* Left: credit line */}
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <span className="tiktok-labelLg text-neutral-highOnSurface">
                Allocated credit line of this company
              </span>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>
                  6,000.00
                </span>
                <span className="tiktok-bodySm text-neutral-onSurface">/ 10,000</span>
                <span className="tiktok-bodySm text-neutral-onSurface ml-0.5">USD</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-1 w-full rounded-full bg-neutral-surface3">
                  <div className="h-full rounded-full bg-primary-fill" style={{ width: '60%' }} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary-fill inline-block" />
                    <span className="tiktok-labelSm text-neutral-onSurface">Allocated (60%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-neutral-surface3 border border-neutral-fillLow inline-block" />
                    <span className="tiktok-labelSm text-neutral-onSurface">Unallocated (40%)</span>
                  </div>
                </div>
              </div>
              <KsButton variant="default" onClick={() => setModalOpen(true)}>
                Allocate credit line
              </KsButton>
            </div>

            {/* Right: offline balance */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <span className="tiktok-labelLg text-neutral-highOnSurface">
                unallocated offline balance
              </span>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>
                  1,000.00
                </span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
              <div className="mt-2">
                <KsButton variant="default">Allocate balance</KsButton>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Payment Portfolios section — white card ─── */}
        <div className="bg-neutral-surface rounded-xl overflow-hidden">

          {/* Section header */}
          <div className="px-6 pt-5 pb-4">
            <KsText variant="titleLg" color="neutralHigh">Payment Portfolios</KsText>
            <p className="tiktok-labelSm text-neutral-onSurface mt-1">
              Payment Portfolios you have access to are listed.
              {/* P1: append inline text */}
              {variant === 'p1' && (
                <span className="ml-1">{NOTICE_TEXT}</span>
              )}
            </p>
          </div>

          {/* P1': show as info KsInlineAlert below divider */}
          {variant === 'p1prime' && (
            <div className="px-6 pt-4">
              <KsInlineAlert variant="info" closeable={false} content={NOTICE_TEXT} />
            </div>
          )}

          {/* Filter row */}
          <div className="px-6 py-4 flex items-center gap-2">
            <div className="max-w-[300px] w-full">
              <KsSelect
                options={TYPE_OPTIONS}
                value={typeFilter}
                placeholder="Portfolio type"
                onChange={(v) => setTypeFilter(String(v ?? 'all'))}
              />
            </div>
            <div className="max-w-[500px] w-full">
              <KsInput
                value={search}
                placeholder="Search by Portfolio name"
                onChange={(v) => setSearch(v ?? '')}
              >
                <KsIconSearch size={14} slot="prefix" />
              </KsInput>
            </div>
          </div>

          {/* Table — full-width, equal columns via table-fixed */}
          <table className="w-full text-sm table-fixed" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-neutral-surface2">
                {['Payment Portfolio', 'Type', 'Linked accounts', 'Users', 'Cash balance'].map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-t border-b border-neutral-fillLow"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-neutral-surface">
              {filtered.map((pa, idx) => (
                <tr
                  key={pa.id}
                  className={`hover:bg-neutral-surface2 transition-colors ${idx < filtered.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}
                >
                  <td className="px-4 py-4">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{pa.name}</div>
                    <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">ID:{pa.id}</div>
                  </td>
                  <td className="px-4 py-4">
                    <KsTag variant={pa.type === 'Advanced' ? 'info' : 'neutral'} size="sm">
                      {pa.type}
                    </KsTag>
                  </td>
                  <td className="px-4 py-4 tiktok-bodySm text-neutral-highOnSurface">
                    {pa.linked}
                  </td>
                  <td className="px-4 py-4 tiktok-bodySm text-neutral-highOnSurface">
                    {pa.users}
                  </td>
                  <td className="px-4 py-4">
                    {pa.cashBalance.map((b, i) => (
                      <div key={i} className="tiktok-bodySm text-neutral-highOnSurface">
                        {b.amount} {b.currency}
                      </div>
                    ))}
                    {pa.cashBalance.length > 1 && (
                      <button className="tiktok-labelSm text-primary-fill mt-1 hover:underline">
                        View {pa.cashBalance.length - 1} other{' '}
                        {pa.cashBalance.length - 1 > 1 ? 'currencies' : 'currency'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end px-6 py-4 border-t border-neutral-fillLow">
            <KsPagination total={PORTFOLIOS.length} defaultPageSize={10} />
          </div>
        </div>
      </div>

      <AllocateCreditLineModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </TTBCShell>
  );
}
