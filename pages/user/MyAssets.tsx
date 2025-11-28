import React, { useState } from 'react';
import AssetTable from '../../components/AssetTable';
import EmptyState from '../../components/EmptyState';
import { MOCK_ASSETS, MOCK_CATEGORIES, MOCK_DEPARTMENTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const MyAssets: React.FC = () => {
  const { user } = useAuth();
  
  // Filter assets for this user
  const myAssets = MOCK_ASSETS.filter(asset => asset.createdBy === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Assets</h1>
        <Link
          to="/user/assets/create"
          className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          Add Asset
        </Link>
      </div>

      {myAssets.length > 0 ? (
        <AssetTable 
          data={myAssets}
          categories={MOCK_CATEGORIES}
          departments={MOCK_DEPARTMENTS}
          onView={(asset) => console.log('View details', asset)}
        />
      ) : (
        <EmptyState 
           title="No assets found" 
           description="You haven't added any assets yet." 
           action={
             <Link 
               to="/user/assets/create"
               className="text-sm font-medium text-primary-600 hover:text-primary-500"
             >
               Add an asset now
             </Link>
           }
        />
      )}
    </div>
  );
};

export default MyAssets;
