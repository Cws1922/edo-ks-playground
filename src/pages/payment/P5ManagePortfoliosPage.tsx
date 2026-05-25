import { useState } from 'react';
import { KsButton, KsText, KsTag, KsPagination } from '@byted-keystone/react';
import { KsIconSearch, KsIconHelp } from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';
import { CreatePortfolioDrawer } from '@/components/payment/drawers/CreatePortfolioDrawer';

const EXISTING_NAME = '2025 Winter Campaign';

const PORTFOLIOS = [
  { id: '674632849385636483701', name: EXISTING_NAME, type: 'Advanced' as const, linked: 26, users: 5, cashBalance: '100.00 USD', creditLine: '2,000.00 USD' },
  { id: '674632849385636483702', name: 'Payment Portfolio 2 name', type: 'Advanced' as const, linked: 26, users: 5, cashBalance: '100.00 USD', creditLine: '2,000.00 USD' },
  { id: '674632849385636483703', name: 'Payment Portfolio 3 name', type: 'Advanced' as const, linked: 26, users: 5, cashBalance: '100.00 USD', creditLine: '2,000.00 USD' },
  { id: '674632849385636483704', name: 'Payment Portfolio 4 name', type: 'Standard' as const, linked: 26, users: 5, cashBalance: '100.00 USD', creditLine: '2,000.00 USD' },
  { id: '674632849385636483705', name: 'Payment Portfolio 5 name', type: 'Standard' as const, linked: 26, users: 5, cashBalance: '100.00 USD', creditLine: '2,000.00 USD' },
];

export default function P5ManagePortfoliosPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paName, setPaName] = useState(EXISTING_NAME);
  const [showError, setShowError] = useState(false);

  function handleConfirm() {
    if (paName.trim() === EXISTING_NAME) {
      setShowError(true);
    } else {
      setDrawerOpen(false);
    }
  }

  function handleNameChange(v: string) {
    setPaName(v);
    if (showError) setShowError(false);
  }

  function handleReset() {
    setPaName(EXISTING_NAME);
    setShowError(false);
    setDrawerOpen(false);
  }

  return (
    <TTBCShell>
      {/* Demo toggle */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border-b border-warning-fill flex-wrap">
        <span className="tiktok-labelSm text-warning-highOnSurface mr-1">Demo:</span>
        <span className="tiktok-labelSm text-warning-onSurface">
          Input pre-filled with existing name "{EXISTING_NAME}". Click "+ Create new Portfolio" → Confirm to trigger error.
        </span>
        <button
          onClick={handleReset}
          className="ml-2 px-3 py-1 rounded tiktok-labelSm bg-neutral-surface border border-neutral-fill text-neutral-highOnSurface hover:bg-neutral-fillLow transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="px-6 py-6 bg-neutral-surface2 min-h-full">
        {/* Page title */}
        <div className="mb-5">
          <KsText variant="headlineLg" color="neutralHigh">Manage Payment Portfolios</KsText>
        </div>

        {/* Top card — company credit */}
        <div className="bg-neutral-surface border border-neutral-fillLow rounded-xl mb-4">
          <div className="px-6 py-4 border-b border-neutral-fillLow">
            <span className="tiktok-titleLg text-neutral-highOnSurface">Business: &#123;Company name&#125;</span>
          </div>
          <div className="px-6 py-6 flex gap-8 items-start">
            {/* Credit line */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="tiktok-labelMd text-neutral-onSurface">Allocated credit line of this company</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>6,000.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">/ 10,000 USD</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-neutral-surface3">
                <div className="h-full rounded-full bg-primary-fill" style={{ width: '60%' }} />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary-fill inline-block" />
                  <span className="tiktok-labelSm text-neutral-onSurface">Allocated (60%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-surface3 inline-block" />
                  <span className="tiktok-labelSm text-neutral-onSurface">Unallocated (40%)</span>
                </div>
              </div>
              <div>
                <KsButton variant="default" size="md">Allocate credit line</KsButton>
              </div>
            </div>
            {/* Offline balance */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="tiktok-labelMd text-neutral-onSurface">Unallocated offline balance</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>1,000.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
              <div>
                <KsButton variant="default" size="md">Allocate balance</KsButton>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolios section */}
        <div className="bg-neutral-surface border border-neutral-fillLow rounded-xl overflow-hidden">
          {/* Section header */}
          <div className="px-6 pt-5 pb-4">
            <div className="flex items-start justify-between mb-1">
              <KsText variant="titleLg" color="neutralHigh">Payment Portfolios</KsText>
              <KsButton variant="primary" size="md" onClick={() => setDrawerOpen(true)}>
                + Create new Portfolio
              </KsButton>
            </div>
            <p className="tiktok-labelSm text-neutral-onSurface">
              Following are ad Payment Portfolios which you have permission to access under this business. Portfolios you do not have permission to access have been hidden.
            </p>
          </div>

          {/* Filters */}
          <div className="px-6 py-3 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="tiktok-labelSm text-neutral-onSurface">Portfolio type</span>
              <button className="flex items-center gap-1 px-3 py-1.5 border border-neutral-fillLow rounded tiktok-labelSm text-neutral-highOnSurface bg-neutral-surface hover:bg-neutral-surface2">
                All <span className="text-neutral-lowOnSurface">▾</span>
              </button>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-neutral-fillLow rounded tiktok-labelSm text-neutral-highOnSurface bg-neutral-surface hover:bg-neutral-surface2">
              Portfolio name <span className="text-neutral-lowOnSurface">▾</span>
            </button>
            <div className="flex items-center border border-neutral-fillLow rounded h-8 px-2 gap-1 bg-neutral-surface w-48">
              <KsIconSearch size={13} className="text-neutral-lowOnSurface flex-shrink-0" />
              <input
                placeholder="Search by Portfolio name"
                className="flex-1 min-w-0 outline-none bg-transparent tiktok-labelSm text-neutral-highOnSurface placeholder:text-neutral-lowOnSurface"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-neutral-surface2">
                <th className="text-left px-6 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Payment Portfolio</th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">
                  <span className="flex items-center gap-1">Type <KsIconHelp size={13} className="text-neutral-lowOnSurface" /></span>
                </th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Linked accounts</th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Users</th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Cash balance</th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Credit line/balance</th>
                <th className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">Action</th>
              </tr>
            </thead>
            <tbody className="bg-neutral-surface">
              {PORTFOLIOS.map((p, idx) => (
                <tr key={p.id} className={`hover:bg-neutral-surface2 transition-colors ${idx < PORTFOLIOS.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}>
                  <td className="px-6 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{p.name}</div>
                    <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">ID: {p.id}</div>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <KsTag variant={p.type === 'Advanced' ? 'info' : 'neutral'} size="md">{p.type}</KsTag>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="tiktok-bodySm text-neutral-highOnSurface">{p.linked}</span>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="tiktok-bodySm text-neutral-highOnSurface">{p.users}</span>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <span className="tiktok-bodySm text-neutral-highOnSurface">{p.cashBalance}</span>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{p.creditLine}</div>
                    <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">% of total: 20%</div>
                  </td>
                  <td className="px-3 py-4 align-top">
                    <button className="tiktok-labelSm text-primary-fill hover:underline">View details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-end border-t border-neutral-fillLow">
            <KsPagination total={48} pageSize={10} current={1} />
          </div>
        </div>
      </div>

      <CreatePortfolioDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        paName={paName}
        onPaNameChange={handleNameChange}
        showError={showError}
        onConfirm={handleConfirm}
      />
    </TTBCShell>
  );
}
