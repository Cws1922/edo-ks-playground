import { useState } from 'react';
import { KsModal, KsButton } from '@byted-keystone/react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const METHODS = [
  {
    id: 'gmv',
    logo: (
      <div className="w-10 h-[25px] rounded-md bg-neutral-highOnSurface flex items-center justify-center flex-shrink-0 text-white text-base">
        🛍
      </div>
    ),
    name: 'GMV Pay',
    badge: 'Pay with TikTok shop earnings',
    subtitle: 'Shop name: abcde12345_21312412431; Available GMV: 2,344.32 USD',
  },
  {
    id: 'card',
    logo: (
      <div className="w-10 h-[25px] rounded-md bg-neutral-surface2 border border-neutral-fillLow flex items-center justify-center flex-shrink-0">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <rect x="0.5" y="0.5" width="19" height="15" rx="2.5" stroke="#C4C9D4"/>
          <rect y="3" width="20" height="4" fill="#C4C9D4"/>
        </svg>
      </div>
    ),
    name: 'Credit or Debit card',
  },
  {
    id: 'paypal',
    logo: (
      <div className="w-10 h-[25px] rounded-md bg-[#F0F8FF] border border-neutral-fillLow flex items-center justify-center flex-shrink-0">
        <span className="font-medium text-[#003087] text-base leading-none">P</span>
      </div>
    ),
    name: 'PayPal',
  },
  {
    id: 'gopay',
    logo: (
      <div className="w-10 h-[25px] rounded-md bg-[#EAF9F7] border border-neutral-fillLow flex items-center justify-center flex-shrink-0">
        <span className="font-medium text-primary-fill text-sm leading-none">Go</span>
      </div>
    ),
    name: 'GoPay',
  },
];

export function AddPaymentMethodModal({ open, onClose }: Props) {
  const [selected, setSelected] = useState('gmv');

  return (
    <KsModal
      open={open}
      size="lg"
      title="Add payment method"
      showFooter={false}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Security notice */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="w-4 h-4 rounded-full bg-success-fill flex items-center justify-center flex-shrink-0 text-white text-[10px]">✓</span>
        <span className="tiktok-bodySm text-neutral-onSurface">Your payment methods are stored securely.</span>
      </div>

      {/* Payment method options */}
      <div className="flex flex-col gap-2 mb-5">
        {METHODS.map((method) => {
          const isSelected = selected === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelected(method.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                isSelected
                  ? 'border-primary-fill bg-neutral-surface'
                  : 'border-neutral-fillLow bg-neutral-surface hover:bg-neutral-surface2'
              }`}
            >
              {/* Radio */}
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                isSelected ? 'border-primary-fill' : 'border-neutral-fill'
              }`}>
                {isSelected && <div className="w-2 h-2 rounded-full bg-primary-fill" />}
              </div>

              {/* Logo */}
              {method.logo}

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="tiktok-labelLg text-neutral-highOnSurface">{method.name}</span>
                  {method.badge && (
                    <span className="tiktok-labelSm text-primary-fill">{method.badge}</span>
                  )}
                </div>
                {method.subtitle && (
                  <p className="tiktok-labelSm text-neutral-onSurface mt-0.5">{method.subtitle}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Privacy policy */}
      <p className="tiktok-bodySm text-neutral-onSurface mb-5">
        Refer to the{' '}
        <button className="text-primary-fill hover:underline">TikTok for Business Privacy Policy</button>
      </p>

      {/* Footer */}
      <div className="flex justify-end gap-2">
        <KsButton variant="default" onClick={onClose}>Back</KsButton>
        <KsButton variant="primary" onClick={onClose}>Next</KsButton>
      </div>
    </KsModal>
  );
}
