import { useNavigate } from 'react-router-dom';
import { Compass } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import EmptyState from '../components/common/EmptyState';
import Card from '../components/common/Card';

/** Catch-all page for any route that doesn't match a known page. */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <AppLayout title="Page not found">
      <Card>
        <EmptyState
          icon={Compass}
          title="We couldn't find that page"
          description="The page you're looking for may have been moved or doesn't exist."
          actionLabel="Back to dashboard"
          onAction={() => navigate('/')}
        />
      </Card>
    </AppLayout>
  );
}
