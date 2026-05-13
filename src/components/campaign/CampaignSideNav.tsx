import { useState } from 'react';
import { KsText, KsDivider } from '@byted-keystone/react';
import { KsIconFolder, KsIconChevronRight } from '@fe-infra/keystone-icons-react';

interface NavItem {
  id: string;
  label: string;
  icon: boolean;
}

interface NavSection {
  items: NavItem[];
}

interface ManagementItem {
  id: string;
  label: string;
  hasArrow: boolean;
}

const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: 'campaign', label: 'Campaign', icon: true },
      { id: 'ad-group', label: 'Ad group', icon: true },
      { id: 'ad', label: 'Ad', icon: true },
    ],
  },
];

const MANAGEMENT_ITEMS: ManagementItem[] = [
  { id: 'bulk-export', label: 'Bulk export/import', hasArrow: true },
  { id: 'automated-rules', label: 'Automated rules', hasArrow: true },
];

export function CampaignSideNav() {
  const [activeItem, setActiveItem] = useState('campaign');

  return (
    <div className="bg-neutral-surface w-[240px] shrink-0 flex flex-col self-stretch">
      <div className="flex-1 flex flex-col gap-2 px-2 py-6">
        {/* Section 1: Campaign / Ad group / Ad */}
        <div className="flex flex-col gap-1">
          {NAV_SECTIONS[0].items.map((item) => (
            <button key={item.id} onClick={() => setActiveItem(item.id)} className={`flex items-center gap-2 h-10 px-2 rounded border-0 cursor-pointer w-full text-left ${activeItem === item.id ? 'bg-primary-surface2 text-primary-onSurface' : 'bg-transparent text-neutral-highOnSurface hover:bg-neutral-surfaceHover'}`}>
              <KsIconFolder size={16} color={activeItem === item.id ? '#017976' : '#121415'} />
              <KsText variant="labelLg" color={activeItem === item.id ? 'primary' : 'inherit'}>
                {item.label}
              </KsText>
            </button>
          ))}
        </div>

        <KsDivider orientation="horizontal" />

        {/* Section 2: Management */}
        <div className="flex flex-col gap-1">
          <div className="h-9 flex items-center px-2">
            <KsText variant="labelSm" color="neutral">
              Management
            </KsText>
          </div>
          {MANAGEMENT_ITEMS.map((item) => (
            <button key={item.id} className="flex items-center justify-between h-10 px-2 rounded border-0 cursor-pointer w-full bg-transparent text-neutral-highOnSurface hover:bg-neutral-surfaceHover">
              <KsText variant="labelLg">{item.label}</KsText>
              {item.hasArrow && <KsIconChevronRight size={14} color="#121415" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
