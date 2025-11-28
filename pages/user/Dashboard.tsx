import React, { useMemo } from 'react';
import { Package, DollarSign, Clock } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import AssetTable from '../../components/AssetTable';
import EmptyState from '../../components/EmptyState';
import { MOCK_ASSETS, MOCK_CATEGORIES, MOCK_DEPARTMENTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../lib/ui';
import { Link } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const myAssets = useMemo(() => {
    return MOCK_ASSETS.filter(asset => asset.createdBy === user?.id);
  }, [user]);

  const stats = useMemo(() => {
    const totalCost = myAssets.reduce((sum, asset) => sum + asset.cost, 0);
    const recentAsset = myAssets.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    return [
      { 
        title: 'My Assets', 
        value: myAssets.length, 
        icon: Package 
      },
      { 
        title: 'Total Cost', 
        value: formatCurrency(totalCost), 
        icon: DollarSign 
      },
      { 
        title: 'Recent Addition', 
        value: recentAsset ? recentAsset.name : 'N/A', 
        icon: Clock 
      },
    ];
  }, [myAssets]);

  const recentAssets = [...myAssets].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <Link 
          to="/user/assets/create"
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          Add New Asset
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recently Added</h2>
        {recentAssets.length > 0 ? (
          <AssetTable 
            data={recentAssets}
            categories={MOCK_CATEGORIES}
            departments={MOCK_DEPARTMENTS}
            onView={(asset) => console.log('View asset', asset.id)}
          />
        ) : (
          <EmptyState 
            title="No assets yet" 
            description="You haven't added any assets yet." 
            action={
              <Link 
                to="/user/assets/create"
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                Create your first asset &rarr;
              </Link>
            }
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
