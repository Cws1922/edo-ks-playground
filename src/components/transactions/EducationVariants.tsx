import { useState } from 'react';
import { KsLink, KsTooltip, KsModal, KsButton } from '@byted-keystone/react';
import { KsIconInfo, KsIconClose, KsIconSearch, KsIconReceipt, KsIconFilledWarning } from '@fe-infra/keystone-icons-react';

/** D1 — Top banner education bar */
export function EducationBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-primary-surface1 border border-primary-fillLow border-l-[3px] border-l-primary-fill rounded-md p-3 mb-4 flex items-start gap-3">
      <KsIconInfo size={20} className="text-primary-onFill mt-0.5" />
      <div className="flex-1">
        <div className="tiktok-labelLg text-neutral-highOnSurface">Welcome to Transactions</div>
        <div className="tiktok-bodySm text-neutral-lowOnSurface mt-0.5">
          This page records every change to your account balance. Use Filters to narrow by date, type, or campaign. Click any row to see full details.
          {' '}
          <KsLink size="sm">Learn more →</KsLink>
        </div>
      </div>
      <button
        className="text-neutral-lowOnSurface hover:text-neutral-highOnSurface flex flex-col items-end gap-0.5"
        onClick={onDismiss}
      >
        <KsIconClose size={16} />
        <span className="tiktok-labelSm">Don't show again</span>
      </button>
    </div>
  );
}

/** D2 — Inline hint icon with tooltip on hover */
export function InlineHint({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  return (
    <KsTooltip
      defaultOpen={initiallyOpen}
      size="md"
    >
      <span slot="content" className="block max-w-[280px]">
        <span className="tiktok-labelMd block mb-1">What's this page?</span>
        <span className="tiktok-bodySm block">
          Every change to your account balance is recorded here. Use Filters to narrow by date, type, or campaign. Click any row to see full details.
        </span>
      </span>
      <button className="w-6 h-6 rounded-full border border-primary-fill bg-primary-surface1 flex items-center justify-center text-primary-onFill hover:bg-primary-surface1Hover">
        <KsIconInfo size={12} />
      </button>
    </KsTooltip>
  );
}

/** D3 — First-visit Modal */
export function FirstVisitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dontShow, setDontShow] = useState(false);

  const tips = [
    { icon: <KsIconSearch size={14} />, text: 'Filter by date, type, or campaign to find specific transactions' },
    { icon: <KsIconReceipt size={14} />, text: 'Click any row to view full details and access linked invoices' },
    { icon: <KsIconFilledWarning size={14} />, text: 'Failed transactions are highlighted — take action right from this page' },
  ];

  return (
    <KsModal
      open={open}
      title=""
      size="md"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
      closeable
    >
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary-fill text-primary-onFill flex items-center justify-center mx-auto mb-3 text-2xl">📊</div>
        <div className="tiktok-headlineSm text-neutral-highOnSurface mb-2">Welcome to Transactions</div>
        <div className="tiktok-bodyMd text-neutral-lowOnSurface mb-4 max-w-[420px] mx-auto">
          Every change to your account balance is recorded here. Use this page to reconcile spending and review payment activity.
        </div>
      </div>
      <div className="space-y-2 mb-4">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3 px-2">
            <div className="text-primary-onFill mt-0.5">{tip.icon}</div>
            <span className="tiktok-bodySm text-neutral-highOnSurface">{tip.text}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-fillLow pt-3 flex items-center justify-between">
        <label className="flex items-center gap-2 tiktok-bodySm text-neutral-lowOnSurface cursor-pointer">
          <input
            type="checkbox"
            checked={dontShow}
            onChange={(e) => setDontShow(e.target.checked)}
          />
          Don't show again
        </label>
        <KsButton variant="primary" onClick={onClose}>Got it, let's go →</KsButton>
      </div>
    </KsModal>
  );
}
