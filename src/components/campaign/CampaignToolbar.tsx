import { KsButton, KsInput, KsDateRangePicker, KsDivider } from '@byted-keystone/react';
import { KsIconPlus, KsIconSearch, KsIconCustomColumn, KsIconCompare, KsIconMoreHorizontal } from '@fe-infra/keystone-icons-react';

export function CampaignToolbar() {
  return (
    <div className="bg-neutral-surface relative shadow-2">
      <div className="flex items-center gap-2 px-6 py-2">
        <KsButton variant="primary" size="md">
          <KsIconPlus size={16} />
          Create
        </KsButton>

        <div className="flex-1">
          <KsInput placeholder="Search & filter (/) | Tips: Metric filters are available in table header" size="md">
            <KsIconSearch size={16} slot="suffix" />
          </KsInput>
        </div>

        <KsDateRangePicker defaultValue={['2024-10-04', '2024-10-11']} />

        <KsButton variant="default" size="md">
          <KsIconCompare size={16} />
          Compare dates
        </KsButton>

        <KsButton variant="default" size="md">
          <KsIconCustomColumn size={16} />
          Custom table
        </KsButton>

        <KsButton variant="default" size="md" iconOnly>
          <KsIconMoreHorizontal size={16} />
        </KsButton>
      </div>
      <KsDivider orientation="horizontal" />
    </div>
  );
}
