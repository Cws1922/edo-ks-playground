import { KsText, KsButton, KsTag, KsDivider } from '@byted-keystone/react';
import { KsIconChevronRight } from '@fe-infra/keystone-icons-react';

interface Status {
  count: string;
  label: string;
  variant: 'success' | 'error' | 'warning';
}

const statuses: Status[] = [
  { count: '23', label: 'Active', variant: 'success' },
  { count: '18', label: 'Disapproved', variant: 'error' },
  { count: '2', label: 'Out of budget', variant: 'warning' },
];

export function AdGroupStatusCard() {
  return (
    <div className="bg-neutral-surface rounded-xl flex-1 flex flex-col">
      {/* Card Header */}
      <div className="pt-6 pb-4 px-6">
        <KsText variant="titleLg">Ad group status</KsText>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 flex flex-col gap-4">
        {statuses.map((status, index) => (
          <div key={status.label}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KsTag variant={status.variant} size="md">
                  {status.count}
                </KsTag>
                <KsText variant="labelLg">{status.label}</KsText>
              </div>
              <KsButton variant="text" size="md">
                View details
                <KsIconChevronRight size={16} />
              </KsButton>
            </div>
            {index < statuses.length - 1 && (
              <div className="mt-4">
                <KsDivider orientation="horizontal" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
