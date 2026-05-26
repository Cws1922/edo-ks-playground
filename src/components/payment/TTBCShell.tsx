import { useNavigate, useLocation } from 'react-router-dom';
import { KsText, KsSideNavigation, KsNavItem, KsSubNavigation } from '@byted-keystone/react';
import {
  KsIconHome,
  KsIconPeople,
  KsIconChevronDown,
  KsIconApplications,
  KsIconChart,
  KsIconLog,
  KsIconGear,
  KsIconBell,
  KsIconHelp,
} from '@fe-infra/keystone-icons-react';
import tiktokLogo from '@/assets/tiktok-logo.svg';

interface NavItem {
  label: string;
  href: string;
}
interface NavGroup {
  icon: React.ReactNode;
  label: string;
  items?: NavItem[];
  href?: string;
}

const NAV_GROUPS: NavGroup[] = [
  { icon: <KsIconHome size={16} />, label: 'Home', href: '#' },
  {
    icon: <KsIconPeople size={16} />,
    label: 'Users',
    items: [
      { label: 'Members', href: '#' },
      { label: 'Partners', href: '#' },
    ],
  },
  {
    icon: <KsIconApplications size={16} />,
    label: 'Assets',
    items: [
      { label: 'Ad Accounts', href: '#' },
      { label: 'Audience', href: '#' },
    ],
  },
  {
    icon: <KsIconChart size={16} />,
    label: 'Finance',
    items: [
      { label: 'Manage Portfolios', href: '/payment/p1' },
      { label: 'Payment Management', href: '/payment/p2' },
      { label: 'Transactions', href: '#' },
      { label: 'Invoices', href: '#' },
    ],
  },
  { icon: <KsIconLog size={16} />, label: 'Activity Log', href: '#' },
  {
    icon: <KsIconGear size={16} />,
    label: 'Business Settings',
    items: [
      { label: 'Settings', href: '#' },
      { label: 'Verification', href: '#' },
    ],
  },
];

export function TTBCShell({ children, showSidebar = false }: { children: React.ReactNode; showSidebar?: boolean }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-surface2 flex flex-col">
      {/* Topbar */}
      <header className="bg-neutral-highOnSurface h-[52px] flex items-center px-4 gap-3 flex-shrink-0 z-50 sticky top-0">
        <button className="w-8 h-8 rounded flex items-center justify-center text-neutral-onFill hover:bg-white/10 transition-colors">
          <span className="text-base font-medium">≡</span>
        </button>
        <div className="flex items-center gap-1">
          <img src={tiktokLogo} alt="TikTok" width={70} className="select-none brightness-0 invert" draggable={false} />
          <KsText variant="bodyMd" color="inherit" className="text-neutral-fill">
            : Business Center
          </KsText>
        </div>
        <div className="flex-1" />
        <button className="w-8 h-8 flex items-center justify-center text-neutral-fill hover:text-white transition-colors">
          <KsIconBell size={20} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-neutral-fill hover:text-white transition-colors">
          <KsIconHelp size={20} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded text-neutral-fill text-sm hover:bg-white/20 transition-colors">
          The Best Company
          <KsIconChevronDown size={12} />
        </button>
      </header>

      {showSidebar ? (
        <div className="flex flex-1 overflow-hidden">
          <aside className="w-40 bg-neutral-surface border-r border-neutral-fillLow overflow-y-auto flex-shrink-0">
            <KsSideNavigation>
              {NAV_GROUPS.map((group) =>
                group.items?.length ? (
                  <KsSubNavigation
                    key={group.label}
                    size="sm"
                    defaultExpand={group.items.some(i => location.pathname.startsWith(i.href))}
                  >
                    <span slot="prefix">{group.icon}</span>
                    <span slot="title">{group.label}</span>
                    {group.items.map((item) => (
                      <KsNavItem
                        key={item.label}
                        size="sm"
                        level={1}
                        active={location.pathname.startsWith(item.href) && item.href !== '#'}
                        onClick={() => navigate(item.href)}
                      >
                        {item.label}
                      </KsNavItem>
                    ))}
                  </KsSubNavigation>
                ) : (
                  <KsNavItem
                    key={group.label}
                    size="sm"
                    active={group.href ? location.pathname === group.href : false}
                    onClick={() => group.href && navigate(group.href)}
                  >
                    <span slot="prefix">{group.icon}</span>
                    {group.label}
                  </KsNavItem>
                )
              )}
            </KsSideNavigation>
          </aside>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      ) : (
        <main className="flex-1 overflow-auto">{children}</main>
      )}
    </div>
  );
}
