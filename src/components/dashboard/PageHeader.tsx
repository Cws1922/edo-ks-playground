import { KsText, KsButton } from '@byted-keystone/react';
import { KsIconLog } from '@fe-infra/keystone-icons-react';

export function PageHeader() {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <KsText variant="headlineLg">Good morning, Viola!</KsText>
          <KsText variant="bodySm" color="neutral">
            Here's what's happening with your account today.
          </KsText>
        </div>
      </div>
      <div className="flex gap-2">
        <KsButton variant="default" size="md">
          <KsIconLog size={16} />
          log
        </KsButton>
        <KsButton variant="primary" size="md">
          Create ad
        </KsButton>
      </div>
    </div>
  );
}
