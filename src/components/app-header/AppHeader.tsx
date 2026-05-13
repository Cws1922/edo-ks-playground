import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { KsText, KsAvatar } from '@byted-keystone/react';
import { KsIconHamburger } from '@fe-infra/keystone-icons-react';

export type NavItem = { label: string; path: string };

export interface AppHeaderProps {
  /** Brand mark — typically an <img> with the TikTok logo. */
  logo?: React.ReactNode;
  /** Product name shown next to the logo (e.g., "Ads Manager"). */
  productName?: string;
  /** Path the brand area navigates to when clicked. Defaults to "/". */
  brandHref?: string;
  /** Show an avatar pill next to the hamburger when set. */
  userInitial?: string;
  /** Called when the hamburger is clicked. */
  onMenuClick?: () => void;
  /** Primary nav items rendered in the center. Omit for headers with no nav. */
  navItems?: NavItem[];
  /** Composed slot for the right side — icons, pills, account dropdowns, etc. */
  trailingActions?: React.ReactNode;
}

export function AppHeader({ logo, productName, brandHref = '/', userInitial, onMenuClick, navItems, trailingActions }: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const activePath = navItems?.find((item) => (item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)))?.path;

  return (
    <div className="bg-neutral-highOnSurface top-0 z-50">
      <div className="flex items-center h-[70px] px-6">
        {/* Left: menu + optional avatar + brand */}
        <div className="flex items-center">
          <button onClick={onMenuClick} className={clsx('h-9 rounded-full flex items-center cursor-pointer text-neutral-onFill bg-[#FFFFFF1F] hover:bg-[#FFFFFF33] transition-colors', userInitial ? 'pl-2.5 pr-1.5' : 'px-2.5')}>
            <KsIconHamburger size={18} />
            {userInitial && (
              <KsAvatar size="sm" className="ml-3">
                {userInitial}
              </KsAvatar>
            )}
          </button>

          {(logo || productName) && (
            <div className="flex items-end ml-3 pb-1 cursor-pointer" onClick={() => navigate(brandHref)}>
              {logo}
              {productName && (
                <span className="ml-1 whitespace-nowrap leading-none -mb-1.5 text-neutral-onFill">
                  <KsText variant="bodyMd" color="inherit">
                    {productName}
                  </KsText>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Center: primary nav */}
        {navItems && navItems.length > 0 && (
          <nav className="flex items-center ml-8 h-full">
            {navItems.map((item) => (
              <button key={item.path} onClick={() => navigate(item.path)} className="h-full px-3 border-0 cursor-pointer bg-transparent transition-colors flex items-center">
                <span className={clsx('inline-block pt-1 pb-0.5 border-b-2', activePath === item.path ? 'border-primary-fill text-neutral-onFill' : 'border-hidden text-neutral-fill')}>
                  <KsText variant="titleMd" color="inherit">
                    {item.label}
                  </KsText>
                </span>
              </button>
            ))}
          </nav>
        )}

        {/* Right: composed slot */}
        {trailingActions && <div className="flex items-center ml-auto gap-5 text-neutral-fill">{trailingActions}</div>}
      </div>
    </div>
  );
}
