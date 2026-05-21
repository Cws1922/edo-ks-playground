/**
 * Shared transactions data for D1 / D2 / D3 directions.
 * Mock data — represents the Transaction page redesign mockups.
 */

export type TransactionStatus = 'success' | 'pending' | 'failed';

export type TransactionMajor =
  | 'General activities'
  | 'Order payments'
  | 'Promotions'
  | 'Transfer';

export interface Transaction {
  id: string;
  time: string;            // 2026-05-12 14:30
  typeMajor: TransactionMajor;
  typeSub: string;         // Add balance / Bill payment / ...
  accountId: string;
  description: string;
  document: string | null; // BDIDN2026004060 or null
  status: TransactionStatus;
  cashBalance: number | null;    // signed; null = '—'
  creditBalance: number | null;  // signed; null = '—'
  paymentMethod: string;
  referenceNo: string;
  operator: string;
  failureReason?: string;
  failureCode?: string;
}

export const ALL_COLUMNS = [
  { key: 'time',           label: 'Transaction time',  locked: true,  defaultVisible: true },
  { key: 'type',           label: 'Transaction type',  locked: false, defaultVisible: true },
  { key: 'accountId',      label: 'Account ID',        locked: false, defaultVisible: true },
  { key: 'description',    label: 'Description',       locked: false, defaultVisible: true },
  { key: 'document',       label: 'Document',          locked: false, defaultVisible: true },
  { key: 'status',         label: 'Status',            locked: false, defaultVisible: true },
  { key: 'cashBalance',    label: 'Cash balance',      locked: false, defaultVisible: true },
  { key: 'creditBalance',  label: 'Credit balance',    locked: false, defaultVisible: true },
  { key: 'adCredit',       label: 'Ad credit',         locked: false, defaultVisible: false },
  { key: 'transactionId',  label: 'Transaction ID',    locked: false, defaultVisible: false },
  { key: 'operator',       label: 'Operator',          locked: false, defaultVisible: false },
  { key: 'action',         label: 'Action',            locked: true,  defaultVisible: true },
] as const;

export type ColumnKey = (typeof ALL_COLUMNS)[number]['key'];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN20260515100000005',
    time: '2026-05-15 10:00',
    typeMajor: 'General activities',
    typeSub: 'Add balance',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Credit or debit card · Visa ••1234',
    document: null,
    status: 'failed',
    cashBalance: null,
    creditBalance: null,
    paymentMethod: 'Visa ••1234',
    referenceNo: '—',
    operator: 'demo.user@bytedance.com',
    failureReason: 'Your card was declined by the issuer',
    failureCode: '51 (insufficient_funds)',
  },
  {
    id: 'TXN20260512143025001',
    time: '2026-05-12 14:30',
    typeMajor: 'General activities',
    typeSub: 'Add balance',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Bank transfer',
    document: null,
    status: 'success',
    cashBalance: 5000.00,
    creditBalance: null,
    paymentMethod: 'Bank transfer',
    referenceNo: 'BNK-2026-05-12-001',
    operator: 'demo.user@bytedance.com',
  },
  {
    id: 'TXN20260510091532001',
    time: '2026-05-10 09:15',
    typeMajor: 'General activities',
    typeSub: 'Bill payment',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Paid by cash balance',
    document: 'BDIDN2026004060',
    status: 'success',
    cashBalance: -1021.78,
    creditBalance: 1021.78,
    paymentMethod: 'Cash balance',
    referenceNo: 'BILL-2026-05-10-007',
    operator: 'system',
  },
  {
    id: 'TXN20260509035500015',
    time: '2026-05-09 03:55',
    typeMajor: 'Order payments',
    typeSub: 'Order budget payment',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Campaign: Summer Sale · ID 1844040862948466',
    document: null,
    status: 'success',
    cashBalance: -2304.44,
    creditBalance: null,
    paymentMethod: '—',
    referenceNo: 'ORD-2026-05-09-002',
    operator: 'system',
  },
  {
    id: 'TXN20260507223017002',
    time: '2026-05-07 22:30',
    typeMajor: 'General activities',
    typeSub: 'Add balance',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Credit or debit card · Visa ••1234',
    document: 'BDIDN2026004060',
    status: 'success',
    cashBalance: 1000.00,
    creditBalance: null,
    paymentMethod: 'Visa ••1234',
    referenceNo: 'BNK-2026-05-07-001',
    operator: 'demo.user@bytedance.com',
  },
  {
    id: 'TXN20260505110000010',
    time: '2026-05-05 11:00',
    typeMajor: 'General activities',
    typeSub: 'Refund',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Credit or debit card',
    document: null,
    status: 'success',
    cashBalance: 250.00,
    creditBalance: null,
    paymentMethod: 'Visa ••1234',
    referenceNo: 'REF-2026-05-05-003',
    operator: 'system',
  },
  {
    id: 'TXN20260503162500004',
    time: '2026-05-03 16:25',
    typeMajor: 'Promotions',
    typeSub: 'Issued',
    accountId: 'TTAM Demo · 72391499277',
    description: 'Coupon code: SUMMER2025',
    document: null,
    status: 'success',
    cashBalance: null,
    creditBalance: null,
    paymentMethod: '—',
    referenceNo: 'PRM-2026-05-03-001',
    operator: 'system',
  },
  {
    id: 'TXN20260501090000007',
    time: '2026-05-01 09:00',
    typeMajor: 'Transfer',
    typeSub: 'Transfer in',
    accountId: 'TTAM Demo · 72391499277',
    description: 'from BC: 12345',
    document: null,
    status: 'success',
    cashBalance: 800.00,
    creditBalance: null,
    paymentMethod: '—',
    referenceNo: 'TRF-2026-05-01-009',
    operator: 'bc.admin@bytedance.com',
  },
];

// KPI computed values (cached)
export const KPI = {
  totalSpend: 12547.89,
  totalTxn: TRANSACTIONS.length,
  activeCampaigns: 5,
  pendingFailed: { pending: 0, failed: 1 },
};

// Highlight cards data (D2)
export const HIGHLIGHTS = {
  mostRecent: TRANSACTIONS.find((t) => t.status === 'success'),
  pending: { title: 'Bill payment processing', detail: 'Started 2h ago · TTAM Demo' },
  needsAttention: TRANSACTIONS.find((t) => t.status === 'failed'),
};

export function formatAmount(value: number | null, options?: { sign?: boolean; currency?: string }) {
  if (value === null || value === undefined) return '—';
  const sign = options?.sign !== false;
  const currency = options?.currency ?? 'USD';
  const abs = Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (!sign) return `${abs} ${currency}`;
  return `${value >= 0 ? '+' : '-'}${abs} ${currency}`;
}
