import { useState } from 'react';
import {
  KsButton, KsText, KsTag, KsDrawer, KsInlineAlert, KsProgress,
  KsTabs, KsTabItem, KsStatusMessage,
} from '@byted-keystone/react';
import {
  KsIconCoupon, KsIconFilledCheck,
  KsIconClock, KsIconHelp,
} from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';

// ─── Types ───────────────────────────────────────────────────────────────────

type CreditType = 'free' | 'assignable' | 'conditional';
type AssignState = 'assigned' | 'unassigned';
type TabType = 'available' | 'earning' | 'notAvailable';
type DemoState = 'oneUnassigned' | 'allAssigned' | 'bothUnassigned';

interface Condition { label: string; met: boolean }

interface AvailableCredit {
  id: string;
  name: string;
  source: string;
  type: CreditType;
  totalAmount: number;
  usedAmount: number;
  currency: string;
  redeemedDate: string;   // e.g. "2026-03-01 00:00"
  startDate: string;
  endDate: string;
  daysLeft: number;
  repaymentClause?: string;
  assignState?: AssignState;
  assignedCount?: number;
  assignedCampaigns?: string[];
  conditions?: Condition[];
}

interface EarningCredit {
  id: string;
  name: string;
  goalAmount: number;
  spentAmount: number;
  creditReward: string;
  currency: string;
  endDate: string;
  daysLeft: number;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const BASE_CREDITS: AvailableCredit[] = [
  {
    id: 'CRD-001', name: 'New Advertiser Bonus', source: 'Welcome offer',
    type: 'free', totalAmount: 500, usedAmount: 0, currency: 'USD',
    redeemedDate: '2026-03-01 00:00',
    startDate: 'Mar 1, 2026', endDate: 'Aug 1, 2026', daysLeft: 71,
  },
  {
    id: 'CRD-002', name: 'Q2 Growth Incentive', source: 'Q2 2026 Deal #D-2680',
    type: 'free', totalAmount: 200, usedAmount: 0, currency: 'USD',
    redeemedDate: '2026-04-01 09:30',
    startDate: 'Apr 1, 2026', endDate: 'Jun 30, 2026', daysLeft: 39,
  },
  {
    id: 'CRD-003', name: 'Agency Partner Credit', source: 'Agency deal #D-1947',
    type: 'assignable', totalAmount: 1000, usedAmount: 0, currency: 'USD',
    redeemedDate: '2026-01-05 00:00',
    startDate: 'Jan 5, 2026', endDate: 'Sep 30, 2026', daysLeft: 131,
    repaymentClause: 'Repayment if spend < $2,000 by Sep 30',
    assignState: 'assigned', assignedCount: 3,
    assignedCampaigns: ['The greatest showman', 'Ad account 2', 'Ad account 3'],
  },
  {
    id: 'CRD-004', name: 'Q1 Performance Reward', source: 'Q1 2026 Deal #D-2541',
    type: 'assignable', totalAmount: 750, usedAmount: 0, currency: 'USD',
    redeemedDate: '2026-02-01 00:00',
    startDate: 'Feb 1, 2026', endDate: 'Jul 15, 2026', daysLeft: 54,
    assignState: 'unassigned', assignedCount: 0,
  },
  {
    id: 'CRD-005', name: 'E-commerce Booster', source: 'E-comm deal #D-3018',
    type: 'conditional', totalAmount: 300, usedAmount: 0, currency: 'USD',
    redeemedDate: '2026-03-15 00:00',
    startDate: 'Mar 15, 2026', endDate: 'Jul 31, 2026', daysLeft: 70,
    repaymentClause: 'Repayment if conditions unmet at expiry',
    conditions: [
      { label: 'Cash balance ≥ $100 USD', met: true },
      { label: 'Product type: E-commerce / Shopping', met: false },
      { label: 'Region: US, UK, CA', met: true },
    ],
  },
  {
    id: 'CRD-006', name: 'Video Ads Incentive', source: 'Video deal #D-2899',
    type: 'conditional', totalAmount: 450, usedAmount: 45, currency: 'USD',
    redeemedDate: '2026-04-01 00:00',
    startDate: 'Apr 1, 2026', endDate: 'Jun 15, 2026', daysLeft: 24,
    conditions: [
      { label: 'Cash balance ≥ $500 USD', met: true },
      { label: 'Product type: In-Feed Video', met: true },
      { label: 'Region: US only', met: true },
    ],
  },
];

const EARNING_CREDITS: EarningCredit[] = [
  { id: 'STI-001', name: 'Spend & Earn Q2 2026',        goalAmount: 1000, spentAmount: 920,  creditReward: '200.00', currency: 'USD', endDate: 'May 30, 2026', daysLeft: 8  },
  { id: 'STI-002', name: 'Growth Campaign Incentive',    goalAmount: 5000, spentAmount: 3400, creditReward: '500.00', currency: 'USD', endDate: 'Jun 13, 2026', daysLeft: 22 },
  { id: 'STI-003', name: 'New Format Bonus',             goalAmount: 2000, spentAmount: 900,  creditReward: '300.00', currency: 'USD', endDate: 'Jun 26, 2026', daysLeft: 35 },
  { id: 'STI-004', name: 'Performance Plus',             goalAmount: 3000, spentAmount: 750,  creditReward: '400.00', currency: 'USD', endDate: 'Jul 8, 2026',  daysLeft: 47 },
];

const DEMO_LABELS: Record<DemoState, string> = {
  oneUnassigned:  'One assignable unassigned (B: warning shown)',
  allAssigned:    'All assignable assigned (B: all clear)',
  bothUnassigned: 'Both unassigned (B: 2 warnings)',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function TypeBadge({ type }: { type: CreditType }) {
  if (type === 'free')        return <KsTag variant="info"    size="sm">Free</KsTag>;
  if (type === 'assignable')  return <KsTag variant="new"     size="sm">Assignable</KsTag>;
  return                             <KsTag variant="neutral" size="sm">Conditional</KsTag>;
}

function KVRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-neutral-fillLow last:border-b-0 gap-4">
      <span className="tiktok-bodySm text-neutral-lowOnSurface shrink-0">{label}</span>
      <span className="tiktok-bodySm text-neutral-highOnSurface text-right">{value}</span>
    </div>
  );
}

// ─── Drawer (Direction C) ─────────────────────────────────────────────────────

function CreditDrawer({ credit, open, onClose }: {
  credit: AvailableCredit | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!credit) return null;

  const available = credit.totalAmount - credit.usedAmount;
  const isUnassigned  = credit.type === 'assignable' && credit.assignState === 'unassigned';
  const isAssigned    = credit.type === 'assignable' && credit.assignState === 'assigned';
  const unmetCount    = credit.conditions?.filter(c => !c.met).length ?? 0;

  return (
    <KsDrawer
      open={open}
      size="md"
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Custom header — matches native drawer__header styles, adds TypeBadge next to title */}
      <div slot="header" className="flex items-center gap-2 py-5 px-6 tiktok-headlineSm text-neutral-highOnSurface">
        <span>{credit.name}</span>
        <TypeBadge type={credit.type} />
      </div>

      <div className="flex flex-col gap-6">

        {/* Credit overview — module (alerts merged here, no standalone banner module) */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="tiktok-headlineSm text-neutral-highOnSurface">{fmt(available)} {credit.currency}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <KsIconClock size={13} className={credit.daysLeft <= 30 ? 'text-warning-onSurface' : 'text-neutral-lowOnSurface'} />
            <span className={`tiktok-labelSm ${credit.daysLeft <= 30 ? 'text-warning-onSurface' : 'text-neutral-lowOnSurface'}`}>
              Valid until {credit.endDate} · {credit.daysLeft} days left
            </span>
          </div>
          {isUnassigned && (
            <div className="mt-4">
              <KsInlineAlert
                variant="warning"
                title="Action required — credit not activated"
                content="This credit will not spend until you assign it to campaigns."
              />
            </div>
          )}
          {unmetCount > 0 && (
            <div className="mt-4">
              <KsInlineAlert
                variant="info"
                title={`${unmetCount} condition${unmetCount > 1 ? 's' : ''} not met`}
                content="This credit will only apply once all conditions are satisfied."
              />
            </div>
          )}
        </div>

        {/* Details — module */}
        <div className="bg-neutral-surface rounded-lg p-6">
          <div className="tiktok-labelMd text-neutral-lowOnSurface uppercase tracking-wide mb-2" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
            Details
          </div>
          <KVRow label="Credit ID"      value={credit.id} />
          <KVRow label="Source"         value={credit.source} />
          <KVRow label="Total amount"   value={`${fmt(credit.totalAmount)} ${credit.currency}`} />
          <KVRow label="Used amount"    value={`${fmt(credit.usedAmount)} ${credit.currency}`} />
          <KVRow label="Valid period"   value={`${credit.startDate} – ${credit.endDate}`} />
          {credit.repaymentClause && (
            <KVRow label="Repayment"    value={credit.repaymentClause} />
          )}
        </div>

        {/* How to use — module */}
        <div className="bg-primary-surface1 rounded-lg p-6">
          <div className="tiktok-labelMd text-neutral-lowOnSurface uppercase tracking-wide mb-3" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
            How to use
          </div>

          {credit.type === 'free' && (
            <>
              <KsStatusMessage variant="success" richTextString="Auto-applied — no action needed" />
              <ul className="pl-4 mt-3 space-y-1.5">
                <li className="tiktok-labelSm text-neutral-onSurface list-disc">Applied before any other credit or payment source</li>
                <li className="tiktok-labelSm text-neutral-onSurface list-disc">Deducted automatically at billing across all campaigns</li>
              </ul>
            </>
          )}

          {isUnassigned && (
            <>
              <div className="tiktok-labelSm text-neutral-highOnSurface font-medium mb-1.5">Steps to activate:</div>
              <ol className="pl-4 space-y-1">
                <li className="tiktok-labelSm text-neutral-onSurface list-decimal">Click "Assign to campaigns" below</li>
                <li className="tiktok-labelSm text-neutral-onSurface list-decimal">Select one or more campaigns</li>
                <li className="tiktok-labelSm text-neutral-onSurface list-decimal">Credit applies to billing for those campaigns</li>
              </ol>
            </>
          )}

          {isAssigned && (
            <>
              <KsStatusMessage
                variant="success"
                richTextString={`Assigned to ${credit.assignedCount} campaigns`}
              />
              <ul className="pl-4 mt-2 space-y-1">
                {(credit.assignedCampaigns ?? []).map(c => (
                  <li key={c} className="tiktok-labelSm text-neutral-onSurface list-disc">{c}</li>
                ))}
              </ul>
            </>
          )}

          {credit.type === 'conditional' && credit.conditions && (
            <>
              <div className="flex flex-col gap-2">
                {credit.conditions.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {c.met
                      ? <KsIconFilledCheck size={14} className="text-success-onSurface flex-shrink-0" />
                      : <span className="inline-flex items-center justify-center shrink-0 rounded-full bg-warning-fill text-warning-onFill" style={{ width: 14, height: 14, fontSize: 9, fontWeight: 700, lineHeight: 1 }}>!</span>
                    }
                    <span className="tiktok-bodySm flex-1 text-neutral-highOnSurface">{c.label}</span>
                  </div>
                ))}
              </div>
              <button className="tiktok-labelSm text-primary-fill hover:underline mt-3 block">
                Learn more about conditions →
              </button>
            </>
          )}
        </div>

      </div>

      {/* Footer — pinned at drawer-header level, right-aligned, no Close button */}
      {(isUnassigned || isAssigned) && (
        <div slot="footer" className="flex justify-end w-full">
          {isUnassigned && <KsButton variant="primary" size="md">Assign to campaigns</KsButton>}
          {isAssigned   && <KsButton variant="primary" size="md">Manage assignments</KsButton>}
        </div>
      )}
    </KsDrawer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function P6PromotionsPageBCD() {
  const [activeTab, setActiveTab]     = useState<TabType>('available');
  const [demoState, setDemoState]     = useState<DemoState>('oneUnassigned');
  const [selectedCredit, setSelected] = useState<AvailableCredit | null>(null);
  const [drawerOpen, setDrawerOpen]   = useState(false);

  const credits = BASE_CREDITS.map(c => {
    if (c.type !== 'assignable') return c;
    if (demoState === 'allAssigned')    return { ...c, assignState: 'assigned'   as AssignState, assignedCount: 3 };
    if (demoState === 'bothUnassigned') return { ...c, assignState: 'unassigned' as AssignState, assignedCount: 0 };
    return c;
  });

  const unassignedCount = credits.filter(c => c.type === 'assignable' && c.assignState === 'unassigned').length;

  function openCredit(credit: AvailableCredit) {
    setSelected(credit);
    setDrawerOpen(true);
  }

  return (
    <TTBCShell showSidebar>
      {/* Demo toggle */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border-b border-warning-fill flex-wrap">
        <span className="tiktok-labelSm text-warning-highOnSurface font-medium">Design directions B + C + D:</span>
        {(Object.keys(DEMO_LABELS) as DemoState[]).map(s => (
          <button
            key={s}
            onClick={() => setDemoState(s)}
            className={`px-3 py-1 rounded tiktok-labelSm transition-colors ${
              demoState === s
                ? 'bg-warning-fill text-warning-onFill'
                : 'bg-neutral-surface border border-neutral-fill text-neutral-highOnSurface hover:bg-neutral-fillLow'
            }`}
          >
            {DEMO_LABELS[s]}
          </button>
        ))}
        <span className="tiktok-labelSm text-warning-onSurface ml-1">
          · B: action status col · C: click any row · D: Earning tab
        </span>
      </div>

      <div className="px-6 py-5 bg-neutral-surface2 min-h-full">
        <div className="flex items-center justify-between mb-4">
          <KsText variant="headlineLg" color="neutralHigh">Promotions</KsText>
        </div>

        {/* Summary card — Total | divider (48px each side) | Free / Conditional / Assignable (72px gaps) */}
        <div className="bg-neutral-surface rounded-xl mb-4 flex items-stretch px-6">
          {/* Total available — content-width */}
          <div className="py-5 flex flex-col justify-center gap-1">
            <span className="tiktok-labelMd text-neutral-onSurface">Total available ad credit</span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface">3,155.00</span>
              <span className="tiktok-bodyMd text-neutral-onSurface">USD</span>
            </div>
          </div>

          {/* Divider: 1px, Neutral/Fill-low, 24px vertical inset, 48px horizontal gap */}
          <div className="w-px bg-neutral-fillLow my-6 shrink-0 mx-[48px]" />

          {/* Per-type breakdown: content-width, 72px gaps between adjacent fields */}
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

          {/* ── Tab bar (KsTabs lite md) ── */}
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

          {/* ── Available tab (Direction B + C) ── */}
          {activeTab === 'available' && (
            <>
              {unassignedCount > 0 && (
                <div className="px-5 pt-4">
                  <KsInlineAlert
                    variant="warning"
                    title={`${unassignedCount} assignable credit${unassignedCount > 1 ? 's' : ''} not yet assigned`}
                    content="These credits won't spend until assigned to campaigns. Click a row to take action."
                  />
                </div>
              )}

              <table className="w-full text-sm mt-3" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr className="bg-neutral-surface2">
                    {([
                      { label: 'Ad credit name',      w: '17%' },
                      { label: 'Credit type',          w: '9%'  },
                      { label: 'Discount / Amount',    w: '11%', right: true },
                      { label: 'Usage requirements',   w: '16%', help: true },
                      { label: 'Redeem date',          w: '12%', help: true },
                      { label: 'Validity period',      w: '14%', help: true },
                      { label: 'Status',               w: '13%' },
                      { label: 'Operation',            w: '8%'  },
                    ] as { label: string; w: string; right?: boolean; help?: boolean }[]).map(col => (
                      <th key={col.label} style={{ width: col.w }}
                        className={`px-4 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow ${col.right ? 'text-right' : 'text-left'}`}>
                        <span className="inline-flex items-center gap-1">
                          {col.label}
                          {col.help && <KsIconHelp size={13} className="text-neutral-lowOnSurface flex-shrink-0" />}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {credits.map((credit, idx) => {
                    const available    = credit.totalAmount - credit.usedAmount;
                    const isUnassigned = credit.type === 'assignable' && credit.assignState === 'unassigned';
                    const unmetCount   = credit.conditions?.filter(c => !c.met).length ?? 0;

                    const usageReq = credit.conditions
                      ? credit.conditions.map(c => c.label).join(' · ')
                      : null;

                    return (
                      <tr
                        key={credit.id}
                        className={`hover:bg-neutral-surface2 transition-colors ${idx < credits.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}
                      >
                        {/* Ad credit name */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.name}</div>
                          <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">{credit.id}</div>
                          <div className="tiktok-labelSm text-neutral-lowOnSurface">{credit.source}</div>
                        </td>
                        {/* Credit type */}
                        <td className="px-4 py-3.5 align-top">
                          <TypeBadge type={credit.type} />
                        </td>
                        {/* Discount / Amount */}
                        <td className="px-4 py-3.5 align-top text-right">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">{fmt(credit.totalAmount)}</div>
                          <div className="tiktok-labelSm text-neutral-lowOnSurface">{credit.currency}</div>
                        </td>
                        {/* Usage requirements */}
                        <td className="px-4 py-3.5 align-top">
                          {usageReq
                            ? <div className="tiktok-bodySm text-neutral-highOnSurface leading-relaxed">{usageReq}</div>
                            : <span className="tiktok-bodySm text-neutral-lowOnSurface">-</span>
                          }
                          {credit.repaymentClause && (
                            <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5 italic">{credit.repaymentClause}</div>
                          )}
                        </td>
                        {/* Redeem date */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.redeemedDate}</div>
                        </td>
                        {/* Validity period */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">
                            {credit.startDate} –<br />{credit.endDate}
                          </div>
                          <div className={`tiktok-labelSm mt-0.5 flex items-center gap-1 ${credit.daysLeft <= 30 ? 'text-warning-onSurface' : 'text-neutral-lowOnSurface'}`}>
                            {credit.daysLeft <= 30 && <KsIconClock size={11} className="flex-shrink-0" />}
                            {credit.daysLeft}d left{credit.daysLeft <= 30 ? ' · Expiring soon' : ''}
                          </div>
                        </td>
                        {/* Status (Direction B — KsStatusMessage) */}
                        <td className="px-4 py-3.5 align-top">
                          {credit.type === 'free' && (
                            <KsStatusMessage variant="success" richTextString="Auto-applied" />
                          )}
                          {isUnassigned && (
                            <KsStatusMessage variant="warning" richTextString="Unassigned - not spending" />
                          )}
                          {credit.type === 'assignable' && credit.assignState === 'assigned' && (
                            <KsStatusMessage variant="success" richTextString={`Assigned to ${credit.assignedCount} campaigns`} />
                          )}
                          {credit.type === 'conditional' && unmetCount > 0 && (
                            <KsStatusMessage variant="warning" richTextString={`${unmetCount} condition${unmetCount > 1 ? 's' : ''} not met`} />
                          )}
                          {credit.type === 'conditional' && unmetCount === 0 && (
                            <KsStatusMessage variant="success" richTextString="All conditions met" />
                          )}
                        </td>
                        {/* Operation */}
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
            </>
          )}

          {/* ── Earning tab (Direction D) ── */}
          {activeTab === 'earning' && (
            <div className="p-5">
              <div className="mb-3">
                <KsInlineAlert
                  variant="info"
                  content="Reach your spend goal to earn these credits. Credits are issued after goal verification."
                />
              </div>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <thead>
                  <tr className="bg-neutral-surface2">
                    {[
                      { label: 'Incentive',        w: '30%' },
                      { label: 'Spend progress',   w: '30%' },
                      { label: 'Credit reward',    w: '16%' },
                      { label: 'End date',         w: '14%' },
                      { label: 'Status',           w: '10%' },
                    ].map(col => (
                      <th key={col.label} style={{ width: col.w }}
                        className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EARNING_CREDITS.map((credit, idx) => {
                    const pct    = Math.round((credit.spentAmount / credit.goalAmount) * 100);
                    const urgent = credit.daysLeft <= 14;
                    return (
                      <tr key={credit.id} className={`hover:bg-neutral-surface2 transition-colors ${idx < EARNING_CREDITS.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}>
                        <td className="px-4 py-3.5 align-top">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.name}</div>
                          <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">{credit.id}</div>
                        </td>
                        {/* Spend progress (Direction D) */}
                        <td className="px-4 py-3.5 align-top">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="tiktok-labelSm text-neutral-onSurface">
                              ${credit.spentAmount.toLocaleString()} / ${credit.goalAmount.toLocaleString()} USD
                            </span>
                            <span className={`tiktok-labelSm font-medium ${pct >= 90 ? 'text-success-onSurface' : 'text-primary-fill'}`}>
                              {pct}%
                            </span>
                          </div>
                          <KsProgress percent={pct} variant="bar" size="sm" status={pct >= 100 ? 'success' : 'default'} showPercentAndStatus={false} />
                        </td>
                        <td className="px-4 py-3.5 align-top">
                          <span className="tiktok-bodySm text-neutral-highOnSurface">{credit.creditReward} {credit.currency}</span>
                        </td>
                        <td className="px-4 py-3.5 align-top">
                          <div className="tiktok-bodySm text-neutral-highOnSurface">{credit.endDate}</div>
                          <div className={`tiktok-labelSm mt-0.5 flex items-center gap-1 ${urgent ? 'text-warning-onSurface' : 'text-neutral-lowOnSurface'}`}>
                            {urgent && <KsIconClock size={11} />}
                            {credit.daysLeft}d left{urgent ? ' · Ending soon' : ''}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 align-top">
                          <button className="tiktok-labelSm text-primary-fill hover:underline">View details</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Not available tab placeholder ── */}
          {activeTab === 'notAvailable' && (
            <div className="p-10 text-center">
              <KsIconCoupon size={36} className="mx-auto mb-3 text-neutral-fillMedHigh" />
              <div className="tiktok-bodyMd text-neutral-onSurface mb-1">Not available tab redesign</div>
              <div className="tiktok-labelSm text-neutral-lowOnSurface">
                See P7 (Solution A1 · 3 states) and P8 (Solution A2 · Pending Payout)
              </div>
            </div>
          )}
        </div>
      </div>

      <CreditDrawer credit={selectedCredit} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </TTBCShell>
  );
}
