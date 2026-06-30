import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { PRIORITY_ORDER, PRIORITY_TONE, TONE_HEX } from '../../utils/constants';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { BarChart3 } from 'lucide-react';

/** Bar chart breaking down tickets by priority level. */
export default function PriorityChart({ tickets = [] }) {
  const data = PRIORITY_ORDER.map((priority) => ({
    name: priority,
    count: tickets.filter((t) => t.priority === priority).length,
    color: TONE_HEX[PRIORITY_TONE[priority]],
  }));

  const hasData = data.some((entry) => entry.count > 0);

  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">Tickets by Priority</h3>
      <p className="text-sm text-ink-500 dark:text-ink-300">How urgent the open workload is</p>

      {!hasData ? (
        <EmptyState icon={BarChart3} title="No data yet" description="Create a ticket to see this chart fill in." />
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7EBF3" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7A9C' }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7A9C' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E7EBF3', fontSize: 13 }}
                formatter={(value) => [`${value} tickets`, 'Count']}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56}>
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
