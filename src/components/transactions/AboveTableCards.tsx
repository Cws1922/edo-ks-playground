import { KsText, KsLink } from '@byted-keystone/react';
import {
  KsIconArrowUp,
  KsIconAlarmClock,
  KsIconClose,
  KsIconChart,
  KsIconReceipt,
  KsIconCheck,
  KsIconFilledWarning,
} from '@fe-infra/keystone-icons-react';
import { HIGHLIGHTS, KPI, formatAmount } from '@/data/transactions';

/** D2 Highlight cards — 3 cards above table */
export function HighlightCards() {
  const cards = [
    {
      label: 'MOST RECENT',
      main: HIGHLIGHTS.mostRecent?.typeSub ?? '—',
      sub: `${formatAmount(HIGHLIGHTS.mostRecent?.cashBalance ?? null)} · 3h ago`,
      tone: 'success' as const,
      icon: <KsIconArrowUp size={14} />,
    },
    {
      label: 'PENDING ACTION',
      main: HIGHLIGHTS.pending.title,
      sub: HIGHLIGHTS.pending.detail,
      tone: 'warning' as const,
      icon: <KsIconAlarmClock size={14} />,
    },
    {
      label: 'NEEDS ATTENTION',
      main: '1 Failed transaction',
      sub: `${HIGHLIGHTS.needsAttention?.typeSub} · ${HIGHLIGHTS.needsAttention?.description}`,
      tone: 'error' as const,
      icon: <KsIconClose size={14} />,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 mb-4">
      {cards.map((c) => {
        const stripe = c.tone === 'success'
          ? 'border-l-success-fill bg-success-surface1'
          : c.tone === 'warning'
          ? 'border-l-warning-fill bg-warning-surface1'
          : 'border-l-error-fill bg-error-surface1';
        const iconBg = c.tone === 'success'
          ? 'bg-success-fillLow text-success-onFillLow'
          : c.tone === 'warning'
          ? 'bg-warning-fillLow text-warning-onFillLow'
          : 'bg-error-fillLow text-error-onFillLow';
        const labelColor = c.tone === 'success'
          ? 'text-success-onFill'
          : c.tone === 'warning'
          ? 'text-warning-onFill'
          : 'text-error-onFill';

        return (
          <div key={c.label} className={`bg-neutral-surface rounded-md border border-neutral-fillLow border-l-[3px] ${stripe} p-3`}>
            <div className="flex items-start gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${iconBg}`}>
                {c.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`tiktok-labelSm uppercase tracking-wide ${labelColor}`}>{c.label}</div>
                <div className="tiktok-titleSm text-neutral-highOnSurface truncate">{c.main}</div>
                <div className="tiktok-labelSm text-neutral-lowOnSurface truncate">{c.sub}</div>
              </div>
            </div>
            <div className="text-right mt-1">
              <KsLink size="sm">View →</KsLink>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** D3 KPI cards — 4 KPI cards above table */
export function KpiCards() {
  const cards = [
    { label: 'Total spend (Last 30d)', value: `$${KPI.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, delta: '+18.2%', deltaTone: 'success' as const, icon: <KsIconChart size={14} /> },
    { label: 'Total transactions',     value: String(KPI.totalTxn),         delta: '12 this week',      deltaTone: 'neutral' as const, icon: <KsIconReceipt size={14} /> },
    { label: 'Active campaigns',       value: String(KPI.activeCampaigns),  delta: '$8,231 deducted',   deltaTone: 'neutral' as const, icon: <KsIconCheck size={14} /> },
    { label: 'Pending / Failed',       value: `${KPI.pendingFailed.pending} / ${KPI.pendingFailed.failed}`, delta: 'Needs attention',   deltaTone: 'error' as const, icon: <KsIconFilledWarning size={14} /> },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {cards.map((c) => (
        <div key={c.label} className="bg-neutral-surface rounded-md border border-neutral-fillLow p-3">
          <div className="flex items-start justify-between mb-1">
            <span className="tiktok-labelSm uppercase tracking-wide text-neutral-lowOnSurface">{c.label}</span>
            <div className="w-6 h-6 rounded-full bg-primary-fillLow text-primary-onFillLow flex items-center justify-center">
              {c.icon}
            </div>
          </div>
          <KsText variant="headlineSm" color="neutralHigh">{c.value}</KsText>
          <div className={`tiktok-labelSm mt-1 ${
            c.deltaTone === 'success' ? 'text-success-onFill'
              : c.deltaTone === 'error' ? 'text-error-onFill'
              : 'text-neutral-lowOnSurface'
          }`}>{c.delta}</div>
        </div>
      ))}
    </div>
  );
}
