import React, { useState } from 'react';
import AssetTable from '../../components/AssetTable';
import ConfirmModal from '../../components/ConfirmModal';
import EmptyState from '../../components/EmptyState';
import { MOCK_ASSETS, MOCK_CATEGORIES, MOCK_DEPARTMENTS, MOCK_USERS } from '../../constants';
import { Asset } from '../../types';
import { Filter } from 'lucide-react';

const AdminAssets: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');

  // Filter Logic
  const filteredAssets = assets.filter(asset => {
    if (filterCategory && asset.categoryId !== filterCategory) return false;
    if (filterDepartment && asset.departmentId !== filterDepartment) return false;
    return true;
  });

  const handleDelete = () => {
    if (selectedAsset) {
      setAssets(assets.filter(a => a.id !== selectedAsset.id));
      setSelectedAsset(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-900">Manage Assets</h1>
        
        <div className="flex flex-wrap gap-2">
           <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm">
             <Filter className="h-4 w-4 text-gray-500" />
             <select 
               className="border-none bg-transparent text-gray-700 focus:ring-0"
               value={filterCategory}
               onChange={(e) => setFilterCategory(e.target.value)}
             >
               <option value="">All Categories</option>
               {MOCK_CATEGORIES.map(c => (
                 <option key={c.id} value={c.id}>{c.name}</option>
               ))}
             </select>
           </div>
           
           <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm">
             <Filter className="h-4 w-4 text-gray-500" />
             <select 
               className="border-none bg-transparent text-gray-700 focus:ring-0"
               value={filterDepartment}
               onChange={(e) => setFilterDepartment(e.target.value)}
             >
               <option value="">All Departments</option>
               {MOCK_DEPARTMENTS.map(d => (
                 <option key={d.id} value={d.id}>{d.name}</option>
               ))}
             </select>
           </div>
        </div>
      </div>

      {filteredAssets.length > 0 ? (
        <AssetTable 
          data={filteredAssets}
          categories={MOCK_CATEGORIES}
          departments={MOCK_DEPARTMENTS}
          users={MOCK_USERS}
          showOwner
          onDelete={setSelectedAsset}
        />
      ) : (
        <EmptyState title="No assets match your filters" description="Try adjusting your filters to see results." />
      )}

      <ConfirmModal
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onConfirm={handleDelete}
        title="Delete Asset"
        description={`Are you sure you want to delete "${selectedAsset?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminAssets;
