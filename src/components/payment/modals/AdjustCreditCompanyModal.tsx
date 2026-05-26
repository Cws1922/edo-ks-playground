import { useState } from 'react';
import { KsModal, KsButton, KsTag, KsStatusMessage } from '@byted-keystone/react';

export type DemoState = 'normal' | 'stateA' | 'stateB';

interface Props {
  open: boolean;
  onClose: () => void;
  demoState: DemoState;
}

const PA_NAME = '2025 Winter Campaign';
const PA_ID = '827165293716';
const TRANSFERABLE_NORMAL = 12000;
const TRANSFERABLE_STATE_B = 5;
const MIN_AMOUNT = 10;

function Tile({ label, description, selected, onClick }: {
  label: string; description: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 text-left p-4 rounded-lg border transition-colors ${
        selected
          ? 'border-primary-fill bg-primary-fillLow'
          : 'border-neutral-fillLow bg-neutral-surface hover:bg-neutral-surface2'
      }`}
    >
      <p className={`tiktok-labelLg mb-0.5 ${selected ? 'text-primary-fill' : 'text-neutral-highOnSurface'}`}>{label}</p>
      <p className="tiktok-bodySm text-neutral-onSurface">{description}</p>
    </button>
  );
}

export function AdjustCreditCompanyModal({ open, onClose, demoState }: Props) {
  const [direction, setDirection] = useState<'add' | 'decrease'>('add');
  const [amount, setAmount] = useState('');

  const isDisabled = demoState !== 'normal';
  const transferable = demoState === 'stateB' ? TRANSFERABLE_STATE_B : demoState === 'stateA' ? 0 : TRANSFERABLE_NORMAL;
  const canConfirm = !isDisabled && parseFloat(amount) >= MIN_AMOUNT;

  return (
    <KsModal
      open={open}
      size="md"
      title="Adjust credit"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Direction toggle */}
      <div className="flex gap-3 mb-5">
        <Tile
          label="Add balance"
          description="Transfer credit to this Payment Portfolio"
          selected={direction === 'add'}
          onClick={() => setDirection('add')}
        />
        <Tile
          label="Decrease balance"
          description="Transfer credit back to your business entity for reallocation"
          selected={direction === 'decrease'}
          onClick={() => setDirection('decrease')}
        />
      </div>

      {/* To: PA */}
      <div className="mb-4">
        <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">To: Payment Portfolio</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="tiktok-bodySm text-neutral-highOnSurface">{PA_NAME}</span>
          <KsTag variant="neutral" size="sm">Standard</KsTag>
          <span className="tiktok-labelSm text-neutral-onSurface ml-auto">ID: {PA_ID}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <p className="tiktok-labelLg text-neutral-highOnSurface mb-1.5">Adjust amount</p>
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

        {/* State messages */}
        {demoState === 'normal' && (
          <p className="tiktok-labelSm text-neutral-onSurface mt-1.5">
            Transferable credit balance: <span className="text-neutral-highOnSurface">{TRANSFERABLE_NORMAL.toLocaleString()}.00 USD</span>
            {' '}<button className="text-primary-fill hover:underline">Transfer all</button>
          </p>
        )}
        {demoState === 'stateA' && (
          <div className="mt-2">
            <KsStatusMessage variant="error" richTextString="No transferable balance available at this time." />
          </div>
        )}
        {demoState === 'stateB' && (
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
