import { useState } from 'react';
import { KsButton, KsText, KsTag } from '@byted-keystone/react';
import { KsIconHelp, KsIconFilledInfo, KsIconEdit, KsIconRefresh } from '@fe-infra/keystone-icons-react';
import { TTAMShell } from '@/components/payment/TTAMShell';

const PA_NAME = '2025 Winter Campaign';
const PA_ID = '827165293716';

function GMVCard() {
  return (
    <div className="bg-neutral-surface2 rounded-lg p-4 flex flex-col gap-6 flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M17.6 4.1a4.9 4.9 0 0 1-4.9-4.1h-3.5v13.7a2.9 2.9 0 1 1-2-2.8V7.3A6.4 6.4 0 1 0 13.7 13V8.8a8.4 8.4 0 0 0 3.9 1V6.3a4.9 4.9 0 0 1-3.9-2.2" fill="white"/>
          </svg>
        </div>
        <span className="tiktok-labelLg text-neutral-highOnSurface">GMV Payment</span>
      </div>
      {/* Body */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          <KsTag variant="neutral" size="md">Primary</KsTag>
          <KsTag variant="neutral" size="md">Manual Pay only</KsTag>
        </div>
        <div className="flex flex-col gap-1">
          <span className="tiktok-titleSm text-neutral-highOnSurface">{'{shop name}'}</span>
          <p className="tiktok-bodySm text-neutral-onSurface leading-5">
            Your shop's settled GMV will be used to pay for your ads spending.
          </p>
        </div>
      </div>
    </div>
  );
}

function CreditCardTile() {
  return (
    <div className="bg-neutral-surface2 rounded-lg p-4 flex flex-col justify-between gap-2 flex-1 min-w-0">
      {/* Card icon - Mastercard style */}
      <div className="flex items-center py-1.5 h-10">
        <div className="relative w-10 h-6 flex-shrink-0">
          <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
          <div className="absolute left-3.5 top-0 w-6 h-6 rounded-full bg-[#F79E1B] opacity-90" />
        </div>
      </div>
      {/* Info */}
      <div className="flex flex-col gap-2">
        <KsTag variant="neutral" size="md">Manual Pay only</KsTag>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1">
            <span className="tiktok-titleSm text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>
              **** **** **** 1234
            </span>
            <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
          </div>
          <span className="tiktok-bodySm text-neutral-onSurface">Expiry Date 12/23</span>
        </div>
      </div>
    </div>
  );
}

function AddCardTile() {
  return (
    <div className="bg-neutral-surface border border-dashed border-neutral-fillLow rounded-[4px] flex flex-col gap-3 items-center justify-center p-10 flex-1 min-w-0 min-h-[178px]">
      <div className="flex flex-col items-center gap-1">
        <span className="text-primary-fill text-2xl leading-none">+</span>
        <span className="tiktok-labelSm text-primary-onsurface">Add a payment method</span>
      </div>
      {/* Payment icons */}
      <div className="flex gap-3 items-center">
        {/* PayPal */}
        <div className="w-10 h-[25px] rounded-[2px] bg-[#f1f1f1] flex items-center justify-center flex-shrink-0">
          <span className="font-semibold text-[#003087] text-sm leading-none">P</span>
        </div>
        {/* GoPay */}
        <div className="w-10 h-[25px] rounded-[2px] bg-[#01aed6] flex items-center justify-center flex-shrink-0">
          <span className="font-semibold text-white text-[10px] leading-none">Go</span>
        </div>
        {/* Card */}
        <div className="w-10 h-[25px] rounded-[2px] bg-[#f1f1f1] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <rect x="0.5" y="0.5" width="19" height="13" rx="1.5" stroke="#C4C9D4"/>
            <rect y="2.5" width="20" height="3" fill="#C4C9D4"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function P4PaymentPage() {
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <TTAMShell>
      <div className="px-6 py-6 min-h-full max-w-[992px] mx-auto">
        {/* Page title */}
        <div className="mb-6">
          <KsText variant="headlineLg" color="neutralHigh">Payment</KsText>
        </div>

        {/* Budget card */}
        <div className="bg-neutral-surface rounded-xl mb-4 px-6 py-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <KsText variant="titleMd" color="neutralHigh">Budget</KsText>
              <p className="tiktok-bodySm text-neutral-onSurface mt-0.5">
                Your monthly budget is <span className="text-neutral-highOnSurface font-medium">2,000.00</span> USD.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 tiktok-labelSm text-neutral-onSurface hover:text-neutral-highOnSurface">
                <KsIconEdit size={14} /> Edit
              </button>
              <button className="flex items-center gap-1 tiktok-labelSm text-neutral-onSurface hover:text-neutral-highOnSurface">
                <KsIconRefresh size={14} /> Reset
              </button>
            </div>
          </div>
          <div className="flex gap-8 mb-3">
            <div>
              <div className="flex items-center gap-1.5 h-5">
                <span className="w-2 h-2 rounded-full bg-primary-fill inline-block flex-shrink-0" />
                <span className="tiktok-labelSm text-neutral-onSurface">Spent</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="tiktok-headlineSm text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>1,400.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
            </div>
            <div>
              <div className="flex items-center h-5">
                <span className="tiktok-labelSm text-neutral-onSurface">Remaining</span>
              </div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="tiktok-headlineSm text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>600.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
            </div>
          </div>
          <div className="h-1.5 w-full rounded-full bg-neutral-surface3">
            <div className="h-full rounded-full bg-primary-fill" style={{ width: '70%' }} />
          </div>
        </div>

        {/* Payment Portfolio card */}
        <div className="bg-neutral-surface rounded-xl">
          {/* PA Header */}
          <div className="px-6 py-4 flex items-center gap-2 border-b border-neutral-fillLow">
            <span className="tiktok-labelLg text-neutral-highOnSurface">Payment Portfolio</span>
            <KsIconHelp size={14} className="text-neutral-lowOnSurface" />
            <span className="tiktok-bodySm text-neutral-highOnSurface ml-2">{PA_NAME}</span>
            <KsTag variant="info" size="sm">Advanced</KsTag>
            <span className="tiktok-labelSm text-neutral-onSurface ml-1">ID: {PA_ID}</span>
            <div className="flex-1" />
            <KsButton variant="default" size="sm">Billing options</KsButton>
          </div>

          {/* Metrics */}
          <div className="flex px-6 py-6 gap-12 items-start">
            {/* Cash balance */}
            <div className="flex flex-col gap-2 min-w-[220px]">
              <div className="flex items-center gap-1">
                <span className="tiktok-labelMd text-neutral-onSurface">Available Cash balance</span>
                <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>150.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="tiktok-labelSm text-neutral-onSurface">Total: 168.00 USD</span>
                <button className="tiktok-labelSm text-primary-fill hover:underline">View details</button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <KsButton variant="primary" size="md">Add balance</KsButton>
                <KsButton variant="default" size="md">Set auto balance recharge</KsButton>
              </div>
            </div>

            {/* Ad credit */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <span className="tiktok-labelMd text-neutral-onSurface">Ad credit</span>
                <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>200.00</span>
                <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
              </div>
            </div>
          </div>

          {/* Payment method section */}
          <div className="px-6 py-4 flex flex-col gap-4">
            <KsText variant="titleMd" color="neutralHigh">Payment method</KsText>

            {/* Inline alert */}
            {alertVisible && (
              <div className="flex items-center gap-2 h-9 bg-neutral-surface2 border-l-2 border-primary-fill rounded pl-2.5 pr-2 py-2 w-full flex-shrink-0">
                <KsIconFilledInfo size={16} className="text-primary-fill flex-shrink-0" />
                <p className="flex-1 tiktok-labelSm text-neutral-highOnSurface min-w-0">
                  Payment methods are managed at the Payment Portfolio level and shared across all linked ad accounts.
                </p>
                <button
                  className="tiktok-labelSm text-primary-fill hover:underline flex-shrink-0 ml-2"
                  onClick={() => setAlertVisible(false)}
                >
                  I know
                </button>
              </div>
            )}

            {/* Card grid */}
            <div className="flex gap-4 items-stretch">
              <GMVCard />
              <CreditCardTile />
              <AddCardTile />
            </div>
          </div>
        </div>
      </div>

      {/* Floating reopen button (demo only) */}
      {!alertVisible && (
        <button
          onClick={() => setAlertVisible(true)}
          className="fixed bottom-16 right-5 z-[100] bg-primary-fill text-white tiktok-labelSm px-3 py-2 rounded-full shadow-lg hover:bg-primary-highFill transition-colors"
        >
          Re-show alert
        </button>
      )}
    </TTAMShell>
  );
}
