import AppLayout from '../components/layout/AppLayout';
import StatusChart from '../components/charts/StatusChart';
import PriorityChart from '../components/charts/PriorityChart';
import DepartmentChart from '../components/charts/DepartmentChart';
import { SkeletonBlock } from '../components/common/Skeleton';
import { useTickets } from '../hooks/useTickets';

/** Admin analytics view: status, priority, and department breakdowns. */
export default function Analytics() {
  const { tickets, isLoading } = useTickets();

  return (
    <AppLayout title="Analytics" subtitle="Patterns across every ticket in the system">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SkeletonBlock className="h-80 rounded-xl2" />
          <SkeletonBlock className="h-80 rounded-xl2" />
          <SkeletonBlock className="h-80 rounded-xl2 lg:col-span-2" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <StatusChart tickets={tickets} />
          <PriorityChart tickets={tickets} />
          <div className="lg:col-span-2">
            <DepartmentChart tickets={tickets} />
          </div>
        </div>
      )}
    </AppLayout>
  );
}
