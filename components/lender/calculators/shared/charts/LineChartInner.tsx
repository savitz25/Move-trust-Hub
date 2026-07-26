'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/lib/lender/utils';

export function LineChartInner({
  data,
  lines,
  height = 240,
  yFormat = 'currency',
}: {
  data: Record<string, string | number>[];
  lines: { key: string; color: string; dashed?: boolean; label?: string }[];
  height?: number;
  yFormat?: 'currency' | 'number';
}) {
  const fmt = yFormat === 'currency'
    ? (v: number) => formatCurrency(v)
    : (v: number) => String(v);

  return (
    <div style={{ height }} aria-label="Line chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis
            tickFormatter={(v) => fmt(Number(v))}
            tick={{ fontSize: 11, fill: '#6B7280' }}
            width={56}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip
            formatter={(v) => fmt(Number(v))}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              color: '#111827',
            }}
          />
          <Legend />
          {lines.map((l) => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.label ?? l.key}
              stroke={l.color}
              strokeWidth={2}
              strokeDasharray={l.dashed ? '5 5' : undefined}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}