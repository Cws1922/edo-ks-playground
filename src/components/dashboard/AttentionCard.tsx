import { KsText, KsLink, KsIconButton, KsStatusIcon } from '@byted-keystone/react';
import { KsIconClose, KsIconChevronLeft, KsIconChevronRight } from '@fe-infra/keystone-icons-react';

interface Alert {
  variant: 'error' | 'warning' | 'info';
  bgClass: string;
  title: string;
  description: string;
  links: string[];
}

const alerts: Alert[] = [
  {
    variant: 'error',
    bgClass: 'bg-error-surface2',
    title: 'Account suspended',
    description: 'Add your address information, to make your cost accurate.',
    links: ['Fix it', 'Learn more'],
  },
  {
    variant: 'warning',
    bgClass: 'bg-warning-surface2',
    title: 'More info required',
    description: 'Account balance is not sufficient, top up to prevent ad delivery pause.',
    links: ['Fix it', 'Learn more'],
  },
  {
    variant: 'info',
    bgClass: 'bg-primary-surface2',
    title: 'System update',
    description: 'Complete your tax information, to make your cost accurate.',
    links: ['Learn more', 'Ok'],
  },
];

export function AttentionCard() {
  return (
    <div className="bg-neutral-surface rounded-xl pb-2">
      {/* Card Header */}
      <div className="flex items-center justify-between pt-6 pb-4 px-6">
        <KsText variant="headlineSm">Attention needed</KsText>
        <div className="flex items-center gap-2">
          <button className="bg-transparent border-0 cursor-pointer p-1 text-neutral-lowOnSurface">
            <KsIconChevronLeft size={16} color="#87898b" />
          </button>
          <KsText variant="bodySm" color="neutral">
            1 / 3
          </KsText>
          <button className="bg-transparent border-0 cursor-pointer p-1 text-neutral-lowOnSurface">
            <KsIconChevronRight size={16} color="#87898b" />
          </button>
        </div>
      </div>

      {/* Alert Banners */}
      <div className="px-6 pb-4">
        <div className="flex gap-4">
          {alerts.map((alert) => (
            <div key={alert.title} className={`${alert.bgClass} flex-1 flex gap-2 p-4 rounded`}>
              <div className="shrink-0 h-6 flex items-center">
                <KsStatusIcon variant={alert.variant} size="md" />
              </div>
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                <KsText variant="titleMd">{alert.title}</KsText>
                <KsText variant="bodySm">{alert.description}</KsText>
                <div className="flex gap-4 items-center">
                  {alert.links.map((link, i) => (
                    <span key={link}>
                      {i > 0 && <span className="text-neutral-lowOnSurface mr-4">|</span>}
                      <KsLink variant="dotted" size="md">
                        {link}
                      </KsLink>
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0">
                <KsIconButton size="xs" variant="text">
                  <KsIconClose size={14} />
                </KsIconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
