import { Header } from '@/layouts/Header';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  KsIconFilledLock,
  KsIconDocumentFile,
  KsIconChart,
} from '@fe-infra/keystone-icons-react';

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

const SIDE_ITEMS: SidebarItem[] = [
  { label: 'My account', icon: <KsIconFilledLock size={16} /> },
  { label: 'Documents', icon: <KsIconDocumentFile size={16} /> },
];

interface TransactionShellProps {
  children: React.ReactNode;
}

const DIRECTION_LINKS = [
  { label: 'D1 · Quick Scan',        href: '/transactions/d1' },
  { label: 'D2 · Immersive Reading', href: '/transactions/d2' },
  { label: 'D3 · KPI-led',           href: '/transactions/d3' },
];

export function TransactionShell({ children }: TransactionShellProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-neutral-surface2 flex flex-col">
      <Header />

      {/* Direction switcher strip */}
      <div className="bg-neutral-surface px-6 py-2 border-b border-neutral-fillLow flex items-center gap-2 text-sm">
        <Link to="/transactions" className="tiktok-labelMd text-neutral-lowOnSurface mr-2 hover:underline">
          ← Lo-fi Index
        </Link>
        <span className="tiktok-labelMd text-neutral-lowOnSurface mr-2">|  Direction:</span>
        {DIRECTION_LINKS.map((d) => {
          const active = location.pathname.startsWith(d.href);
          return (
            <Link
              key={d.href}
              to={d.href}
              className={clsx(
                'tiktok-labelMd px-3 py-1 rounded-md transition-colors',
                active
                  ? 'bg-primary-fill text-primary-onFill'
                  : 'text-neutral-highOnSurface hover:bg-neutral-fillLow',
              )}
            >
              {d.label}
            </Link>
          );
        })}
        <span className="ml-auto tiktok-labelMd text-neutral-lowOnSurface">
          Critique snapshot · S-level project
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-[220px] bg-neutral-surface border-r border-neutral-fillLow flex-shrink-0">
          <div className="px-4 py-4">
            <div className="tiktok-titleSm text-neutral-highOnSurface mb-3">Account setting</div>
            {SIDE_ITEMS.map((item) => (
              <div key={item.label} className="mb-2">
                <div className="flex items-center gap-2 px-2 py-2 text-neutral-highOnSurface tiktok-labelMd">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
            <div className="mb-2">
              <div className="flex items-center gap-2 px-2 py-2 text-neutral-highOnSurface tiktok-labelMd">
                <KsIconChart size={16} />
                <span>Finance</span>
              </div>
              {['Payment', 'Promotions', 'Invoices'].map((sub) => (
                <div
                  key={sub}
                  className="pl-8 pr-2 py-2 tiktok-labelMd text-neutral-highOnSurface hover:bg-neutral-fillLow cursor-pointer rounded-md"
                >
                  {sub}
                </div>
              ))}
              <div className="pl-8 pr-2 py-2 tiktok-labelMd text-primary-onFillLow bg-primary-fillLow rounded-md border-l-[3px] border-primary-fill -ml-[3px]">
                Transactions
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
