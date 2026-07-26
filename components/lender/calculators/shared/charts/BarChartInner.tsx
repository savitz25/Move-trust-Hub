'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '@/lib/lender/utils';

export function BarChartInner({
  data,
  bars,
  height = 240,
}: {
  data: Record<string, string | number>[];
  bars: { key: string; color: string; label?: string }[];
  height?: number;
}) {
  return (
    <div style={{ height }} aria-label="Bar chart">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
          <Tooltip
            formatter={(v, name) => [
              typeof v === 'number' && name?.toString().includes('Interest')
                ? formatCurrency(Number(v) * 1000)
                : v,
              name,
            ]}
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              color: '#111827',
            }}
          />
          <Legend />
          {bars.map((b) => (
            <Bar key={b.key} dataKey={b.key} name={b.label ?? b.key} fill={b.color} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}