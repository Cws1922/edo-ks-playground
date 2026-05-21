import { KsModal, KsLink } from '@byted-keystone/react';
import { KsIconFilledWarning, KsIconCreditCard, KsIconRefresh } from '@fe-infra/keystone-icons-react';
import type { Transaction } from '@/data/transactions';

interface FailedModalProps {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

export function FailedModal({ open, transaction, onClose }: FailedModalProps) {
  if (!transaction) return null;

  return (
    <KsModal
      open={open}
      title="Transaction failed"
      size="md"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      <div className="px-1 py-1">
        {/* Hero */}
        <div className="flex gap-3 mb-5">
          <div className="w-14 h-14 rounded-full bg-error-fillLow flex items-center justify-center flex-shrink-0">
            <KsIconFilledWarning size={26} className="text-error-onFill" />
          </div>
          <div className="flex-1">
            <div className="tiktok-titleMd text-neutral-highOnSurface">
              {transaction.failureReason ?? 'Your card was declined by the issuer'}
            </div>
            <div className="tiktok-bodySm text-neutral-lowOnSurface mt-1">
              Reason code: {transaction.failureCode ?? '—'} ({transaction.paymentMethod})
            </div>
            <div className="tiktok-labelSm text-neutral-lowOnSurface mt-0.5">
              {transaction.time} (UTC+8)
            </div>
          </div>
        </div>

        {/* Transaction summary box */}
        <div className="bg-neutral-fillLow rounded-md p-4 mb-5">
          <div className="tiktok-labelSm text-neutral-lowOnSurface uppercase tracking-wide mb-2">Transaction</div>
          <div className="tiktok-labelLg text-neutral-highOnSurface mb-3">
            {transaction.typeSub} · {transaction.typeMajor}
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-y-1">
            <span className="tiktok-bodySm text-neutral-lowOnSurface">Attempted amount:</span>
            <span className="tiktok-labelMd text-neutral-highOnSurface">$1,000.00 USD</span>
            <span className="tiktok-bodySm text-neutral-lowOnSurface">Transaction ID:</span>
            <span className="tiktok-bodySm text-neutral-highOnSurface">{transaction.id}</span>
          </div>
        </div>

        <div className="tiktok-labelLg text-neutral-highOnSurface mb-3">What would you like to do?</div>

        {/* Option 1: Try again (recommended) */}
        <button
          className="w-full flex items-center gap-3 p-3 border-2 border-primary-fill bg-primary-surface1 rounded-md mb-2 text-left hover:bg-primary-surface1Hover transition-colors"
          onClick={onClose}
        >
          <KsIconRefresh size={22} className="text-primary-onFill" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="tiktok-labelLg text-neutral-highOnSurface">Try again</span>
              <span className="tiktok-labelSm bg-primary-fillLow text-primary-onFillLow px-2 py-0.5 rounded">
                Recommended
              </span>
            </div>
            <div className="tiktok-bodySm text-neutral-lowOnSurface">Re-attempt with the same card</div>
          </div>
          <span className="text-primary-onFill text-lg">→</span>
        </button>

        {/* Option 2: Different method */}
        <button
          className="w-full flex items-center gap-3 p-3 border border-neutral-fillLow rounded-md mb-4 text-left hover:bg-neutral-fillLow transition-colors"
          onClick={onClose}
        >
          <KsIconCreditCard size={22} className="text-neutral-highOnSurface" />
          <div className="flex-1">
            <div className="tiktok-labelLg text-neutral-highOnSurface">Use a different payment method</div>
            <div className="tiktok-bodySm text-neutral-lowOnSurface">Add a new card or use bank transfer</div>
          </div>
          <span className="text-neutral-lowOnSurface text-lg">→</span>
        </button>

        {/* Footer */}
        <div className="border-t border-neutral-fillLow pt-3 flex items-center justify-between">
          <div>
            <span className="tiktok-bodySm text-neutral-lowOnSurface">Need help?  </span>
            <KsLink size="sm">Contact support</KsLink>
          </div>
          <KsLink size="sm">View full transaction details →</KsLink>
        </div>

        {/* TBD annotation */}
        <div className="mt-4 p-2 bg-warning-fillLow border border-warning-fill rounded text-warning-onFillLow tiktok-labelSm">
          ⚠ Copy + behavior pending B1 decision (PM+RD). This is a design draft for Critique.
        </div>
      </div>
    </KsModal>
  );
}
