import React, { useState } from 'react';
import { Category, Department } from '../types';
import { useNavigate } from 'react-router-dom';

interface AssetFormProps {
  categories: Category[];
  departments: Department[];
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
}

const AssetForm: React.FC<AssetFormProps> = ({ categories, departments, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    departmentId: '',
    cost: '',
    purchasedDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
        ...formData,
        cost: Number(formData.cost)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Asset Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            placeholder="e.g. MacBook Pro 16-inch"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            required
            value={formData.categoryId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 bg-white"
          >
            <option value="">Select a category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="departmentId" className="block text-sm font-medium text-gray-700">Department</label>
          <select
            id="departmentId"
            name="departmentId"
            required
            value={formData.departmentId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 bg-white"
          >
            <option value="">Select a department</option>
            {departments.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost ($)</label>
          <input
            type="number"
            id="cost"
            name="cost"
            required
            min="0"
            step="0.01"
            value={formData.cost}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="purchasedDate" className="block text-sm font-medium text-gray-700">Date Purchased</label>
          <input
            type="date"
            id="purchasedDate"
            name="purchasedDate"
            required
            value={formData.purchasedDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Create Asset'}
        </button>
      </div>
    </form>
  );
};

export default AssetForm;
