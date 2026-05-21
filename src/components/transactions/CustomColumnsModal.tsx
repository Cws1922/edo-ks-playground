import { useState, useEffect } from 'react';
import { KsModal, KsCheckbox, KsLink, KsInput } from '@byted-keystone/react';
import { KsIconSearch, KsIconFilledLock, KsIconClose, KsIconInfo } from '@fe-infra/keystone-icons-react';
import { ALL_COLUMNS, type ColumnKey } from '@/data/transactions';

interface CustomColumnsModalProps {
  open: boolean;
  visibleColumns: ColumnKey[];
  onChange: (cols: ColumnKey[]) => void;
  onClose: () => void;
}

export function CustomColumnsModal({ open, visibleColumns, onChange, onClose }: CustomColumnsModalProps) {
  const [pending, setPending] = useState<ColumnKey[]>(visibleColumns);
  const [search, setSearch] = useState('');

  useEffect(() => { if (open) setPending(visibleColumns); }, [open, visibleColumns]);

  const filteredCols = ALL_COLUMNS.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()));
  const selectedCols = ALL_COLUMNS.filter((c) => pending.includes(c.key));

  const toggle = (key: ColumnKey, locked: boolean) => {
    if (locked) return;
    setPending((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const removeChip = (key: ColumnKey, locked: boolean) => {
    if (locked) return;
    setPending((prev) => prev.filter((k) => k !== key));
  };

  const apply = () => {
    onChange(pending);
    onClose();
  };

  const reset = () => {
    const defaults = ALL_COLUMNS.filter((c) => c.defaultVisible).map((c) => c.key);
    setPending(defaults);
  };

  const clearAll = () => {
    const locked = ALL_COLUMNS.filter((c) => c.locked).map((c) => c.key);
    setPending(locked);
  };

  const allChecked = pending.length === ALL_COLUMNS.length;
  const someChecked = pending.length > 0 && !allChecked;

  return (
    <KsModal
      open={open}
      title="Custom columns"
      size="lg"
      confirmText="Apply"
      cancelText="Cancel"
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
      showDivider
    >
      <div className="flex gap-4">
        {/* Left panel — Columns */}
        <div className="flex-1 bg-neutral-fillLow rounded-md overflow-hidden">
          <div className="px-3 py-2 bg-neutral-surface border-b border-neutral-fillLow">
            <span className="tiktok-labelLg text-neutral-highOnSurface">Columns</span>
          </div>
          <div className="px-3 py-2 bg-neutral-surface">
            <KsInput
              value={search}
              onChange={(v: string) => setSearch(v)}
              placeholder="Search columns"
              size="sm"
            >
              <KsIconSearch slot="prefix" size={14} />
            </KsInput>
          </div>
          <div className="max-h-[320px] overflow-y-auto">
            <div className="px-3 py-2 flex items-center gap-2 border-b border-neutral-fillLow bg-neutral-surface">
              <KsCheckbox
                checked={allChecked}
                indeterminate={someChecked}
                onChange={(checked: boolean) => {
                  if (checked) setPending(ALL_COLUMNS.map((c) => c.key));
                  else clearAll();
                }}
              />
              <span className="tiktok-labelLg text-neutral-highOnSurface">All</span>
            </div>
            {filteredCols.map((c) => (
              <div
                key={c.key}
                className="px-3 py-2 flex items-center gap-2 border-b border-neutral-fillLow last:border-b-0 hover:bg-neutral-surfaceHover cursor-pointer bg-neutral-surface"
                onClick={() => toggle(c.key, c.locked)}
              >
                <KsCheckbox
                  checked={pending.includes(c.key)}
                  disabled={c.locked}
                  onChange={() => toggle(c.key, c.locked)}
                />
                <span className="tiktok-bodyMd text-neutral-highOnSurface flex-1">{c.label}</span>
                {c.locked && <KsIconFilledLock size={14} className="text-neutral-lowOnSurface" />}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — Selected */}
        <div className="flex-1 bg-neutral-fillLow rounded-md overflow-hidden">
          <div className="px-3 py-2 bg-neutral-surface border-b border-neutral-fillLow flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="tiktok-labelLg text-neutral-highOnSurface">Selected</span>
              <span className="tiktok-labelSm bg-primary-fill text-primary-onFill px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {pending.length}
              </span>
            </div>
            <KsLink size="sm" onClick={clearAll}>Clear all</KsLink>
          </div>
          <div className="p-3 min-h-[280px] flex flex-wrap gap-1.5 content-start bg-neutral-surface">
            {selectedCols.map((c) => (
              <div
                key={c.key}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-surface1 border border-primary-fillLow rounded text-primary-onFillLow tiktok-labelSm"
              >
                {c.locked && <KsIconFilledLock size={11} />}
                <span>{c.label}</span>
                {!c.locked && (
                  <button
                    className="ml-1 hover:text-error-onFill"
                    onClick={() => removeChip(c.key, c.locked)}
                  >
                    <KsIconClose size={11} />
                  </button>
                )}
              </div>
            ))}
            {selectedCols.length === 0 && (
              <div className="w-full text-center py-8 tiktok-bodySm text-neutral-lowOnSurface">
                No columns selected
              </div>
            )}
          </div>
          <div className="border-t border-neutral-fillLow px-3 py-2 flex items-start gap-1.5 bg-neutral-surface">
            <KsIconInfo size={12} className="text-neutral-lowOnSurface mt-0.5 flex-shrink-0" />
            <span className="tiktok-labelSm text-neutral-lowOnSurface">
              Chip order = column display order in table (drag to reorder)
            </span>
          </div>
        </div>
      </div>

      {/* Footer custom controls */}
      <div slot="footerPrepend">
        <KsLink size="sm" onClick={reset}>Reset to default</KsLink>
      </div>
      <div slot="footer" className="flex gap-2 justify-end">
        <KsLink size="sm" onClick={reset}>Reset to default</KsLink>
        <span className="flex-1" />
        <button onClick={onClose} className="px-3 py-1.5 rounded border border-neutral-fillLow text-neutral-highOnSurface tiktok-labelMd hover:bg-neutral-fillLow">
          Cancel
        </button>
        <button onClick={apply} className="px-3 py-1.5 rounded bg-primary-fill text-primary-onFill tiktok-labelMd hover:bg-primary-fillHover">
          Apply
        </button>
      </div>
    </KsModal>
  );
}
