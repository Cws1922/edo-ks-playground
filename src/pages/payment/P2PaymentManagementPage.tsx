import { useState } from 'react';
import { KsButton, KsText, KsTag } from '@byted-keystone/react';
import { KsIconSearch, KsIconCreditCard, KsIconChevronDown, KsIconHelp } from '@fe-infra/keystone-icons-react';
import { TTBCShell } from '@/components/payment/TTBCShell';
import { AddBalanceModal } from '@/components/payment/modals/AddBalanceModal';
import { AdjustCreditCompanyModal } from '@/components/payment/modals/AdjustCreditCompanyModal';
import { AdjustCreditAdvModal } from '@/components/payment/modals/AdjustCreditAdvModal';
import { AdjustCashBalanceModal } from '@/components/payment/modals/AdjustCashBalanceModal';
import type { DemoState } from '@/components/payment/modals/AdjustCreditCompanyModal';

const PA_NAME = '2025 Winter Campaign';
const PA_ID = '827165293716';

const AD_ACCOUNTS = [
  { id: 'ADV928176251', name: 'The greatest showman', status: 'Approved', budgetType: 'Monthly', budgetUsed: 500, budgetTotal: 1000, threshold: '100.00 / 280.00', creditBalance: '500.00', cashBalance: '100.00', adCredit: '100.00' },
  { id: 'ADV928176252', name: 'Ad account 2', status: 'Approved', budgetType: 'Unlimited', budgetUsed: 0, budgetTotal: 0, threshold: '100.00 / 280.00', creditBalance: '500.00', cashBalance: '100.00', adCredit: '100.00' },
  { id: 'ADV928176253', name: 'Ad account 3', status: 'Approved', budgetType: 'Monthly', budgetUsed: 500, budgetTotal: 1000, threshold: '100.00 / 280.00', creditBalance: '500.00', cashBalance: '100.00', adCredit: '100.00' },
  { id: 'ADV928176254', name: 'Ad account 4', status: 'Approved', budgetType: 'Weekly', budgetUsed: 500, budgetTotal: 1000, threshold: '100.00 / 280.00', creditBalance: '500.00', cashBalance: '100.00', adCredit: '100.00' },
];

const DEMO_LABELS: Record<DemoState, string> = {
  normal: 'Normal',
  stateA: 'State A — balance = 0',
  stateB: 'State B — balance < min',
};

type ModalType = 'addBalance' | 'adjustCreditCompany' | 'adjustCreditAdv' | 'adjustCashBalance' | null;

export default function P2PaymentManagementPage() {
  const [demoState, setDemoState] = useState<DemoState>('normal');
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [selectedAccount, setSelectedAccount] = useState(AD_ACCOUNTS[0]);

  function openAdvModal(type: 'adjustCreditAdv' | 'adjustCashBalance', account: typeof AD_ACCOUNTS[0]) {
    setSelectedAccount(account);
    setOpenModal(type);
  }

  return (
    <TTBCShell showSidebar>
      {/* ─── Demo toggle ─── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-warning-fillLow border-b border-warning-fill flex-wrap">
        <span className="tiktok-labelSm text-warning-highOnSurface mr-1">Demo:</span>
        {(['normal', 'stateA', 'stateB'] as DemoState[]).map((s) => (
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
        <span className="tiktok-labelSm text-warning-onSurface ml-2">· 切换后打开 Adjust credit / Adjust balance 弹窗查看效果</span>
      </div>

      <div className="px-6 py-6 bg-neutral-surface2 min-h-full">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <KsText variant="headlineLg" color="neutralHigh">Payment Management</KsText>
          <div className="flex items-center gap-2">
            <KsButton variant="default">Billing options</KsButton>
            <KsButton variant="default">Manage Payment Portfolios ↗</KsButton>
          </div>
        </div>

        {/* PA selector */}
        <div className="bg-neutral-surface rounded-xl mb-4 px-5 py-4 flex items-center gap-3">
          <span className="tiktok-labelLg text-neutral-highOnSurface">Payment Portfolio</span>
          <KsIconHelp size={14} className="text-neutral-lowOnSurface" />
          <div className="flex items-center gap-2 ml-3 px-3 py-1.5 border border-neutral-fillLow rounded-lg bg-neutral-surface2 cursor-pointer hover:bg-neutral-fillLow transition-colors">
            <span className="tiktok-bodySm text-neutral-highOnSurface">{PA_NAME}</span>
            <KsTag variant="neutral" size="sm">Standard</KsTag>
            <span className="tiktok-labelSm text-neutral-onSurface ml-2">ID: {PA_ID}</span>
            <KsIconChevronDown size={14} className="text-neutral-lowOnSurface ml-1" />
          </div>
        </div>

        {/* Metrics card */}
        <div className="bg-neutral-surface rounded-xl mb-4 flex">
          {/* Credit balance */}
          <div className="flex-1 px-5 py-5 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-1">
              <span className="tiktok-labelMd text-neutral-onSurface">Available credit balance</span>
              <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>5,000.00</span>
              <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="tiktok-labelSm text-neutral-onSurface">Total: 8,000.00 USD</span>
              <div className="h-1 w-full rounded-full bg-neutral-surface3">
                <div className="h-full rounded-full bg-primary-fill" style={{ width: '62.5%' }} />
              </div>
            </div>
            <KsButton variant="primary" size="md" onClick={() => setOpenModal('adjustCreditCompany')}>
              Adjust credit
            </KsButton>
          </div>

          {/* Cash balance */}
          <div className="flex-1 px-5 py-5 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-1">
              <span className="tiktok-labelMd text-neutral-onSurface">Available cash balance</span>
              <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>1,000.00</span>
              <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="tiktok-labelSm text-neutral-onSurface">Total: 1,200 USD</span>
              <button className="tiktok-labelSm text-primary-fill hover:underline">View details</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <KsButton variant="default" size="md" onClick={() => setOpenModal('addBalance')}>
                Add balance
              </KsButton>
              <KsButton variant="default" size="md">
                Set auto balance recharge
              </KsButton>
            </div>
          </div>

          {/* Ad credit */}
          <div className="flex-1 px-5 py-5 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-1">
              <span className="tiktok-labelMd text-neutral-onSurface">Available Ad credit</span>
              <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>2,200.00</span>
              <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
            </div>
          </div>

          {/* Payment methods */}
          <div className="flex-1 px-5 py-5 flex flex-col gap-2 min-w-0">
            <div className="flex items-center gap-1">
              <span className="tiktok-labelMd text-neutral-onSurface">Payment methods</span>
              <KsIconHelp size={13} className="text-neutral-lowOnSurface" />
            </div>
            <div className="flex items-center gap-2">
              <KsIconCreditCard size={16} className="text-neutral-onSurface" />
              <span className="tiktok-bodySm text-neutral-highOnSurface">5</span>
            </div>
            <button className="tiktok-labelSm text-primary-fill hover:underline text-left">Manage</button>
          </div>
        </div>

        {/* Ad account table */}
        <div className="bg-neutral-surface rounded-xl overflow-hidden">
          {/* Tabs + toolbar */}
          <div className="px-5 pt-4 pb-0">
            <div className="flex items-center gap-4 mb-3">
              <button className="tiktok-labelLg text-primary-fill border-b-2 border-primary-fill pb-2 px-1">All</button>
              <button className="tiktok-labelLg text-neutral-onSurface pb-2 px-1 hover:text-neutral-highOnSurface">Alert account (0)</button>
            </div>
          </div>

          <div className="px-5 py-3 flex items-center gap-2">
            <div className="max-w-[260px] w-full flex items-center border border-neutral-fillLow rounded h-8 px-2 gap-1 bg-neutral-surface">
              <KsIconSearch size={13} className="text-neutral-lowOnSurface flex-shrink-0" />
              <input
                placeholder="Account name or ID"
                className="flex-1 min-w-0 outline-none bg-transparent tiktok-labelSm text-neutral-highOnSurface placeholder:text-neutral-lowOnSurface"
              />
            </div>
            <KsButton variant="default" size="sm">Filter</KsButton>
            <div className="flex-1" />
            <KsButton variant="default" size="sm">Custom columns</KsButton>
            <KsButton variant="default" size="sm">Bulk edit</KsButton>
            <KsButton variant="default" size="sm">Export</KsButton>
          </div>

          <table className="w-full text-sm table-fixed" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr className="bg-neutral-surface2">
                <th className="w-8 px-4 py-3 border-b border-neutral-fillLow">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded" />
                </th>
                {['Account', 'Budget', 'Threshold', 'Credit balance', 'Cash balance', 'Ad credit'].map((col) => (
                  <th key={col} className="text-left px-3 py-3 tiktok-labelLg text-neutral-highOnSurface font-medium border-b border-neutral-fillLow">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-neutral-surface">
              {AD_ACCOUNTS.map((acc, idx) => (
                <tr key={acc.id} className={`hover:bg-neutral-surface2 transition-colors ${idx < AD_ACCOUNTS.length - 1 ? 'border-b border-neutral-fillLow' : ''}`}>
                  <td className="px-4 py-4 align-top">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded mt-0.5" />
                  </td>
                  {/* Account */}
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{acc.name}</div>
                    <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">ID: {acc.id}</div>
                  </td>
                  {/* Budget */}
                  <td className="px-3 py-4 align-top">
                    {acc.budgetType === 'Unlimited' ? (
                      <div className="tiktok-bodySm text-neutral-highOnSurface">Unlimited</div>
                    ) : (
                      <>
                        <div className="h-1 w-full rounded-full bg-neutral-surface3 mb-1">
                          <div className="h-full rounded-full bg-primary-fill" style={{ width: `${(acc.budgetUsed / acc.budgetTotal) * 100}%` }} />
                        </div>
                        <div className="tiktok-labelSm text-neutral-onSurface">
                          {acc.budgetType} {acc.budgetUsed}.00 / {acc.budgetTotal.toLocaleString()}.00 USD
                        </div>
                      </>
                    )}
                    <button className="tiktok-labelSm text-primary-fill hover:underline mt-0.5">Edit budget</button>
                  </td>
                  {/* Threshold */}
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{acc.threshold} USD</div>
                    <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">Billing date (auction ads): 2024-05-01</div>
                    <div className="tiktok-labelSm text-neutral-onSurface">Billing date (reservation ads): 2024-05-01</div>
                  </td>
                  {/* Credit balance */}
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{acc.creditBalance} USD</div>
                    <button
                      className="tiktok-labelSm text-primary-fill hover:underline mt-0.5"
                      onClick={() => openAdvModal('adjustCreditAdv', acc)}
                    >
                      Adjust credit
                    </button>
                  </td>
                  {/* Cash balance */}
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{acc.cashBalance} USD</div>
                    <button
                      className="tiktok-labelSm text-primary-fill hover:underline mt-0.5"
                      onClick={() => openAdvModal('adjustCashBalance', acc)}
                    >
                      Adjust balance
                    </button>
                  </td>
                  {/* Ad credit */}
                  <td className="px-3 py-4 align-top">
                    <div className="tiktok-bodySm text-neutral-highOnSurface">{acc.adCredit} USD</div>
                    <button className="tiktok-labelSm text-primary-fill hover:underline mt-0.5">Add ad credit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddBalanceModal
        open={openModal === 'addBalance'}
        onClose={() => setOpenModal(null)}
      />
      <AdjustCreditCompanyModal
        open={openModal === 'adjustCreditCompany'}
        onClose={() => setOpenModal(null)}
        demoState={demoState}
      />
      <AdjustCreditAdvModal
        open={openModal === 'adjustCreditAdv'}
        onClose={() => setOpenModal(null)}
        demoState={demoState}
        adAccountName={selectedAccount.name}
        adAccountId={selectedAccount.id}
      />
      <AdjustCashBalanceModal
        open={openModal === 'adjustCashBalance'}
        onClose={() => setOpenModal(null)}
        demoState={demoState}
        adAccountName={selectedAccount.name}
        adAccountId={selectedAccount.id}
      />
    </TTBCShell>
  );
}
