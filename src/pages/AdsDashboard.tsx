import { Header } from '@/layouts/Header';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { AttentionCard } from '@/components/dashboard/AttentionCard';
import { AccountInfoCard } from '@/components/dashboard/AccountInfoCard';
import { AdGroupStatusCard } from '@/components/dashboard/AdGroupStatusCard';
import { PerformanceCard } from '@/components/dashboard/PerformanceCard';

export default function AdsDashboard() {
  return (
    <div className="min-h-screen bg-neutral-surface2 pb-4">
      <Header />

      {/* Page Content - 1280px max width centered */}
      <div className="max-w-[1280px] mx-auto">
        {/* Page Header */}
        <PageHeader />

        {/* Main Layout */}
        <div className="flex flex-col gap-4 px-6 py-0">
          {/* Attention Needed Card */}
          <AttentionCard />

          {/* Account Info + Ad Group Status Row */}
          <div className="flex gap-4">
            <AccountInfoCard />
            <AdGroupStatusCard />
          </div>

          {/* Performance Card */}
          <PerformanceCard />
        </div>
      </div>
    </div>
  );
}
