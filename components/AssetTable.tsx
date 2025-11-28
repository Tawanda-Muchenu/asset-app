import React from 'react';
import { Asset, Category, Department, User } from '../types';
import { formatCurrency, formatDate } from '../lib/ui';
import { Eye, Trash2 } from 'lucide-react';

export interface AssetTableColumn {
  key: keyof Asset;
  label: string;
}

interface AssetTableProps {
  data: Asset[];
  categories: Category[];
  departments: Department[];
  users?: User[];
  onView?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  showOwner?: boolean;
}

const AssetTable: React.FC<AssetTableProps> = ({ 
  data, 
  categories, 
  departments, 
  users, 
  onView, 
  onDelete,
  showOwner = false
}) => {
  const getCategoryName = (id: string) => categories.find(c => c.id === id)?.name || 'Unknown';
  const getDepartmentName = (id: string) => departments.find(d => d.id === id)?.name || 'Unknown';
  const getUserName = (id: string) => users?.find(u => u.id === id)?.name || 'Unknown';

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Department</th>
              <th className="px-6 py-3 font-semibold">Cost</th>
              <th className="px-6 py-3 font-semibold">Date</th>
              {showOwner && <th className="px-6 py-3 font-semibold">Created By</th>}
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50/50">
                <td className="px-6 py-4 font-medium text-gray-900">{asset.name}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {getCategoryName(asset.categoryId)}
                  </span>
                </td>
                <td className="px-6 py-4">{getDepartmentName(asset.departmentId)}</td>
                <td className="px-6 py-4 font-mono">{formatCurrency(asset.cost)}</td>
                <td className="px-6 py-4">{formatDate(asset.purchasedDate)}</td>
                {showOwner && <td className="px-6 py-4">{getUserName(asset.createdBy)}</td>}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {onView && (
                      <button 
                        onClick={() => onView(asset)}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-primary-600"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    {onDelete && (
                      <button 
                        onClick={() => onDelete(asset)}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete Asset"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
