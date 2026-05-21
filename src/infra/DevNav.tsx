import { useNavigate, useLocation } from 'react-router-dom';
import { KsDropdownMenu, KsIconButton } from '@byted-keystone/react';
import { KsIconAllApplication } from '@fe-infra/keystone-icons-react';

const NAV_OPTIONS = [
  { value: '/', label: 'Ads Dashboard' },
  { value: '/campaigns', label: 'Ads Campaign' },
  { value: '/transactions', label: 'Transactions' },
  { value: '/payment/p1', label: 'P1 · Manage Payment Portfolios' },
  { value: '/payment/p2', label: 'P2 · Payment Management' },
  { value: '/payment/p3', label: 'P3 · Payment Management (Advanced PA)' },
  { value: '/payment/p4', label: 'P4 · Card Sharing Notice (TTAM)' },
  { value: '/payment/p5', label: 'P5 · PA Naming Inline Error' },
];

export default function DevNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-5 left-5 z-[100000]">
      <KsDropdownMenu
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
