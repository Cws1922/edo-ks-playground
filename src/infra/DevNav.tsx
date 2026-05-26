import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { KsIconAllApplication } from '@fe-infra/keystone-icons-react';

const NAV_GROUPS = [
  {
    label: 'Ads',
    items: [
      { path: '/',           label: 'Dashboard' },
      { path: '/campaigns',  label: 'Campaigns' },
    ],
  },
  {
    label: 'Transactions',
    items: [
      { path: '/transactions',     label: 'Transactions Index' },
      { path: '/transactions/d1',  label: 'D1 · Table View' },
      { path: '/transactions/d2',  label: 'D2 · Card View' },
      { path: '/transactions/d3',  label: 'D3 · Detail Drawer' },
    ],
  },
  {
    label: 'Payment',
    items: [
      { path: '/payment/p1', label: 'P1 · Manage Portfolios' },
      { path: '/payment/p2', label: 'P2 · Payment Management' },
      { path: '/payment/p3', label: 'P3 · Payment Management (Adv. PA)' },
      { path: '/payment/p4', label: 'P4 · Card Sharing Notice' },
      { path: '/payment/p5', label: 'P5 · PA Naming Error' },
    ],
  },
  {
    label: 'Promotions',
    items: [
      { path: '/payment/p6', label: 'S1 · Direction B+C+D' },
      { path: '/payment/p7', label: 'S2 · Solution A1 (3 States)' },
      { path: '/payment/p8', label: 'S3 · Solution A2 (Pending Payout)' },
    ],
  },
];

export default function DevNav() {
  const navigate      = useNavigate();
  const location      = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-[100000]">
      {/* Popup panel — opens upward */}
      {open && (
        <>
          {/* Click-away backdrop */}
          <div className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />

          <div
            className="absolute bottom-14 left-0 w-[300px] bg-neutral-surface rounded-xl overflow-hidden"
            style={{ boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12), 0 2px 8px 0 rgba(0,0,0,0.08)' }}
          >
            {NAV_GROUPS.map((group, gi) => (
              <div key={group.label}>
                {gi > 0 && <div className="h-px bg-neutral-fillLow mx-3" />}
                <div className="px-3 pt-3 pb-1">
                  <span className="tiktok-labelSm text-neutral-lowOnSurface uppercase tracking-wide" style={{ fontSize: '11px' }}>
                    {group.label}
                  </span>
                </div>
                {group.items.map(item => {
                  const active = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => { navigate(item.path); setOpen(false); }}
                      className={`w-full text-left px-3 py-2 tiktok-bodySm rounded-lg mx-0 flex items-center justify-between transition-colors ${
                        active
                          ? 'bg-primary-surface1 text-primary-fill font-medium'
                          : 'text-neutral-highOnSurface hover:bg-neutral-surface2'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-fill shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
                <div className="pb-1" />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-10 h-10 rounded-full bg-neutral-highOnSurface text-neutral-surface flex items-center justify-center transition-opacity hover:opacity-80"
        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
      >
        <KsIconAllApplication size={20} />
      </button>
    </div>
  );
}
