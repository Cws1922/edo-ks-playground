import { useState } from 'react';
import { KsText, KsTabs, KsTabItem } from '@byted-keystone/react';
import { TransactionShell } from '@/components/transactions/TransactionShell';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionDrawer } from '@/components/transactions/TransactionDrawer';
import { FailedModal } from '@/components/transactions/FailedModal';
import { CustomColumnsModal } from '@/components/transactions/CustomColumnsModal';
import { FirstVisitModal } from '@/components/transactions/EducationVariants';
import { KpiCards } from '@/components/transactions/AboveTableCards';
import { FilterBar } from '@/components/transactions/FilterBar';
import { TRANSACTIONS, ALL_COLUMNS, type Transaction, type ColumnKey } from '@/data/transactions';

export default function TransactionsD3() {
  const [firstVisitOpen, setFirstVisitOpen] = useState(true);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [drawerTxn, setDrawerTxn] = useState<Transaction | null>(null);
  const [failedTxn, setFailedTxn] = useState<Transaction | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key),
  );

  return (
    <TransactionShell>
      <div className="flex items-center gap-3 mb-1">
        <KsText variant="titleLg" color="neutralHigh">Transactions</KsText>
        <span className="tiktok-labelSm bg-support-fillLow text-support-onFillLow px-2 py-0.5 rounded">
          D3 · KPI-led
        </span>
      </div>
      <KsText variant="bodySm" color="neutralLow">
        Medium 56px rows · KPI summary cards above table · first-visit modal education
      </KsText>

      <div className="mt-4">
        <KsTabs defaultActiveTabId="transactions" type="lite">
          <KsTabItem tabId="transactions"><span slot="header">Transactions</span></KsTabItem>
          <KsTabItem tabId="costs"><span slot="header">Costs</span></KsTabItem>
        </KsTabs>
      </div>

      <div className="mt-4">
        <KpiCards />

        <FilterBar onCustomColumns={() => setColumnsOpen(true)} />

        <TransactionTable
          data={TRANSACTIONS}
          density="medium"
          visibleColumns={visibleColumns}
          onRowClick={setDrawerTxn}
          onRecoveryClick={setFailedTxn}
        />
      </div>

      <FirstVisitModal open={firstVisitOpen} onClose={() => setFirstVisitOpen(false)} />
      <TransactionDrawer
        open={!!drawerTxn}
        transaction={drawerTxn}
        onClose={() => setDrawerTxn(null)}
      />
      <FailedModal
        open={!!failedTxn}
        transaction={failedTxn}
        onClose={() => setFailedTxn(null)}
      />
      <CustomColumnsModal
        open={columnsOpen}
        visibleColumns={visibleColumns}
        onChange={setVisibleColumns}
        onClose={() => setColumnsOpen(false)}
      />
    </TransactionShell>
  );
}
