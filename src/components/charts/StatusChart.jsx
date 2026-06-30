import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STATUS_TONE, TONE_HEX, STATUS_ORDER } from '../../utils/constants';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { PieChart as PieChartIcon } from 'lucide-react';

/** Donut chart breaking down tickets by their current status. */
export default function StatusChart({ tickets = [] }) {
  const data = STATUS_ORDER.map((status) => ({
    name: status,
    value: tickets.filter((t) => t.status === status).length,
    color: TONE_HEX[STATUS_TONE[status]],
  })).filter((entry) => entry.value > 0);

  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">Tickets by Status</h3>
      <p className="text-sm text-ink-500 dark:text-ink-300">Current distribution across the workflow</p>

      {data.length === 0 ? (
        <EmptyState icon={PieChartIcon} title="No data yet" description="Create a ticket to see this chart fill in." />
      ) : (
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="85%"
                paddingAngle={3}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E7EBF3', fontSize: 13 }}
                formatter={(value, name) => [`${value} tickets`, name]}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
