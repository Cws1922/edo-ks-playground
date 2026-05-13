import { KsText } from '@byted-keystone/react';

export interface HeaderPillButtonProps {
  /** Icon or avatar before the label. */
  leading?: React.ReactNode;
  /** Typically a chevron. */
  trailing?: React.ReactNode;
  /** Label content. */
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Rounded pill used for locale switchers, credit counters,
 * and account-with-avatar affordances in the header trailing slot.
 */
export function HeaderPillButton({ leading, trailing, children, onClick }: HeaderPillButtonProps) {
  return (
    <button onClick={onClick} className="h-9 rounded-full flex items-center gap-2 px-3 cursor-pointer text-neutral-onFill bg-[#FFFFFF1F] hover:bg-[#FFFFFF33] transition-colors">
      {leading}
      <KsText variant="labelMd" color="inherit">
        {children}
      </KsText>
      {trailing}
    </button>
  );
}
