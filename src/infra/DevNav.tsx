import { useNavigate, useLocation } from 'react-router-dom';
import { KsDropdownMenu, KsIconButton } from '@byted-keystone/react';
import { KsIconAllApplication } from '@fe-infra/keystone-icons-react';

const NAV_OPTIONS = [
  {
    group: true,
    groupLabel: 'Ads',
    value: '__ads',
    label: 'Ads',
    children: [
      { value: '/',           label: 'Dashboard' },
      { value: '/campaigns',  label: 'Campaigns' },
    ],
  },
  {
    group: true,
    groupLabel: 'Transactions',
    value: '__transactions',
    label: 'Transactions',
    children: [
      { value: '/transactions',     label: 'Transactions Index' },
      { value: '/transactions/d1',  label: 'D1 · Table View' },
      { value: '/transactions/d2',  label: 'D2 · Card View' },
      { value: '/transactions/d3',  label: 'D3 · Detail Drawer' },
    ],
  },
  {
    group: true,
    groupLabel: 'Payment',
    value: '__payment',
    label: 'Payment',
    children: [
      { value: '/payment/p1', label: 'P1 · Manage Portfolios' },
      { value: '/payment/p2', label: 'P2 · Payment Management' },
      { value: '/payment/p3', label: 'P3 · Payment Management (Adv. PA)' },
      { value: '/payment/p4', label: 'P4 · Card Sharing Notice' },
      { value: '/payment/p5', label: 'P5 · PA Naming Error' },
    ],
  },
  {
    group: true,
    groupLabel: 'Promotions',
    value: '__promotions',
    label: 'Promotions',
    children: [
      { value: '/payment/p6', label: 'S1 · Direction B+C+D' },
      { value: '/payment/p7', label: 'S2 · Solution A1 (3 States)' },
      { value: '/payment/p8', label: 'S3 · Solution A2 (Pending Payout)' },
    ],
  },
];

export default function DevNav() {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <div className="fixed bottom-5 left-5 z-[100000]">
      {/* popup width via CSS custom property on the host element */}
      <style>{`
        .dev-nav-dropdown::part(popup) { min-width: 300px; width: 300px; }
      `}</style>
      <KsDropdownMenu
        class="dev-nav-dropdown"
        selectable
        defaultOpen={false}
        placement="top-start"
        options={NAV_OPTIONS}
        value={[location.pathname]}
        onChange={(values: (string | number)[]) => {
          const path = values[0];
          if (path) navigate(String(path));
        }}
      >
        <KsIconButton
          variant="filled"
          size="lg"
          style={
            {
              '--ks-comp-button-border-radius': '9999px',
              borderRadius: '100%',
              boxShadow: 'var(--ks-elevation-shadow-level1, 0 2px 8px 0 rgba(0, 0, 0, 0.12))',
            } as React.CSSProperties
          }
        >
          <KsIconAllApplication />
        </KsIconButton>
      </KsDropdownMenu>
    </div>
  );
}
