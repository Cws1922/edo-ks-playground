import { useState } from 'react';
import { KsDrawer, KsTabs, KsTabItem, KsTag, KsButton, KsStatusDot } from '@byted-keystone/react';
import { KsIconReceipt } from '@fe-infra/keystone-icons-react';
import type { Transaction } from '@/data/transactions';
import { formatAmount } from '@/data/transactions';
import { clsx } from 'clsx';

interface TransactionDrawerProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

function KVRow({ label, value, valueClass }: { label: string; value: React.ReactNode; valueClass?: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-neutral-fillLow last:border-b-0">
      <span className="tiktok-bodySm text-neutral-lowOnSurface">{label}</span>
      <span className={clsx('tiktok-bodySm text-neutral-highOnSurface text-right max-w-[60%]', valueClass)}>{value}</span>
    </div>
  );
}

interface TimelineEvent {
  t: string; icon: string; title: string; desc: string;
  color: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'neutral';
  highlight?: boolean;
}

const SUCCESS_EVENTS: TimelineEvent[] = [
  { t: '14:30:47', icon: '📧', title: 'Notification sent',           desc: "Email + in-app · 'Funds added successfully'", color: 'neutral' },
  { t: '14:30:46', icon: '✓',  title: 'Balance updated',             desc: 'Cash balance +$5,000.00 USD → $8,420.50', color: 'success', highlight: true },
  { t: '14:30:45', icon: '↓',  title: 'Funds received from bank',    desc: 'Reference: BNK-2026-05-12-001', color: 'success' },
  { t: '14:30:27', icon: '↑',  title: 'Funds requested from bank',   desc: 'Bank transfer initiated', color: 'info' },
  { t: '14:30:26', icon: '🔒', title: 'Payment method verified',     desc: 'Bank account validated by issuer', color: 'info' },
  { t: '14:30:25', icon: '▸',  title: 'Transaction initiated',       desc: 'By demo.user@bytedance.com from Payment page', color: 'primary' },
];

const FAILED_EVENTS: TimelineEvent[] = [
  { t: '10:00:11', icon: '⏸',  title: 'Awaiting user action',        desc: 'Recovery CTA shown to user · pending decision', color: 'warning', highlight: true },
  { t: '10:00:10', icon: '📧', title: 'Notification sent',           desc: "Email + in-app · 'Add balance failed - action needed'", color: 'neutral' },
  { t: '10:00:09', icon: '✕',  title: 'Retry attempt #1 failed',     desc: 'Same reason: insufficient_funds · Code 51 (Visa)', color: 'error', highlight: true },
  { t: '10:00:06', icon: '↻',  title: 'Auto-retry initiated',         desc: 'Per Bill payment retry policy (max 1 attempt)', color: 'warning' },
  { t: '10:00:05', icon: '✕',  title: 'Card declined by issuer',      desc: 'Error code: 51 (insufficient_funds) · Visa ••1234', color: 'error', highlight: true },
  { t: '10:00:02', icon: '↑',  title: 'Funds requested from bank',    desc: 'Authorization request sent to issuer', color: 'info' },
  { t: '10:00:01', icon: '🔒', title: 'Payment method verified',      desc: 'Visa ••1234 · BIN matched · CVV ok', color: 'info' },
  { t: '10:00:00', icon: '▸',  title: 'Transaction initiated',        desc: 'By demo.user@bytedance.com from Payment page', color: 'primary' },
];

function Timeline({ events }: { events: TimelineEvent[] }) {
  const iconBgMap: Record<TimelineEvent['color'], string> = {
    success: 'bg-success-fillLow text-success-onFillLow',
    error:   'bg-error-fillLow text-error-onFillLow',
    warning: 'bg-warning-fillLow text-warning-onFillLow',
    info:    'bg-info-fillLow text-info-onFillLow',
    primary: 'bg-primary-fillLow text-primary-onFillLow',
    neutral: 'bg-neutral-fillLow text-neutral-onFill',
  };
  const highlightColorMap: Record<TimelineEvent['color'], string> = {
    success: 'text-success-onFill',
    error:   'text-error-onFill',
    warning: 'text-warning-onFill',
    info:    'text-info-onFill',
    primary: 'text-primary-onFill',
    neutral: 'text-neutral-highOnSurface',
  };

  return (
    <div className="relative pl-1">
      <div className="absolute left-[14px] top-3 bottom-3 w-px bg-neutral-fillLow" />
      <div className="space-y-3">
        {events.map((ev, i) => (
          <div key={i} className="flex gap-3 relative">
            <div className={clsx(
              'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 relative z-10',
              iconBgMap[ev.color],
            )}>
              <span className="text-[12px]">{ev.icon}</span>
            </div>
            <div className="flex-1 pb-1">
              <div className="tiktok-labelSm text-neutral-lowOnSurface">{ev.t}</div>
              <div className={clsx(
                'tiktok-labelLg',
                ev.highlight ? highlightColorMap[ev.color] : 'text-neutral-highOnSurface',
              )}>{ev.title}</div>
              <div className="tiktok-bodySm text-neutral-lowOnSurface">{ev.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TransactionDrawer({ open, transaction, onClose }: TransactionDrawerProps) {
  const [tab, setTab] = useState<'details' | 'related' | 'activity'>('details');

  if (!transaction) return null;

  const isFailed = transaction.status === 'failed';
  const amount = transaction.cashBalance ?? transaction.creditBalance;
  const isPositive = amount !== null && amount > 0;

  return (
    <KsDrawer
      open={open}
      title="Transaction details"
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
      width={520}
      closeable
    >
      <div className="flex flex-col h-full">
        {/* Hero */}
        <div className={clsx(
          'px-5 py-4 border-b border-neutral-fillLow relative',
          isFailed ? 'bg-error-surface1' : 'bg-success-surface1',
        )}>
          <div className="flex gap-2 mb-2">
            <KsTag variant={isFailed ? 'error' : 'success'} size="sm">
              {transaction.typeSub}
            </KsTag>
            <KsTag variant="neutral" size="sm">{transaction.typeMajor}</KsTag>
          </div>
          <div className={clsx(
            'tiktok-headlineMd',
            isFailed ? 'text-error-onFill' : (isPositive ? 'text-success-onFill' : 'text-error-onFill'),
          )}>
            {amount !== null ? formatAmount(amount) : '$1,000.00 USD · Attempted'}
          </div>
          <div className="tiktok-bodySm text-neutral-lowOnSurface mt-1">
            {isFailed
              ? `Reason: ${transaction.failureCode ?? '—'} (${transaction.paymentMethod})`
              : `${transaction.time} (UTC+8)`}
          </div>
          {isFailed && (
            <div className="absolute right-5 top-5">
              <KsTag variant="error" size="sm">Failed</KsTag>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-neutral-fillLow px-3">
          <KsTabs
            activeTabId={tab}
            onActiveTabIdChange={(v: string) => setTab(v as 'details' | 'related' | 'activity')}
            type="lite"
          >
            <KsTabItem tabId="details"><span slot="header">Details</span></KsTabItem>
            <KsTabItem tabId="related"><span slot="header">Related ({transaction.document ? 1 : 0})</span></KsTabItem>
            <KsTabItem tabId="activity"><span slot="header">Activity log</span></KsTabItem>
          </KsTabs>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto px-5 py-4">
          {tab === 'details' && (
            <>
              <div className="tiktok-labelSm text-neutral-lowOnSurface mb-2 mt-2 uppercase tracking-wide">Basic info</div>
              <KVRow label="Transaction ID" value={transaction.id} />
              <KVRow label="Account ID"     value={transaction.accountId} />
              <KVRow label="Operator"       value={transaction.operator} />
              <KVRow label="Status" valueClass={isFailed ? 'text-error-onFill' : 'text-success-onFill'}
                value={
                  <span className="flex items-center gap-1.5 justify-end">
                    <KsStatusDot size="sm" variant={isFailed ? 'error' : 'success'} />
                    {isFailed ? 'Failed' : 'Success'}
                  </span>
                } />

              <div className="tiktok-labelSm text-neutral-lowOnSurface mb-2 mt-5 uppercase tracking-wide">Payment method</div>
              <KVRow label="Method"        value={transaction.paymentMethod} />
              <KVRow label="Reference no." value={transaction.referenceNo} />

              <div className="tiktok-labelSm text-neutral-lowOnSurface mb-2 mt-5 uppercase tracking-wide">Balance impact</div>
              <KVRow label="Cash balance Δ"   value={formatAmount(transaction.cashBalance)}   valueClass={transaction.cashBalance !== null && transaction.cashBalance > 0 ? 'text-success-onFill' : transaction.cashBalance !== null ? 'text-error-onFill' : ''} />
              <KVRow label="Credit balance Δ" value={formatAmount(transaction.creditBalance)} />

              {transaction.document && (
                <>
                  <div className="tiktok-labelSm text-neutral-lowOnSurface mb-2 mt-5 uppercase tracking-wide">Linked invoice</div>
                  <div className="border border-primary-fillLow bg-primary-surface1 rounded-md p-3 flex items-center gap-3 cursor-pointer hover:bg-primary-surface1Hover">
                    <KsIconReceipt size={20} />
                    <div className="flex-1">
                      <div className="tiktok-labelLg text-neutral-highOnSurface">{transaction.document}</div>
                      <div className="tiktok-labelSm text-neutral-lowOnSurface">
                        {formatAmount(Math.abs(amount ?? 0), { sign: false })}
                      </div>
                    </div>
                    <span className="tiktok-labelLg text-primary-onFill">View →</span>
                  </div>
                </>
              )}
            </>
          )}

          {tab === 'related' && (
            <div className="py-6">
              {transaction.document ? (
                <div className="border border-primary-fillLow bg-primary-surface1 rounded-md p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <KsIconReceipt size={16} />
                    <span className="tiktok-labelLg text-neutral-highOnSurface">{transaction.document}</span>
                  </div>
                  <div className="tiktok-bodySm text-neutral-lowOnSurface">Invoice · {formatAmount(Math.abs(amount ?? 0), { sign: false })}</div>
                </div>
              ) : (
                <div className="tiktok-bodyMd text-neutral-lowOnSurface text-center">No related records</div>
              )}
            </div>
          )}

          {tab === 'activity' && <Timeline events={isFailed ? FAILED_EVENTS : SUCCESS_EVENTS} />}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-fillLow px-5 py-3 flex justify-between gap-3 bg-neutral-surface">
          <KsButton variant="default" size="md">Appeal</KsButton>
          <KsButton variant="primary" size="md">
            {isFailed ? 'Retry payment' : 'Download receipt'}
          </KsButton>
        </div>
      </div>
    </KsDrawer>
  );
}
