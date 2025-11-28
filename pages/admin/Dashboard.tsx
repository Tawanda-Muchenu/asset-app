import React, { useMemo } from 'react';
import { Users, Package, Tags, Building2 } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import AssetTable from '../../components/AssetTable';
import EmptyState from '../../components/EmptyState';
import { MOCK_ASSETS, MOCK_CATEGORIES, MOCK_DEPARTMENTS, MOCK_USERS } from '../../constants';

const AdminDashboard: React.FC = () => {
  const stats = useMemo(() => {
    return [
      { title: 'Total Users', value: MOCK_USERS.length, icon: Users },
      { title: 'Total Assets', value: MOCK_ASSETS.length, icon: Package },
      { title: 'Categories', value: MOCK_CATEGORIES.length, icon: Tags },
      { title: 'Departments', value: MOCK_DEPARTMENTS.length, icon: Building2 },
    ];
  }, []);

  const latestAssets = [...MOCK_ASSETS].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Latest Assets</h2>
        {latestAssets.length > 0 ? (
          <AssetTable 
            data={latestAssets}
            categories={MOCK_CATEGORIES}
            departments={MOCK_DEPARTMENTS}
            users={MOCK_USERS}
            showOwner
            onView={(asset) => console.log('View asset', asset.id)}
            onDelete={(asset) => console.log('Delete asset', asset.id)}
          />
        ) : (
          <EmptyState title="No assets found" description="There are no assets in the system yet." />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
