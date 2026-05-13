import { KsText } from '@byted-keystone/react';
import { KsIconChevronDown } from '@fe-infra/keystone-icons-react';

export interface HeaderAccountDropdownProps {
  label: string;
  onClick?: () => void;
  /** Defaults to 200px. */
  width?: number;
}

/**
 * Bordered rectangular dropdown used by Ads Manager-style headers.
 * Visually distinct from HeaderPillButton: use this when the account selector
 * is the dominant right-side affordance, not one of several utility pills.
 */
export function HeaderAccountDropdown({ label, onClick, width = 200 }: HeaderAccountDropdownProps) {
  return (
    <button onClick={onClick} style={{ width }} className="flex items-center justify-between rounded cursor-pointer shrink-0 text-neutral-onFill border border-neutral-onFill p-2.5">
      <span className="truncate min-w-10 pr-12">
        <KsText variant="labelSm" color="inherit">
          {label}
        </KsText>
      </span>
      <KsIconChevronDown size={14} />
    </button>
  );
}
