import { KsButton } from '@byted-keystone/react';
import { KsIconFilter, KsIconCalendar, KsIconDownload, KsIconGear } from '@fe-infra/keystone-icons-react';

interface FilterBarProps {
  onCustomColumns: () => void;
}

export function FilterBar({ onCustomColumns }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <KsButton variant="default" size="sm">
        <KsIconFilter slot="prefix-icon" size={14} />
        Filters
      </KsButton>
      <KsButton variant="default" size="sm">
        <KsIconCalendar slot="prefix-icon" size={14} />
        UTC+8 · 2025-07-01 ~ 2025-09-28
      </KsButton>
      <div className="flex-1" />
      <KsButton variant="default" size="sm">
        <KsIconDownload slot="prefix-icon" size={14} />
        Export
      </KsButton>
      <KsButton variant="default" size="sm" onClick={onCustomColumns}>
        <KsIconGear slot="prefix-icon" size={14} />
        Custom columns
      </KsButton>
    </div>
  );
}
