import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { KsText } from '@byted-keystone/react';
import {
  KsIconHome,
  KsIconPeople,
  KsIconChevronDown,
  KsIconChevronRight,
  KsIconApplications,
  KsIconChart,
  KsIconLog,
  KsIconGear,
  KsIconBell,
  KsIconHelp,
  KsIconChevronUp,
} from '@fe-infra/keystone-icons-react';
import tiktokLogo from '@/assets/tiktok-logo.svg';

interface NavGroupItem {
  label: string;
  href?: string;
  active?: boolean;
}
interface NavGroup {
  icon: React.ReactNode;
  label: string;
  items?: NavGroupItem[];
  href?: string;
}

function SidebarGroup({
  group,
  activeHref,
}: {
  group: NavGroup;
  activeHref: string;
}) {
  const hasChildren = group.items && group.items.length > 0;
  const isParentActive = group.items?.some((i) => i.href && activeHref.startsWith(i.href));
  const [open, setOpen] = useState(isParentActive ?? false);

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen((o) => !o)}
        className={clsx(
          'w-full flex items-center gap-2 px-3 py-2 text-left transition-colors rounded-none',
          isParentActive
            ? 'text-primary-fill bg-primary-fillLow font-medium'
            : 'text-neutral-highOnSurface hover:bg-neutral-fillLow',
        )}
      >
        <span className={clsx('flex-shrink-0', isParentActive ? 'text-primary-fill' : 'text-neutral-lowOnSurface')}>
          {group.icon}
        </span>
        <span className="tiktok-labelLg flex-1">{group.label}</span>
        {hasChildren && (
          <span className="text-neutral-lowOnSurface">
            {open ? <KsIconChevronUp size={14} /> : <KsIconChevronDown size={14} />}
          </span>
        )}
      </button>
      {hasChildren && open && (
        <div className="pl-8 pr-2">
          {group.items!.map((item) => {
            const isActive = item.href ? activeHref.startsWith(item.href) : false;
            return (
              <Link
                key={item.label}
                to={item.href ?? '#'}
                className={clsx(
                  'block px-3 py-1.5 tiktok-bodySm rounded-md transition-colors',
                  isActive
                    ? 'text-primary-fill bg-primary-fillLow font-medium'
                    : 'text-neutral-onSurface hover:bg-neutral-fillLow',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
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
  {
    icon: <KsIconLog size={16} />,
    label: 'Activity Log',
    items: [],
  },
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
          <aside className="w-40 bg-neutral-surface border-r border-neutral-fillLow overflow-y-auto flex-shrink-0 py-2">
            {NAV_GROUPS.map((group) => (
              <SidebarGroup key={group.label} group={group} activeHref={location.pathname} />
            ))}
          </aside>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      ) : (
        <main className="flex-1 overflow-auto">{children}</main>
      )}
    </div>
  );
}
