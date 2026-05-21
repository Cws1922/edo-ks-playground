import { useState } from 'react';
import { KsModal, KsButton, KsTabs, KsTabItem, KsTag, KsStatusMessage } from '@byted-keystone/react';
import type { DemoState } from './AdjustCreditCompanyModal';

interface Props {
  open: boolean;
  onClose: () => void;
  demoState: DemoState;
  adAccountName: string;
  adAccountId: string;
}

const PA_NAME = '2025 Winter Campaign';
const PA_ID = '827165293716';
const TRANSFERABLE_NORMAL = 1000;
const TRANSFERABLE_STATE_B = 5;
const MIN_AMOUNT = 10;

function RadioCard({ icon, label, description, selected, onClick }: {
  icon: string; label: string; description: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-left p-3 rounded-lg border-2 transition-colors ${
        selected ? 'border-primary-fill bg-primary-fillLow' : 'border-neutral-fillLow bg-neutral-surface hover:bg-neutral-surface2'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="tiktok-labelLg text-neutral-highOnSurface mb-0.5">{icon} {label}</p>
          <p className="tiktok-bodySm text-neutral-onSurface">{description}</p>
        </div>
        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
          selected ? 'border-primary-fill' : 'border-neutral-fill'
        }`}>
          {selected && <div className="w-2 h-2 rounded-full bg-primary-fill" />}
        </div>
      </div>
    </button>
  );
}

export function AdjustCashBalanceModal({ open, onClose, demoState, adAccountName, adAccountId }: Props) {
  const [direction, setDirection] = useState<'add' | 'decrease'>('add');
  const [activeTab, setActiveTab] = useState('from-pa');
  const [amount, setAmount] = useState('');

  const isTransferTab = activeTab === 'from-pa';
  const isDisabled = isTransferTab && demoState !== 'normal';
  const transferable = demoState === 'stateB' ? TRANSFERABLE_STATE_B : demoState === 'stateA' ? 0 : TRANSFERABLE_NORMAL;
  const canConfirm = !isDisabled && parseFloat(amount) >= MIN_AMOUNT;

  return (
    <KsModal
      open={open}
      size="md"
      title="Adjust cash balance"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Direction toggle */}
      <div className="flex gap-3 mb-4">
        <RadioCard
          icon="+"
          label="Add balance"
          description="Add cash to ad account"
          selected={direction === 'add'}
          onClick={() => setDirection('add')}
        />
        <RadioCard
          icon="—"
          label="Decrease balance"
          description="Transfer cash back to payment portfolio for reallocation"
          selected={direction === 'decrease'}
          onClick={() => setDirection('decrease')}
        />
      </div>

      {/* Source tabs (only for Add direction) */}
      {direction === 'add' && (
        <div className="mb-4">
          <KsTabs
            activeTabId={activeTab}
            onActiveTabIdChange={(id) => setActiveTab(String(id))}
          >
            <KsTabItem tabId="from-pa">
              <span slot="label">Add from Payment Portfolio</span>
            </KsTabItem>
            <KsTabItem tabId="make-payment">
              <span slot="label">Make a payment</span>
            </KsTabItem>
          </KsTabs>
        </div>
      )}

      {/* From: PA (transfer tab only) */}
      {isTransferTab && (
        <>
          <div className="mb-3">
            <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">From: Payment Portfolio</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tiktok-bodySm text-neutral-highOnSurface">{PA_NAME}</span>
              <KsTag variant="neutral" size="sm">Standard</KsTag>
              <span className="tiktok-labelSm text-neutral-onSurface ml-auto">ID: {PA_ID}</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">To: Ad account</p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tiktok-bodySm text-neutral-highOnSurface">{adAccountName}</span>
              <span className="tiktok-labelSm text-neutral-onSurface ml-auto">ID: {adAccountId}</span>
            </div>
          </div>
        </>
      )}

      {/* Amount input */}
      <div className="mb-4">
        <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">
          {isTransferTab ? 'Transfer amount' : 'Amount'}
        </p>
        <div className={`flex items-center border rounded h-9 px-3 gap-2 ${
          isDisabled ? 'bg-neutral-surface2 border-neutral-fillLow' : 'bg-neutral-surface border-neutral-fillLow'
        }`}>
          <input
            type="number"
            min={MIN_AMOUNT}
            step={0.01}
            disabled={isDisabled}
            placeholder={isDisabled ? '—' : `Minimum ${MIN_AMOUNT}.00`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 min-w-0 outline-none bg-transparent tiktok-bodySm text-neutral-highOnSurface placeholder:text-neutral-lowOnSurface disabled:text-neutral-lowOnSurface [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="tiktok-bodySm text-neutral-lowOnSurface flex-shrink-0">USD</span>
        </div>

        {isTransferTab && demoState === 'normal' && (
          <p className="tiktok-labelSm text-neutral-onSurface mt-1.5">
            Transferable cash balance: <span className="text-neutral-highOnSurface">{TRANSFERABLE_NORMAL.toLocaleString()}.00 USD</span>
            {' '}<button className="text-primary-fill hover:underline">Transfer all</button>
          </p>
        )}
        {isTransferTab && demoState === 'stateA' && (
          <div className="mt-2">
            <KsStatusMessage variant="error" richTextString="No transferable balance available at this time." />
          </div>
        )}
        {isTransferTab && demoState === 'stateB' && (
          <div className="mt-2">
            <KsStatusMessage variant="error" richTextString={`The transferable balance (${transferable}.00 USD) is below the minimum transfer amount (${MIN_AMOUNT}.00 USD).`} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 pt-2">
        <KsButton variant="default" onClick={onClose}>Cancel</KsButton>
        <KsButton variant="primary" disabled={!canConfirm} onClick={onClose}>Confirm</KsButton>
      </div>
    </KsModal>
  );
}
