import { Header } from '@/layouts/Header';
import { CampaignToolbar } from '@/components/campaign/CampaignToolbar';
import { CampaignSideNav } from '@/components/campaign/CampaignSideNav';
import { CampaignTable } from '@/components/campaign/CampaignTable';

export default function AdsCampaign() {
  return (
    <div className="min-h-screen bg-neutral-surface2 flex flex-col">
      <Header />

      {/* Toolbar */}
      <CampaignToolbar />

      {/* Side Nav + Table Content */}
      <div className="flex flex-1 overflow-hidden">
        <CampaignSideNav />
        <div className="p-5">
          <CampaignTable />
        </div>
      </div>
    </div>
  );
}
