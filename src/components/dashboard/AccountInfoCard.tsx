import { KsText, KsButton, KsDivider } from '@byted-keystone/react';
import { KsIconChevronRight, KsIconHelp } from '@fe-infra/keystone-icons-react';

export function AccountInfoCard() {
  return (
    <div className="bg-neutral-surface rounded-xl flex-1 flex flex-col">
      {/* Card Header */}
      <div className="pt-6 pb-4 px-6">
        <KsText variant="titleLg">Account info</KsText>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 flex-1 flex flex-col gap-4">
        {/* Available Balance */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <KsText variant="titleSm">Available balance</KsText>
              <KsIconHelp size={14} color="#87898b" />
            </div>
            <div className="flex items-baseline gap-1">
              <KsText variant="headlineLg">15,546.86</KsText>
              <KsText variant="bodySm" color="neutral">
                USD
              </KsText>
            </div>
          </div>
          <KsButton variant="text" size="md">
            Manage payment
            <KsIconChevronRight size={16} />
          </KsButton>
        </div>

        <KsDivider orientation="horizontal" />

        {/* Today's Spend */}
        <div className="flex flex-col gap-2">
          <KsText variant="titleSm">Today's spend</KsText>
          <div className="flex items-baseline gap-1">
            <KsText variant="headlineLg">18,000.00</KsText>
            <KsText variant="bodySm" color="neutral">
              USD
            </KsText>
          </div>
        </div>
      </div>
    </div>
  );
}
