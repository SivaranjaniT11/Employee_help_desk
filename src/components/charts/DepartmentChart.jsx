import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DEPARTMENTS } from '../../utils/constants';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { Building2 } from 'lucide-react';

/** Horizontal bar chart breaking down ticket volume by department. */
export default function DepartmentChart({ tickets = [] }) {
  const data = DEPARTMENTS.map((department) => ({
    name: department,
    count: tickets.filter((t) => t.department === department).length,
  }))
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <Card>
      <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">Tickets by Department</h3>
      <p className="text-sm text-ink-500 dark:text-ink-300">Where support requests are coming from</p>

      {data.length === 0 ? (
        <EmptyState icon={Building2} title="No data yet" description="Create a ticket to see this chart fill in." />
      ) : (
        <div className="mt-4" style={{ height: Math.max(220, data.length * 44) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E7EBF3" />
              <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7A9C' }} axisLine={false} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={140}
                tick={{ fontSize: 12, fill: '#465173' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E7EBF3', fontSize: 13 }}
                formatter={(value) => [`${value} tickets`, 'Count']}
              />
              <Bar dataKey="count" fill="#2F5DD9" radius={[0, 6, 6, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
