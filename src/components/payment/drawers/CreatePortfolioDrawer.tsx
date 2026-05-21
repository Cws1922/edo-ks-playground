import { useState } from 'react';
import { KsDrawer, KsButton, KsInput, KsInlineAlert } from '@byted-keystone/react';

interface Props {
  open: boolean;
  onClose: () => void;
  paName: string;
  onPaNameChange: (v: string) => void;
  showError: boolean;
  onConfirm: () => void;
}

export function CreatePortfolioDrawer({ open, onClose, paName, onPaNameChange, showError, onConfirm }: Props) {
  const [selectedType, setSelectedType] = useState<'advanced' | 'standard'>('advanced');

  return (
    <KsDrawer
      open={open}
      title="Create new Payment Portfolio"
      size="lg"
      onOpenChange={(o: boolean) => { if (!o) onClose(); }}
    >
      {/* Scrollable content */}
      <div className="flex flex-col gap-6 pb-4">
        {/* PA name */}
        <div className="flex flex-col gap-1.5">
          <label className="tiktok-labelLg text-neutral-highOnSurface">Payment Portfolio name</label>
          <div className="max-w-[500px]">
            <KsInput
              value={paName}
              onChange={(e: any) => onPaNameChange(typeof e === 'string' ? e : (e?.target?.value ?? e?.detail ?? ''))}
              placeholder="Enter Payment Portfolio name"
              status={showError ? 'error' : undefined}
            />
            {showError && (
              <p className="tiktok-labelSm text-error-fill mt-0.5">
                This name is already in use within your business. Please choose a different name.
              </p>
            )}
          </div>
        </div>

        {/* Type selection */}
        <div className="flex flex-col gap-3">
          <span className="tiktok-labelLg text-neutral-highOnSurface">Select Payment Portfolio type</span>
          <div className="flex gap-4">
            {[
              {
                id: 'advanced' as const,
                label: 'Advanced',
                desc: 'Credit lines, cash, and payment methods at the Payment Portfolio level are automatically shared by all linked ad accounts — no manual fund allocation is required.',
              },
              {
                id: 'standard' as const,
                label: 'Standard',
                desc: 'Credit lines, cash must be manually assigned to advertisers before use.',
              },
            ].map((type) => {
              const active = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex-1 text-left p-4 rounded-lg border-2 transition-colors ${
                    active
                      ? 'border-primary-fill bg-primary-fillLow'
                      : 'border-neutral-fillLow bg-neutral-surface hover:bg-neutral-surface2'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="tiktok-labelLg text-neutral-highOnSurface">{type.label}</span>
                      <p className="tiktok-bodySm text-neutral-onSurface leading-5">{type.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      active ? 'border-primary-fill' : 'border-neutral-fill'
                    }`}>
                      {active && <div className="w-2 h-2 rounded-full bg-primary-fill" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Link accounts */}
        <div className="flex flex-col gap-3">
          <span className="tiktok-labelLg text-neutral-highOnSurface">Link accounts</span>
          <p className="tiktok-bodySm text-neutral-onSurface">
            You can link up to 50 accounts to the new Payment portfolio this time. After Payment Portfolio created, you can link more accounts to this Payment Portfolio when view details of this Payment Portfolio.
          </p>
          <KsInlineAlert
            variant="info"
            closeable={false}
            content="Linked accounts will be managed by this Payment Portfolio. The ad accounts relationship with Business Center won't be changed."
          />
          <div>
            <KsButton variant="default" size="md">+ Link account</KsButton>
          </div>
          {/* Empty state */}
          <div className="h-36 flex items-center justify-center rounded-lg border border-dashed border-neutral-fillLow">
            <span className="tiktok-bodySm text-neutral-lowOnSurface">No accounts linked</span>
          </div>
        </div>
      </div>

      {/* Footer via slot */}
      <div slot="footer" className="flex justify-end gap-2 w-full">
        <KsButton variant="default" onClick={onClose}>Cancel</KsButton>
        <KsButton variant="primary" onClick={onConfirm}>Confirm</KsButton>
      </div>
    </KsDrawer>
  );
}
