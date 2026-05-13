import { KsTable, KsPagination, KsSwitch, KsText } from '@byted-keystone/react';
import { KsIconSmartPlus, KsIconHelp } from '@fe-infra/keystone-icons-react';

interface CampaignRow {
  id: string;
  on: boolean;
  name: string;
  budget: string;
  budgetSub: string;
  purchaseOrder: string;
  cost: string;
  cpc: string;
  smart: boolean;
}

interface Column<T, K extends keyof T = keyof T> {
  key: K;
  title: string;
  width: number;
  render?: (value: T[K], row: T) => React.ReactNode;
}

type ColumnOf<T> = { [K in keyof T]: Column<T, K> }[keyof T];

const CAMPAIGN_DATA: CampaignRow[] = [
  {
    id: '1',
    on: true,
    name: 'App promotion20241011153405',
    budget: 'All',
    budgetSub: '',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '2',
    on: true,
    name: 'Product Sales..',
    budget: '1.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '3',
    on: true,
    name: 'for test',
    budget: '1.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '4',
    on: true,
    name: 'Traffic20241011152016',
    budget: 'All',
    budgetSub: '',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '5',
    on: true,
    name: 'Product Sales_autotest_wangs)  _202..',
    budget: 'All',
    budgetSub: '',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '6',
    on: true,
    name: 'App promotion20240112142000',
    budget: '51.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: true,
  },
  {
    id: '7',
    on: true,
    name: 'Lead generation smart+',
    budget: '50.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: true,
  },
  {
    id: '8',
    on: true,
    name: 'Sales20241011151024',
    budget: '50.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '9',
    on: true,
    name: 'App promotion20240112142000',
    budget: 'All',
    budgetSub: '',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
  {
    id: '10',
    on: true,
    name: '1799198834812946',
    budget: '51.00 USD',
    budgetSub: 'Daily, Campaign bud...',
    purchaseOrder: '-',
    cost: '0.00 USD',
    cpc: '0.00 USD',
    smart: false,
  },
];

const columns: ColumnOf<CampaignRow>[] = [
  {
    key: 'on',
    title: 'On/Off',
    width: 80,
    render: () => <KsSwitch size="sm" defaultChecked />,
  },
  {
    key: 'name',
    title: 'Name',
    width: 290,
    render: (value, row) => (
      <div className="flex items-start gap-1">
        {row.smart && <KsIconSmartPlus size={14} color="#009995" className="mt-0.5 shrink-0" />}
        <span>{value}</span>
      </div>
    ),
  },
  {
    key: 'budget',
    title: 'Budget',
    width: 190,
    render: (value, row) => (
      <div className="flex flex-col">
        <span>{value}</span>
        {row.budgetSub && <span className="tiktok-labelSm text-neutral-lowOnSurface">{row.budgetSub}</span>}
      </div>
    ),
  },
  {
    key: 'purchaseOrder',
    title: 'Purchase Order number',
    width: 200,
  },
  {
    key: 'cost',
    title: 'Cost',
    width: 140,
  },
  {
    key: 'cpc',
    title: 'CPC  (destination)',
    width: 170,
  },
];

export function CampaignTable() {
  return (
    <div className="flex-1 flex flex-col p-6 overflow-auto bg-neutral-surface">
      <KsTable
        columns={columns}
        dataSource={CAMPAIGN_DATA}
        size="md"
        pagination={false}
        rowSelection={{
          type: 'checkbox',
        }}
      />

      {/* Totals + Pagination */}
      <div className="flex items-center justify-between border-t border-neutral-fillLow pt-4 mt-2">
        <div className="flex items-center gap-1">
          <KsText variant="labelLg">Total of 1133 campaigns</KsText>
          <KsIconHelp size={14} color="#87898b" />
        </div>
        <KsPagination total={1133} defaultPageSize={200} pageSizeOptions={[50, 100, 200]} showPageSizeChanger size="sm" />
      </div>
    </div>
  );
}
