import { useState, useMemo } from 'react';
import { KsText, KsCheckbox, KsSwitch, KsDateRangePicker } from '@byted-keystone/react';
import { KsIconArrowUpSmall, KsIconArrowDownSmall } from '@fe-infra/keystone-icons-react';
import { KsLineChart } from '@fe-infra/chart-react';

type MetricId = 'impressions' | 'cost' | 'click' | 'conversions';

interface ChartPoint {
  date: string;
  value: number;
  metric: string;
}

interface MetricConfig {
  id: MetricId;
  label: string;
  value: string;
  unit: string | null;
  delta: string;
  deltaDir: 'up' | 'down';
  defaultChecked: boolean;
}

// Date range for chart x-axis
const DATES = ['Sep 6, 2023', 'Sep 7, 2023', 'Sep 8, 2023', 'Sep 9, 2023', 'Sep 10, 2023', 'Sep 11, 2023', 'Sep 12, 2023', 'Sep 13, 2023'];

// Generated chart data — dramatic swings with different rhythms per metric
const CHART_DATA: Record<MetricId, ChartPoint[]> = {
  impressions: [
    { date: DATES[0], value: 54000, metric: 'Impressions' },
    { date: DATES[1], value: 108000, metric: 'Impressions' },
    { date: DATES[2], value: 95000, metric: 'Impressions' },
    { date: DATES[3], value: 102000, metric: 'Impressions' },
    { date: DATES[4], value: 68000, metric: 'Impressions' },
    { date: DATES[5], value: 89000, metric: 'Impressions' },
    { date: DATES[6], value: 112000, metric: 'Impressions' },
    { date: DATES[7], value: 96400, metric: 'Impressions' },
  ],
  cost: [
    { date: DATES[0], value: 38500, metric: 'Cost' },
    { date: DATES[1], value: 15200, metric: 'Cost' },
    { date: DATES[2], value: 41800, metric: 'Cost' },
    { date: DATES[3], value: 19600, metric: 'Cost' },
    { date: DATES[4], value: 44100, metric: 'Cost' },
    { date: DATES[5], value: 12300, metric: 'Cost' },
    { date: DATES[6], value: 36900, metric: 'Cost' },
    { date: DATES[7], value: 28360, metric: 'Cost' },
  ],
  click: [
    { date: DATES[0], value: 31000, metric: 'Click' },
    { date: DATES[1], value: 72000, metric: 'Click' },
    { date: DATES[2], value: 28000, metric: 'Click' },
    { date: DATES[3], value: 51000, metric: 'Click' },
    { date: DATES[4], value: 82000, metric: 'Click' },
    { date: DATES[5], value: 35000, metric: 'Click' },
    { date: DATES[6], value: 68000, metric: 'Click' },
    { date: DATES[7], value: 62217, metric: 'Click' },
  ],
  conversions: [
    { date: DATES[0], value: 5200, metric: 'Conversions' },
    { date: DATES[1], value: 1400, metric: 'Conversions' },
    { date: DATES[2], value: 4800, metric: 'Conversions' },
    { date: DATES[3], value: 1100, metric: 'Conversions' },
    { date: DATES[4], value: 5600, metric: 'Conversions' },
    { date: DATES[5], value: 2200, metric: 'Conversions' },
    { date: DATES[6], value: 4900, metric: 'Conversions' },
    { date: DATES[7], value: 3523, metric: 'Conversions' },
  ],
};

const METRICS_CONFIG: MetricConfig[] = [
  {
    id: 'impressions',
    label: 'Impressions',
    value: '96,400',
    unit: null,
    delta: '10.1%',
    deltaDir: 'up',
    defaultChecked: true,
  },
  {
    id: 'cost',
    label: 'Cost',
    value: '28,360.15',
    unit: 'USD',
    delta: '5.1%',
    deltaDir: 'down',
    defaultChecked: true,
  },
  {
    id: 'click',
    label: 'Click',
    value: '62,217',
    unit: null,
    delta: '10.1%',
    deltaDir: 'up',
    defaultChecked: false,
  },
  {
    id: 'conversions',
    label: 'Conversions',
    value: '3,523',
    unit: null,
    delta: '10.1%',
    deltaDir: 'up',
    defaultChecked: false,
  },
];

interface MetricCardProps {
  metric: MetricConfig;
  checked: boolean;
  onToggle: () => void;
}

function MetricCard({ metric, checked, onToggle }: MetricCardProps) {
  const isUp = metric.deltaDir === 'up';

  return (
    <div className={`flex flex-col gap-4 p-3 rounded-xl w-full cursor-pointer ${checked ? 'bg-neutral-surface border border-primary-fill' : 'bg-neutral-surface1 border border-transparent'}`} onClick={onToggle}>
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-1">
          <KsText variant="titleSm">{metric.label}</KsText>
          <span className="flex items-center gap-1 text-neutral-lowOnSurface">
            <span className="w-[3px] h-[3px] rounded-full bg-neutral-lowOnSurface" />
            <KsText variant="labelMd" color="neutralLow">
              Optional
            </KsText>
          </span>
        </div>
        <KsCheckbox checked={checked} onChange={onToggle} size="md" />
      </div>
      <div className="flex items-end gap-2">
        <div className="flex items-baseline gap-1">
          <KsText variant="headlineLg">{metric.value}</KsText>
          {metric.unit && (
            <KsText variant="bodySm" color="neutral">
              {metric.unit}
            </KsText>
          )}
        </div>
        <div className="flex items-center gap-0.5 pb-1">
          {isUp ? <KsIconArrowUpSmall size={14} color="#2a9c49" /> : <KsIconArrowDownSmall size={14} color="#ef504b" />}
          <KsText variant="labelSm" color={isUp ? 'success' : 'error'}>
            {metric.delta}
          </KsText>
        </div>
      </div>
    </div>
  );
}

interface PerformanceChartProps {
  selectedMetrics: MetricId[];
}

function PerformanceChart({ selectedMetrics }: PerformanceChartProps) {
  const chartData = useMemo(() => {
    const values = selectedMetrics.flatMap((id) => CHART_DATA[id] || []);
    return values;
  }, [selectedMetrics]);

  const spec = useMemo(
    () => ({
      type: 'line',
      data: [{ values: chartData }],
      xField: 'date',
      yField: 'value',
      seriesField: 'metric',
      line: { style: { curveType: 'monotone' } },
      axes: [
        {
          orient: 'bottom',
          label: { style: { fontSize: 12 } },
        },
        {
          orient: 'left',
          label: {
            style: { fontSize: 12 },
            formatMethod: (val: number) => {
              if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
              if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
              return String(val);
            },
          },
        },
      ],
      tooltip: {
        dimension: {
          content: [
            {
              key: (datum: ChartPoint | undefined) => datum?.metric,
              value: (datum: ChartPoint | undefined) => {
                const v = datum?.value;
                if (v == null) return '';
                return v.toLocaleString();
              },
            },
          ],
        },
      },
      legends: { visible: false },
      animationAppear: { duration: 400 },
      animationUpdate: { duration: 300 },
    }),
    [chartData],
  );

  if (selectedMetrics.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[380px]">
        <KsText variant="bodySm" color="neutral">
          Select a metric to view the trend
        </KsText>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[380px]">
      <KsLineChart spec={spec} legendSize="md" />
    </div>
  );
}

type SelectedState = Record<MetricId, boolean>;
type Tab = 'graph' | 'data';

export function PerformanceCard() {
  const [activeTab, setActiveTab] = useState<Tab>('graph');
  const [selected, setSelected] = useState<SelectedState>(() => {
    const initial = {} as SelectedState;
    METRICS_CONFIG.forEach((m) => {
      initial[m.id] = m.defaultChecked;
    });
    return initial;
  });

  const selectedMetrics = useMemo<MetricId[]>(() => METRICS_CONFIG.filter((m) => selected[m.id]).map((m) => m.id), [selected]);

  const toggleMetric = (id: MetricId) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-neutral-surface rounded-xl pb-2">
      {/* Card Header */}
      <div className="flex flex-col gap-4 pt-6 pb-4 px-6">
        <KsText variant="titleLg">Performance</KsText>
        <div className="flex items-center justify-between">
          {/* Segmented Control */}
          <div className="flex rounded bg-neutral-overlayLow overflow-hidden">
            <button onClick={() => setActiveTab('graph')} className={`px-3.5 py-1.5 h-9 border-0 cursor-pointer rounded-sm text-[14px] font-medium ${activeTab === 'graph' ? 'bg-neutral-surface text-primary-onSurface m-0.5' : 'bg-transparent text-neutral-highOnSurface'}`}>
              Graph
            </button>
            <button onClick={() => setActiveTab('data')} className={`px-4 py-2 border-0 cursor-pointer rounded-sm text-[14px] font-medium ${activeTab === 'data' ? 'bg-neutral-surface text-primary-onSurface m-0.5' : 'bg-transparent text-neutral-highOnSurface'}`}>
              Data
            </button>
          </div>
          {/* Date Range Picker */}
          <KsDateRangePicker defaultValue={['2024-05-11', '2024-05-17']} />
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 py-4">
        <div className="flex gap-6">
          {/* Metrics Panel */}
          <div className="flex flex-col gap-3 w-[294px] shrink-0">
            {METRICS_CONFIG.map((metric) => (
              <MetricCard key={metric.id} metric={metric} checked={selected[metric.id]} onToggle={() => toggleMetric(metric.id)} />
            ))}
          </div>

          {/* Chart Area */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <KsText variant="titleSm">Trend</KsText>
              <div className="flex items-center gap-2">
                <KsText variant="bodySm">View top 5 campaigns</KsText>
                <KsSwitch size="sm" />
              </div>
            </div>
            <PerformanceChart selectedMetrics={selectedMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}
