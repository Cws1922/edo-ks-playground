import { KsIconHome, KsIconFolder, KsIconCatalog, KsIconViewReport, KsIconCreditCard, KsIconUser, KsIconBag, KsIconSearch, KsIconBell, KsIconHelp, KsIconChevronDown, KsIconPayment, KsIconCoupon, KsIconWallet, KsIconSwitch } from '@fe-infra/keystone-icons-react';

interface Props {
  children: React.ReactNode;
}

function IconNavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <div className={`w-10 h-10 flex items-center justify-center rounded cursor-pointer ${active ? 'bg-primary-surface1' : 'hover:bg-neutral-surface2'}`}>
      <span className={active ? 'text-primary-fill' : 'text-neutral-onSurface'}>{icon}</span>
    </div>
  );
}

function SubNavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 cursor-pointer rounded mx-1 ${active ? 'text-primary-onSurface' : 'text-neutral-onSurface hover:bg-neutral-surface2'}`}>
      <span className={`flex-shrink-0 ${active ? 'text-primary-fill' : 'text-neutral-lowOnSurface'}`}>{icon}</span>
      <span className="tiktok-labelMd">{label}</span>
    </div>
  );
}

export function TTAMShell({ children }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar */}
      <header className="h-[60px] bg-[#121415] flex items-center px-4 gap-3 flex-shrink-0 z-10">
        {/* Logo area */}
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
              <path d="M17.6 4.1a4.9 4.9 0 0 1-4.9-4.1h-3.5v13.7a2.9 2.9 0 1 1-2-2.8V7.3A6.4 6.4 0 1 0 13.7 13V8.8a8.4 8.4 0 0 0 3.9 1V6.3a4.9 4.9 0 0 1-3.9-2.2" fill="#121415"/>
            </svg>
          </div>
          <span className="text-white font-medium text-sm leading-none">Ads Manager</span>
        </div>
        <div className="flex-1" />
        {/* Right controls */}
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10">
          <KsIconSearch size={18} className="text-neutral-fill" />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 relative">
          <KsIconBell size={18} className="text-neutral-fill" />
          <span className="absolute top-0.5 right-0.5 bg-error-fill text-error-onFill text-[8px] font-medium rounded-full min-w-[14px] h-[14px] flex items-center justify-center px-0.5">2</span>
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10">
          <KsIconHelp size={18} className="text-neutral-fill" />
        </button>
        <div className="flex items-center gap-1.5 border border-[#3a3e4a] rounded px-2.5 py-1.5 cursor-pointer hover:border-[#5a5e6a] ml-1">
          <span className="text-white text-xs leading-none">upstream.land</span>
          <KsIconChevronDown size={12} className="text-[#9ca3af]" />
        </div>
        <div className="w-7 h-7 rounded-full bg-[#4a7c59] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">Y</div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Icon sidebar */}
        <aside className="w-[60px] bg-neutral-surface border-r border-neutral-fillLow flex flex-col items-center py-3 gap-0.5 flex-shrink-0">
          <IconNavItem icon={<KsIconHome size={20} />} />
          <IconNavItem icon={<KsIconFolder size={20} />} />
          <IconNavItem icon={<KsIconCatalog size={20} />} />
          <IconNavItem icon={<KsIconViewReport size={20} />} />
          <IconNavItem icon={<KsIconCreditCard size={20} />} active />
          <IconNavItem icon={<KsIconUser size={20} />} />
          <IconNavItem icon={<KsIconBag size={20} />} />
          <div className="mt-auto">
            <IconNavItem icon={
              <span className="flex gap-[3px] items-center">
                <span className="w-1 h-1 rounded-full bg-neutral-onSurface inline-block" />
                <span className="w-1 h-1 rounded-full bg-neutral-onSurface inline-block" />
                <span className="w-1 h-1 rounded-full bg-neutral-onSurface inline-block" />
              </span>
            } />
          </div>
        </aside>

        {/* Sub-nav */}
        <aside className="w-[140px] bg-neutral-surface border-r border-neutral-fillLow flex flex-col py-2 flex-shrink-0">
          <SubNavItem icon={<KsIconPayment size={14} />} label="Payment" active />
          <SubNavItem icon={<KsIconCoupon size={14} />} label="Promotions" />
          <SubNavItem icon={<KsIconWallet size={14} />} label="Invoices" />
          <SubNavItem icon={<KsIconSwitch size={14} />} label="Transactions" />
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto bg-neutral-surface2">
          {children}
        </main>
      </div>
    </div>
  );
}
