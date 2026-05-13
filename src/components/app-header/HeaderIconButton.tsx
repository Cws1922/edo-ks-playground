export interface HeaderIconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}

/**
 * A single tappable icon in the header's trailing actions slot.
 * Examples: search, help, bell.
 */
export function HeaderIconButton({ icon, onClick, ariaLabel }: HeaderIconButtonProps) {
  return (
    <button onClick={onClick} aria-label={ariaLabel} className="cursor-pointer text-neutral-fill hover:text-neutral-onFill transition-colors bg-transparent border-0 p-0 flex items-center">
      {icon}
    </button>
  );
}
