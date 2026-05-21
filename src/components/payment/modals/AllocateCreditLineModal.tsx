import { useState } from 'react';
import { KsModal, KsTag, KsText } from '@byted-keystone/react';
import { KsIconHelp } from '@fe-infra/keystone-icons-react';

interface PA {
  id: string;
  name: string;
  pct: number; // percentage of total CL
}

// 3 visible PAs: together 50% of total CL; remaining 10% unallocated, 40% hidden PAs
const INITIAL_PAS: PA[] = [
  { id: '836749236719376438643', name: 'Payment portfolio 1 name', pct: 20 },
  { id: '836749236719376438644', name: 'Payment portfolio 2 name', pct: 15 },
  { id: '836749236719376438645', name: 'Payment portfolio 3 name', pct: 15 },
];

const TOTAL_CL = 5000;
const USED_PER_PA = 150;
// 10% locked as "unallocated ratio"
const UNALLOCATED_PCT = 10;
// Remaining % goes to "hidden" other portfolios
const OTHER_PCT = (totalPct: number) => Math.max(0, 100 - totalPct - UNALLOCATED_PCT);

// Stacked bar colors from Figma: purpleblue/450, purpleblue/650, purpleblue/900
const COLOR_ADVANCED = '#4D65C3';
const COLOR_UNALLOCATED = '#95AEFE';
const COLOR_OTHER = '#D6E2FA';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AllocateCreditLineModal({ open, onClose }: Props) {
  const [pas, setPas] = useState<PA[]>(INITIAL_PAS);

  const totalPct = pas.reduce((s, p) => s + p.pct, 0);
  const advancedUsd = Math.round(TOTAL_CL * (totalPct / 100));
  const unallocatedUsd = Math.round(TOTAL_CL * (UNALLOCATED_PCT / 100));
  const otherPct = OTHER_PCT(totalPct);
  const otherUsd = Math.round(TOTAL_CL * (otherPct / 100));

  function handlePctChange(id: string, raw: string) {
    const n = Math.min(100, Math.max(0, parseFloat(raw) || 0));
    setPas((prev) => prev.map((p) => (p.id === id ? { ...p, pct: n } : p)));
  }

  return (
    <KsModal
      open={open}
      size="lg"
      title="Allocate credit line to advanced Portfolios"
      confirmText="Confirm"
      cancelText="Cancel"
      onConfirm={onClose}
      onCancel={onClose}
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* ─── Allocation rules ─── */}
      <div className="mb-4">
        <KsText variant="labelLg" color="neutralHigh">Allocation rules</KsText>
        <ul className="mt-2 pl-5 list-disc space-y-1">
          <li className="tiktok-bodySm text-neutral-onSurface">
            If you manually set the credit line percentage allocations for your Payment Portfolios and your credit line later changes, the percentages allocated to each Portfolio will remain the same.
          </li>
          <li className="tiktok-bodySm text-neutral-onSurface">
            The allocation ratio of all PAs cannot exceed 100%.
          </li>
          <li className="tiktok-bodySm text-neutral-onSurface">
            The allocation ratio of a single PA cannot be less than its used credit line ratio.
          </li>
        </ul>
      </div>

      {/* ─── Total credit line ─── */}
      <div className="mb-4">
        <KsText variant="labelLg" color="neutralHigh">Total credit line</KsText>

        {/* Amount */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="tiktok-headlineLg text-neutral-highOnSurface" style={{ fontFeatureSettings: "'lnum','tnum'" }}>
            {TOTAL_CL.toLocaleString()}.00
          </span>
          <span className="tiktok-bodySm text-neutral-onSurface">USD</span>
        </div>

        {/* Stacked bar — 24px tall, Figma purpleblue colors */}
        <div className="mt-3 h-6 flex w-full overflow-hidden rounded-sm">
          <div style={{ width: `${totalPct}%`, background: COLOR_ADVANCED }} />
          <div style={{ width: `${UNALLOCATED_PCT}%`, background: COLOR_UNALLOCATED }} />
          <div style={{ width: `${otherPct}%`, background: COLOR_OTHER }} />
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-start gap-6 flex-wrap">
          {[
            { color: COLOR_ADVANCED, label: 'Allocated to your advanced Portfolios', usd: advancedUsd, pct: totalPct },
            { color: COLOR_UNALLOCATED, label: 'Unallocated ratio', usd: unallocatedUsd, pct: UNALLOCATED_PCT },
            { color: COLOR_OTHER, label: 'Allocated to other Portfolios', usd: otherUsd, pct: otherPct },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ background: item.color }} />
                <span className="tiktok-labelSm text-neutral-onSurface">{item.label}</span>
              </div>
              <span className="tiktok-labelLg text-neutral-highOnSurface">
                {item.usd.toLocaleString()}.00 USD ({item.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Table ─── */}
      <table className="w-full border border-neutral-fillLow text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className="bg-neutral-surface2">
            <th className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface border border-neutral-fillLow">
              Payment Portfolio
            </th>
            <th className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface border border-neutral-fillLow w-40">
              % allocated
            </th>
            <th className="text-left px-4 py-3 tiktok-labelLg text-neutral-highOnSurface border border-neutral-fillLow w-80">
              <span className="flex items-center gap-1">
                Allocated credit line breakdown
                <KsIconHelp size={14} className="text-neutral-lowOnSurface" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {pas.map((pa) => {
            const allocatedUsd = Math.round(TOTAL_CL * (pa.pct / 100));
            const usedPct = Math.round((USED_PER_PA / TOTAL_CL) * 100);
            const availableUsd = Math.max(0, allocatedUsd - USED_PER_PA);
            return (
              <tr key={pa.id} className="border-t border-neutral-fillLow">
                {/* Col 1: PA name */}
                <td className="px-4 py-4 border border-neutral-fillLow align-top">
                  <div className="flex items-center gap-2">
                    <span className="tiktok-bodySm text-neutral-highOnSurface">{pa.name}</span>
                    <KsTag variant="info" size="sm">Advanced</KsTag>
                  </div>
                  <div className="tiktok-labelSm text-neutral-onSurface mt-0.5">ID: {pa.id}</div>
                </td>

                {/* Col 2: % input */}
                <td className="px-4 py-4 border border-neutral-fillLow align-top">
                  <div className="flex items-center gap-0.5 border border-neutral-fillLow rounded bg-neutral-surface h-9 px-3 w-[120px]">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.01}
                      value={pa.pct}
                      onChange={(e) => handlePctChange(pa.id, e.target.value)}
                      className="flex-1 w-full min-w-0 outline-none bg-transparent tiktok-bodySm text-neutral-highOnSurface [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="tiktok-bodySm text-neutral-lowOnSurface flex-shrink-0">%</span>
                  </div>
                </td>

                {/* Col 3: breakdown */}
                <td className="px-4 py-4 border border-neutral-fillLow align-top">
                  <p className="tiktok-bodySm">
                    <span className="text-neutral-onSurface">Total allocated: </span>
                    <span className="text-neutral-highOnSurface">{allocatedUsd.toLocaleString()}.00 USD ({pa.pct}%)</span>
                  </p>
                  <p className="tiktok-bodySm mt-0.5">
                    <span className="text-neutral-onSurface">Used: </span>
                    <span className="text-neutral-highOnSurface">{USED_PER_PA}.00 USD ({usedPct}%)</span>
                  </p>
                  <p className="tiktok-bodySm mt-0.5">
                    <span className="text-neutral-onSurface">Available: </span>
                    <span className="text-neutral-highOnSurface">{availableUsd.toLocaleString()}.00 USD</span>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </KsModal>
  );
}
