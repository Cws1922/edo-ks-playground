import { useState } from 'react';
import {
  KsButton, KsText, KsTag, KsDrawer, KsInlineAlert, KsStatusMessage,
  KsTabs, KsTabItem, KsTooltip,
} from '@byted-keystone/react';
import {
  KsIconFilledWarning, KsIconFilledCheck,
  KsIconClock, KsIconHelp,
} from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabType = 'available' | 'earning' | 'notAvailable';
type NotAvailableState = 'used' | 'expired' | 'suspended';

interface NotAvailableCredit {
  id: string;
  name: string;
  state: NotAvailableState;
  amount: string;
  currency: string;
  stateDate: string;       // e.g., "Aug 15, 2025"
  usedAmount?: string;     // for 'used'
  remainingAtExpiry?: string; // for 'expired'
  suspendReason?: string;  // for 'suspended'
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const NOT_AVAILABLE_CREDITS: NotAvailableCredit[] = [
  {
    id: 'CRD-E01', name: 'New Advertiser Bonus Q4',   state: 'used',
    amount: '500.00', currency: 'USD', stateDate: 'Aug 15, 2025',
    usedAmount: '500.00',
  },
  {
    id: 'CRD-E02', name: 'Welcome Credit Pack',        state: 'used',
    amount: '200.00', currency: 'USD', stateDate: 'Mar 3, 2025',
    usedAmount: '200.00',
  },
  {
    id: 'CRD-E03', name: 'Q4 Growth Incentive (STI)', state: 'expired',
    amount: '300.00', currency: 'USD', stateDate: 'Dec 31, 2025',
    remainingAtExpiry: '300.00',
  },
  {
    id: 'CRD-E04', name: 'E-commerce Conditional',    state: 'expired',
    amount: '150.00', currency: 'USD', stateDate: 'Jan 20, 2026',
    remainingAtExpiry: '150.00',
  },
  {
    id: 'CRD-E05', name: 'Agency Partner Credit',     state: 'suspended',
    amount: '1,000.00', currency: 'USD', stateDate: 'Feb 5, 2026',
    suspendReason: 'Account policy review',
  },
];

const STATE_META: Record<NotAvailableState, { label: string; tagVariant: 'neutral' | 'warning' | 'error'; dateLabel: string }> = {
  used:      { label: 'Used',      tagVariant: 'neutral', dateLabel: 'Used on' },
  expired:   { label: 'Expired',   tagVariant: 'warning', dateLabel: 'Expired on' },
  suspended: { label: 'Suspended', tagVariant: 'error',   dateLabel: 'Suspended on' },
};

// ─── KV row helper ────────────────────────────────────────────────────────────

function KVRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-neutral-fillLow last:border-b-0 gap-4">
      <span className="tiktok-bodySm text-neutral-lowOnSurface shrink-0">{label}</span>
      <span className="tiktok-bodySm text-neutral-highOnSurface text-right">{value}</span>
    </div>
  );
}

// ─── Not-available drawer ─────────────────────────────────────────────────────

function NotAvailableDrawer({ credit, open, onClose }: {
  credit: NotAvailableCredit | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!credit) return null;
  const meta = STATE_META[credit.state];

  return (
    <KsDrawer
      open={open}
      title={credit.name}
      size="md"
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Scrollable content modules */}
      <div className="flex flex-col gap-6">

        {/* Credit overview — module */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="tiktok-headlineSm text-neutral-highOnSurface">{credit.amount} {credit.currency}</span>
            <KsTag variant={meta.tagVariant} size="sm">{meta.label}</KsTag>
          </div>
          <div className="tiktok-labelSm text-neutral-lowOnSurface">{meta.dateLabel} {credit.stateDate}</div>
        </div>

        {/* Details — module (status message below KV rows) */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="tiktok-labelMd text-neutral-lowOnSurface uppercase tracking-wide mb-2" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
            Details
          </div>
          <KVRow label="Credit ID"     value={credit.id} />
          <KVRow label="Total amount"  value={`${credit.amount} ${credit.currency}`} />
          {credit.state === 'used' && (
            <>
              <KVRow label="Amount used" value={`${credit.usedAmount ?? credit.amount} ${credit.currency}`} />
              <KVRow label="Used on"     value={credit.stateDate} />
            </>
          )}
          {credit.state === 'expired' && (
            <>
              <KVRow label="Expired on"       value={credit.stateDate} />
              <KVRow label="Unused at expiry" value={`${credit.remainingAtExpiry ?? '0.00'} ${credit.currency}`} />
            </>
          )}
          {credit.state === 'suspended' && (
            <>
              <KVRow label="Suspended on" value={credit.stateDate} />
              <KVRow label="Reason"       value={credit.suspendReason ?? '—'} />
            </>
          )}

          {/* Supplementary status info — below KV rows */}
          {credit.state === 'used' && (
            <div className="mt-4">
              <KsStatusMessage variant="neutral" richTextString="Credit fully used — deducted from billing" />
            </div>
          )}
          {credit.state === 'expired' && (
            <div className="mt-4">
              <KsStatusMessage variant="warning" richTextString="Credit expired — unused balance forfeited" />
            </div>
          )}
          {credit.state === 'suspended' && (
            <div className="mt-4">
              <KsStatusMessage variant="error" richTextString={`Suspended: ${credit.suspendReason}`} />
            </div>
          )}
        </div>
      </div>

      {/* Footer — drawer footer slot (same level as header), right-aligned, Close = primary */}
      {(credit.state === 'expired' || credit.state === 'suspended') && (
        <div slot="footer" className="flex justify-end gap-2 w-full">
          <KsButton variant="default" size="md">Contact support</KsButton>
          <KsButton variant="primary" size="md" onClick={onClose}>Close</KsButton>
        </div>
      )}
    </KsDrawer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function P7PromotionsA1() {
  const [activeTab, setActiveTab]           = useState<TabType>('notAvailable');
  const [notAvailableSubTab, setSubTab]     = useState<NotAvailableState>('used');
  const [selected, setSelected]             = useState<NotAvailableCredit | null>(null);
  const [drawerOpen, setDrawerOpen]         = useState(false);

  const grouped: Record<NotAvailableState, NotAvailableCredit[]> = {
    used:      NOT_AVAILABLE_CREDITS.filter(c => c.state === 'used'),
    expired:   NOT_AVAILABLE_CREDITS.filter(c => c.state === 'expired'),
    suspended: NOT_AVAILABLE_CREDITS.filter(c => c.state === 'suspended'),
  };

  function openCredit(credit: NotAvailableCredit) {
    setSelected(credit);
    setDrawerOpen(true);
  }

  return (
    <TTBCShell showSidebar>
      {/* Demo banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border-b border-warning-fill flex-wrap">
        <span className="tiktok-labelSm text-warning-highOnSurface font-medium">Direction A — Solution A1:</span>
        <span className="tiktok-labelSm text-warning-onSurface">
          "Not available" tab with 3 clearly differentiated states: Used / Expired / Suspended.
          Click any row to see the state-specific drawer (Direction A — status banners).
        </span>
      </div>

      <div className="px-6 py-5 bg-neutral-surface2 min-h-full">
        <div className="flex items-center justify-between mb-4">
          <KsText variant="headlineLg" color="neutralHigh">Promotions</KsText>
        </div>

        {/* Summary card — Total | divider (48px each side) | Free / Conditional / Assignable (72px gaps) */}
        <div className="bg-neutral-surface rounded-xl mb-4 flex items-stretch px-6">
          <div className="py-5 flex flex-col justify-center gap-1">
            <span className="tiktok-labelMd text-neutral-onSurface">Total available ad credit</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface">3,155.00</span>
              <span className="tiktok-bodyMd text-neutral-onSurface">USD</span>
            </div>
          </div>

          {/* Divider: 1px, Neutral/Fill-low, 24px vertical inset, 48px horizontal gap */}
          <div className="w-px bg-neutral-fillLow my-6 shrink-0 mx-[48px]" />

          {[
            { label: 'Free credits',        value: '700.00'   },
            { label: 'Conditional credits', value: '705.00'   },
            { label: 'Assignable credits',  value: '1,750.00' },
          ].map((t, i) => (
            <div key={t.label} className={`py-5 flex flex-col justify-center gap-1${i > 0 ? ' ml-[72px]' : ''}`}>
              <div className="flex items-center gap-1">
                <span className="tiktok-labelMd text-neutral-onSurface">{t.label}</span>
                <KsIconHelp size={13} className="text-neutral-lowOnSurface flex-shrink-0" />
              </div>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface">{t.value}</span>
                <span className="tiktok-bodyMd text-neutral-onSurface">USD</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main card */}
        <div className="bg-neutral-surface rounded-xl overflow-hidden">
          {/* Tab bar — KsTabs lite md */}
          <div className="px-5 pt-3 border-b border-neutral-fillLow">
            <KsTabs
              type="lite"
              size="md"
              activeTabId={activeTab}
              onActiveTabIdChange={(id: string) => setActiveTab(id as TabType)}
            >
              <KsTabItem tabId="available">
                <span slot="header">Available (6)</span>
              </KsTabItem>
              <KsTabItem tabId="earning">
                <span slot="header">Earning (4)</span>
              </KsTabItem>
              <KsTabItem tabId="notAvailable">
                <span slot="header">Not available (5)</span>
              </KsTabItem>
            </KsTabs>
          </div>

          {/* Available / Earning placeholders */}
          {(activeTab === 'available' || activeTab === 'earning') && (
            <div className="p-10 text-center">
              <div className="tiktok-bodyMd text-neutral-onSurface">
                See P6 for Available (Direction B+C) and Earning (Direction D) tab improvements.
              </div>
            </div>
          )}

          {/* ── Not available tab (Solution A1) ── */}
          {activeTab === 'notAvailable' && (
            <div className="flex flex-col">
              {/* Demo info */}
              <div className="px-5 py-4">
                <KsInlineAlert
                  variant="info"
                  content="Solution A1: Three states differentiated by color, label and drawer explanation — no new backend states required."
                />
              </div>

              {/* Sub-tab bar — no bottom border, tooltip icons per tab */}
              <div className="px-5">
                <KsTabs
                  type="sub-tab"
                  size="md"
                  activeTabId={notAvailableSubTab}
                  onActiveTabIdChange={(id: string) => setSubTab(id as NotAvailableState)}
                >
                  <KsTabItem tabId="used">
                    <span slot="header" className="inline-flex items-center gap-1">
                      Used ({grouped.used.length})
                      <KsTooltip content="Credits fully consumed — no balance remaining" placement="top">
                        <KsIconHelp size={12} className="text-neutral-lowOnSurface" />
                      </KsTooltip>
                    </span>
                  </KsTabItem>
                  <KsTabItem tabId="expired">
                    <span slot="header" className="inline-flex items-center gap-1">
                      Expired ({grouped.expired.length})
                      <KsTooltip content="Credits that reached expiry without being fully used" placement="top">
                        <KsIconHelp size={12} className="text-neutral-lowOnSurface" />
                      </KsTooltip>
                    </span>
                  </KsTabItem>
                  <KsTabItem tabId="suspended">
                    <span slot="header" className="inline-flex items-center gap-1">
                      Suspended ({grouped.suspended.length})
                      <KsTooltip content="Credits paused due to an account policy issue" placement="top">
                        <KsIconHelp size={12} className="text-neutral-lowOnSurface" />
                      </KsTooltip>
                    </span>
                  </KsTabItem>
                </KsTabs>
              </div>

              {/* Sub-tab content — table edge-to-edge (no horizontal padding) */}
              <div className="py-4">
                {notAvailableSubTab === 'used' && (
                  <CreditGroupTable credits={grouped.used} onRowClick={openCredit} />
                )}
                {notAvailableSubTab === 'expired' && (
                  <CreditGroupTable credits={grouped.expired} onRowClick={openCredit} />
                )}
                {notAvailableSubTab === 'suspended' && (
                  <CreditGroupTable credits={grouped.suspended} onRowClick={openCredit} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <NotAvailableDrawer credit={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </TTBCShell>
  );
}

// ─── Table helper ─────────────────────────────────────────────────────────────

function CreditGroupTable({
  credits,
  onRowClick,
}: {
  credits: NotAvailableCredit[];
  onRowClick: (c: NotAvailableCredit) => void;
}) {
  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm table-fixed" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className="bg-neutral-surface2">
            {([
              { label: 'Ad credit name', w: '30%' },
              { label: 'Status',         w: '12%' },
              { label: 'Amount',         w: '16%' },
              { label: 'Date',           w: '30%' },
              { label: 'Operation',      w: '12%' },
            ] as { label: string; w: string }[]).map(col => (
              <th key={col.label} style={{ width: col.w }}
                className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {credits.map((credit, idx) => {
            const meta = STATE_META[credit.state];
            return (
              <tr
                key={credit.id}
                className={`hover:bg-neutral-surface2 transition-colors ${idx < credits.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}
              >
                {/* Ad credit name */}
                <td className="px-4 py-3.5 align-top">
                  <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.name}</div>
                  <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">{credit.id}</div>
                </td>
                {/* Status */}
                <td className="px-4 py-3.5 align-top">
                  <KsTag variant={meta.tagVariant} size="sm">{meta.label}</KsTag>
                </td>
                {/* Amount */}
                <td className="px-4 py-3.5 align-top">
                  <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.amount}</div>
                  <div className="tiktok-labelSm text-neutral-lowOnSurface">{credit.currency}</div>
                </td>
                {/* Date */}
                <td className="px-4 py-3.5 align-top">
                  <span className="tiktok-bodySm text-neutral-onSurface">{meta.dateLabel} {credit.stateDate}</span>
                </td>
                {/* Operation */}
                <td className="px-4 py-3.5 align-top">
                  <button
                    onClick={() => onRowClick(credit)}
                    className="tiktok-labelSm text-primary-fill hover:underline whitespace-nowrap"
                  >
                    View details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
