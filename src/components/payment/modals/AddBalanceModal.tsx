import { useState } from 'react';
import { KsModal, KsButton } from '@byted-keystone/react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PA_NAME = '2025 Winter Campaign';
const PA_ID = '827165293716';

export function AddBalanceModal({ open, onClose }: Props) {
  const [amount, setAmount] = useState('');

  const canConfirm = parseFloat(amount) >= 10;

  return (
    <KsModal
      open={open}
      size="sm"
      title="Add balance"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Security notice */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-4 h-4 rounded-full bg-success-fill flex items-center justify-center flex-shrink-0 text-white text-[10px]">✓</span>
        <span className="tiktok-bodySm text-neutral-onSurface">Your payment methods are stored securely.</span>
      </div>

      {/* To: PA */}
      <div className="mb-4">
        <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">To: Payment Portfolio</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="tiktok-bodySm text-neutral-highOnSurface">{PA_NAME}</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] bg-info-fillLow text-info-highOnSurface border border-info-fillLow">Standard</span>
          <span className="tiktok-labelSm text-neutral-onSurface ml-auto">ID: {PA_ID}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">Amount</p>
        <div className="flex items-center border border-neutral-fillLow rounded h-9 px-3 gap-2 bg-neutral-surface">
          <input
            type="number"
            min={10}
            step={0.01}
            placeholder="Minimum 10.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 min-w-0 outline-none bg-transparent tiktok-bodySm text-neutral-highOnSurface placeholder:text-neutral-lowOnSurface [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="tiktok-bodySm text-neutral-lowOnSurface flex-shrink-0">USD</span>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="flex justify-between py-2 border-t border-neutral-fillLow">
        <span className="tiktok-bodySm text-neutral-onSurface">Advertising fee</span>
        <span className="tiktok-bodySm text-neutral-highOnSurface">—</span>
      </div>
      <div className="flex justify-between py-2 border-t border-neutral-fillLow mb-4">
        <span className="tiktok-labelLg text-neutral-highOnSurface">Total charges</span>
        <span className="tiktok-labelLg text-neutral-highOnSurface">—</span>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2">
        <KsButton variant="default" onClick={onClose}>Cancel</KsButton>
        <KsButton variant="primary" disabled={!canConfirm} onClick={onClose}>Confirm</KsButton>
      </div>
    </KsModal>
  );
}
