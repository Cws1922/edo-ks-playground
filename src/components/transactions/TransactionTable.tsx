import { KsTag, KsButton, KsTooltip, KsStatusDot } from '@byted-keystone/react';
import type { Transaction, TransactionStatus, ColumnKey } from '@/data/transactions';
import { ALL_COLUMNS, formatAmount } from '@/data/transactions';
import { clsx } from 'clsx';

export type Density = 'compact' | 'medium' | 'spacious';

const ROW_PADDING: Record<Density, string> = {
  compact: 'py-2',
  medium: 'py-3',
  spacious: 'py-5',
};

const STATUS_VARIANT: Record<TransactionStatus, 'success' | 'warning' | 'error'> = {
  success: 'success',
  pending: 'warning',
  failed: 'error',
};

const STATUS_LABEL: Record<TransactionStatus, string> = {
  success: 'Success',
  pending: 'Pending',
  failed: 'Failed',
};

interface TransactionTableProps {
  data: Transaction[];
  density: Density;
  visibleColumns: ColumnKey[];
  pillStatus?: boolean;
  onRowClick?: (row: Transaction) => void;
  onRecoveryClick?: (row: Transaction) => void;
}

export function TransactionTable({
  data,
  density,
  visibleColumns,
  pillStatus = false,
  onRowClick,
  onRecoveryClick,
}: TransactionTableProps) {
  const isSpacious = density === 'spacious';
  const padY = ROW_PADDING[density];

  // Filter ALL_COLUMNS preserving the order of visibleColumns so the order matches user intent
  const orderedCols = visibleColumns
    .map((k) => ALL_COLUMNS.find((c) => c.key === k))
    .filter((c): c is (typeof ALL_COLUMNS)[number] => Boolean(c));

  const renderCell = (col: (typeof ALL_COLUMNS)[number], row: Transaction): React.ReactNode => {
    switch (col.key) {
      case 'time':
        return <span className="tiktok-bodySm text-neutral-highOnSurface">{row.time}</span>;
      case 'type':
        return (
          <div className="flex flex-col gap-0.5">
            <span className={clsx('text-neutral-highOnSurface', isSpacious ? 'tiktok-titleSm' : 'tiktok-labelLg')}>{row.typeSub}</span>
            <span className="tiktok-labelSm text-neutral-lowOnSurface">{row.typeMajor}</span>
          </div>
        );
      case 'accountId':
        return <span className="tiktok-bodySm text-neutral-highOnSurface">{row.accountId}</span>;
      case 'description':
        return <span className="tiktok-bodySm text-neutral-onSurface">{row.description}</span>;
      case 'document':
        return row.document
          ? <a className="tiktok-bodySm text-primary-onFill hover:underline cursor-pointer">{row.document}</a>
          : <span className="tiktok-bodySm text-neutral-lowOnSurface">—</span>;
      case 'status': {
        const s = row.status;
        if (pillStatus) {
          return <KsTag variant={STATUS_VARIANT[s]} size="sm">{STATUS_LABEL[s]}</KsTag>;
        }
        return (
          <div className="flex items-center gap-1.5">
            <KsStatusDot size="sm" variant={s === 'success' ? 'success' : s === 'failed' ? 'error' : 'inProgress'} />
            <span className={clsx('tiktok-bodySm', s === 'failed' ? 'text-error-onSurface' : 'text-neutral-highOnSurface')}>{STATUS_LABEL[s]}</span>
            {s === 'failed' && row.failureReason && (
              <KsTooltip size="md">
                <span slot="content">{row.failureReason}</span>
                <span className="text-error-onFill cursor-help">ⓘ</span>
              </KsTooltip>
            )}
          </div>
        );
      }
      case 'cashBalance': {
        const v = row.cashBalance;
        if (v === null) return <span className="tiktok-bodySm text-neutral-lowOnSurface">—</span>;
        return <span className={clsx('tiktok-labelLg', v > 0 ? 'text-success-onSurface' : 'text-error-onSurface')}>{formatAmount(v)}</span>;
      }
      case 'creditBalance': {
        const v = row.creditBalance;
        if (v === null) return <span className="tiktok-bodySm text-neutral-lowOnSurface">—</span>;
        return <span className={clsx('tiktok-labelLg', v > 0 ? 'text-success-onSurface' : 'text-error-onSurface')}>{formatAmount(v)}</span>;
      }
      case 'adCredit':
        return <span className="tiktok-bodySm text-neutral-lowOnSurface">—</span>;
      case 'transactionId':
        return <span className="tiktok-bodySm text-neutral-onSurface">{row.id}</span>;
      case 'operator':
        return <span className="tiktok-bodySm text-neutral-onSurface">{row.operator}</span>;
      case 'action':
        if (row.status === 'failed') {
          return (
            <KsButton
              variant="primary"
              size="xs"
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRecoveryClick?.(row); }}
            >
              [Recovery CTA]
            </KsButton>
          );
        }
        return (
          <a
            className="tiktok-labelMd text-primary-onFill hover:underline cursor-pointer"
            onClick={(e: React.MouseEvent) => { e.stopPropagation(); onRowClick?.(row); }}
          >
            View details
          </a>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-md overflow-hidden border border-neutral-fillLow bg-neutral-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-neutral-fillLow border-b border-neutral-fillLow">
              {orderedCols.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-2.5 tiktok-labelMd text-neutral-lowOnSurface whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.id}
                className={clsx(
                  'border-b border-neutral-fillLow last:border-b-0',
                  row.status === 'failed' ? 'bg-error-surface1' : i % 2 === 0 ? 'bg-neutral-surface' : 'bg-neutral-surface1',
                  'hover:bg-neutral-surfaceHover transition-colors',
                  row.status === 'failed' && 'relative',
                )}
                onClick={() => row.status !== 'failed' && onRowClick?.(row)}
              >
                {orderedCols.map((col, idx) => (
                  <td
                    key={col.key}
                    className={clsx(
                      'px-4 align-middle',
                      padY,
                      row.status === 'failed' && idx === 0 && 'border-l-[3px] border-error-fill',
                    )}
                  >
                    {renderCell(col, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-fillLow bg-neutral-surface">
        <span className="tiktok-labelMd text-neutral-lowOnSurface">Total of {data.length} items</span>
        <span className="tiktok-labelMd text-neutral-highOnSurface">‹ 1 ›   |   10 / page</span>
      </div>
    </div>
  );
}
