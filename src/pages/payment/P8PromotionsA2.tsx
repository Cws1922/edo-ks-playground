import { useState } from 'react';
import {
  KsButton, KsText, KsTag, KsDrawer, KsInlineAlert,
  KsTabs, KsTabItem, KsStatusMessage,
} from '@byted-keystone/react';
import {
  KsIconFilledCheck, KsIconHelp,
} from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';

// ─── Types ────────────────────────────────────────────────────────────────────

type TabType = 'available' | 'earning' | 'notAvailable';
type NotAvailableState = 'pendingPayout' | 'used' | 'expired' | 'suspended';
type DemoState = 'withPending' | 'withoutPending';

interface NotAvailableCredit {
  id: string;
  name: string;
  state: NotAvailableState;
  amount: string;
  currency: string;
  stateDate: string;
  goalAmount?: string;        // for pendingPayout
  expectedPayoutDate?: string; // for pendingPayout
  usedAmount?: string;
  remainingAtExpiry?: string;
  suspendReason?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const ALL_CREDITS: NotAvailableCredit[] = [
  // Pending payout (NEW STATE — A2 only)
  {
    id: 'STI-P01', name: 'Spend & Earn Q2 2026',       state: 'pendingPayout',
    amount: '200.00', currency: 'USD',
    stateDate: 'May 10, 2026',
    goalAmount: '$1,000 USD',
    expectedPayoutDate: 'May 24, 2026',
  },
  {
    id: 'STI-P02', name: 'Growth Campaign Incentive',  state: 'pendingPayout',
    amount: '500.00', currency: 'USD',
    stateDate: 'May 18, 2026',
    goalAmount: '$5,000 USD',
    expectedPayoutDate: 'Jun 1, 2026',
  },
  // Used
  {
    id: 'CRD-E01', name: 'New Advertiser Bonus Q4',   state: 'used',
    amount: '500.00', currency: 'USD', stateDate: 'Aug 15, 2025', usedAmount: '500.00',
  },
  {
    id: 'CRD-E02', name: 'Welcome Credit Pack',        state: 'used',
    amount: '200.00', currency: 'USD', stateDate: 'Mar 3, 2025', usedAmount: '200.00',
  },
  // Expired
  {
    id: 'CRD-E03', name: 'Q4 Growth Incentive (STI)', state: 'expired',
    amount: '300.00', currency: 'USD', stateDate: 'Dec 31, 2025', remainingAtExpiry: '300.00',
  },
  // Suspended
  {
    id: 'CRD-E05', name: 'Agency Partner Credit',     state: 'suspended',
    amount: '1,000.00', currency: 'USD', stateDate: 'Feb 5, 2026', suspendReason: 'Account policy review',
  },
];

const STATE_META: Record<NotAvailableState, { label: string; tagVariant: 'success' | 'neutral' | 'warning' | 'error'; dateLabel: string }> = {
  pendingPayout: { label: 'Pending payout', tagVariant: 'success',  dateLabel: 'Goal reached on' },
  used:          { label: 'Used',           tagVariant: 'neutral',  dateLabel: 'Used on'         },
  expired:       { label: 'Expired',        tagVariant: 'warning',  dateLabel: 'Expired on'      },
  suspended:     { label: 'Suspended',      tagVariant: 'error',    dateLabel: 'Suspended on'    },
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

// ─── Drawer ───────────────────────────────────────────────────────────────────

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
      <div className="flex flex-col gap-6">

        {/* Credit overview — module */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="tiktok-headlineSm text-neutral-highOnSurface">{credit.amount} {credit.currency}</span>
            <KsTag variant={meta.tagVariant} size="sm">{meta.label}</KsTag>
          </div>
          <div className="tiktok-labelSm text-neutral-lowOnSurface">
            {credit.state === 'pendingPayout'
              ? `Goal completed on ${credit.stateDate}`
              : `${meta.dateLabel} ${credit.stateDate}`}
          </div>
        </div>

        {/* State status + context — module */}
        <div className="bg-neutral-surface rounded-lg p-6">
          {credit.state === 'pendingPayout' && (
            <>
              <KsStatusMessage variant="success" richTextString="Goal reached — credit being processed" />
              <div className="mt-3">
                <div className="tiktok-labelMd text-neutral-lowOnSurface uppercase tracking-wide mb-2" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>What happens next</div>
                <ul className="pl-4 space-y-1.5">
                  <li className="tiktok-labelSm text-neutral-onSurface list-disc">Our team is verifying your spend data</li>
                  <li className="tiktok-labelSm text-neutral-onSurface list-disc">Credit will appear in "Available" once issued</li>
                  <li className="tiktok-labelSm text-neutral-onSurface list-disc">You'll receive an email notification when credits are issued</li>
                </ul>
              </div>
            </>
          )}
          {credit.state === 'used' && (
            <KsStatusMessage variant="neutral" richTextString="Credit fully used — deducted from billing" />
          )}
          {credit.state === 'expired' && (
            <KsStatusMessage variant="warning" richTextString="Credit expired — unused balance forfeited" />
          )}
          {credit.state === 'suspended' && (
            <KsStatusMessage variant="error" richTextString={`Suspended: ${credit.suspendReason}`} />
          )}
        </div>

        {/* Details — module */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="tiktok-labelMd text-neutral-lowOnSurface uppercase tracking-wide mb-2" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
            Details
          </div>
          <KVRow label="Credit ID"    value={credit.id} />
          <KVRow label="Total amount" value={`${credit.amount} ${credit.currency}`} />
          {credit.state === 'pendingPayout' && (
            <>
              <KVRow label="Spend goal"         value={credit.goalAmount ?? '—'} />
              <KVRow label="Goal completed on"  value={credit.stateDate} />
              <KVRow label="Expected payout by" value={credit.expectedPayoutDate ?? '—'} />
            </>
          )}
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
        </div>

      </div>

      {/* Footer — pinned, right-aligned, no Close button */}
      {(credit.state === 'expired' || credit.state === 'suspended' || credit.state === 'pendingPayout') && (
        <div slot="footer" className="flex justify-end w-full">
          <KsButton variant="primary" size="md">Contact support</KsButton>
        </div>
      )}
    </KsDrawer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function P8PromotionsA2() {
  const [activeTab, setActiveTab]   = useState<TabType>('notAvailable');
  const [demoState, setDemoState]   = useState<DemoState>('withPending');
  const [selected, setSelected]     = useState<NotAvailableCredit | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const visibleCredits = demoState === 'withPending'
    ? ALL_CREDITS
    : ALL_CREDITS.filter(c => c.state !== 'pendingPayout');

  const pendingCredits  = visibleCredits.filter(c => c.state === 'pendingPayout');
  const otherCredits    = visibleCredits.filter(c => c.state !== 'pendingPayout');
  const totalCount      = visibleCredits.length;

  function openCredit(credit: NotAvailableCredit) {
    setSelected(credit);
    setDrawerOpen(true);
  }

  return (
    <TTBCShell showSidebar>
      {/* Demo banner */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border-b border-warning-fill flex-wrap">
        <span className="tiktok-labelSm text-warning-highOnSurface font-medium">Direction A — Solution A2:</span>
        {([
          { id: 'withPending',    label: '"Pending payout" state visible (A2)' },
          { id: 'withoutPending', label: 'Without pending payout (A1 baseline)' },
        ] as { id: DemoState; label: string }[]).map(s => (
          <button
            key={s.id}
            onClick={() => setDemoState(s.id)}
            className={`px-3 py-1 rounded tiktok-labelSm transition-colors ${
              demoState === s.id
                ? 'bg-warning-fill text-warning-onFill'
                : 'bg-neutral-surface border border-neutral-fill text-neutral-highOnSurface hover:bg-neutral-fillLow'
            }`}
          >
            {s.label}
          </button>
        ))}
        <span className="tiktok-labelSm text-warning-onSurface ml-2">
          · New 4th state: goal reached but credit pending issuance · Click a pending row for celebratory drawer
        </span>
      </div>

      <div className="px-6 py-5 bg-neutral-surface2 min-h-full">
        <div className="flex items-center justify-between mb-4">
          <KsText variant="headlineLg" color="neutralHigh">Promotions</KsText>
        </div>

        {/* Summary card — matches P6/P7 layout */}
        <div className="bg-neutral-surface rounded-xl mb-4 flex items-stretch px-6">
          <div className="py-5 flex flex-col justify-center gap-1">
            <span className="tiktok-labelMd text-neutral-onSurface">Total available ad credit</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface">3,155.00</span>
              <span className="tiktok-bodyMd text-neutral-onSurface">USD</span>
            </div>
          </div>
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
          {/* Tab bar (KsTabs lite md) */}
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
                <span slot="header">Not available ({totalCount})</span>
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

          {/* ── Not available tab (Solution A2) ── */}
          {activeTab === 'notAvailable' && (
            <div className="flex flex-col">
              <div className="px-5 py-4">
                <KsInlineAlert
                  variant="info"
                  content={
                    demoState === 'withPending'
                      ? 'Solution A2: Adds a 4th state "Pending payout" for credits where the spend goal is reached but issuance is in progress — requires new backend state.'
                      : 'A1 baseline view: same 3 states (Used / Expired / Suspended). Toggle above to see the A2 difference.'
                  }
                />
              </div>

              {/* Single unified table — pending payout rows first, edge-to-edge */}
              <div className="py-4">
                <table className="w-full text-sm table-fixed" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr className="bg-neutral-surface2">
                      {([
                        { label: 'Ad credit name', w: '28%' },
                        { label: 'Status',         w: '13%' },
                        { label: 'Amount',         w: '13%' },
                        { label: 'Date',           w: '36%' },
                        { label: 'Actions',        w: '10%' },
                      ] as { label: string; w: string }[]).map(col => (
                        <th key={col.label} style={{ width: col.w }}
                          className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...pendingCredits, ...otherCredits].map((credit, idx, arr) => {
                      const meta = STATE_META[credit.state];
                      return (
                        <tr
                          key={credit.id}
                          className={`hover:bg-neutral-surface2 transition-colors ${idx < arr.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}
                        >
                          <td className="px-4 py-3.5 align-top">
                            <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.name}</div>
                            <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">{credit.id}</div>
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            <KsTag variant={meta.tagVariant} size="sm">{meta.label}</KsTag>
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.amount}</div>
                            <div className="tiktok-labelSm text-neutral-lowOnSurface">{credit.currency}</div>
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            {credit.state === 'pendingPayout' ? (
                              <>
                                <div className="tiktok-bodySm text-neutral-onSurface">Goal reached: {credit.stateDate}</div>
                                <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">Expected by: {credit.expectedPayoutDate}</div>
                              </>
                            ) : (
                              <div className="tiktok-bodySm text-neutral-onSurface">{meta.dateLabel} {credit.stateDate}</div>
                            )}
                          </td>
                          <td className="px-4 py-3.5 align-top">
                            <button
                              onClick={() => openCredit(credit)}
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
            </div>
          )}
        </div>
      </div>

      <NotAvailableDrawer credit={selected} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </TTBCShell>
  );
}
