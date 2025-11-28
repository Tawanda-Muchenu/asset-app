import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MOCK_DEPARTMENTS } from '../../constants';
import { Department } from '../../types';
import DepartmentForm from '../../components/DepartmentForm';
import EmptyState from '../../components/EmptyState';

const AdminDepartments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (name: string) => {
    const newDepartment: Department = {
      id: `d${Date.now()}`,
      name,
    };
    setDepartments([...departments, newDepartment]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </button>
      </div>

      {departments.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {departments.map((dept) => (
              <li key={dept.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <span className="font-medium text-gray-900">{dept.name}</span>
                <span className="text-xs text-gray-400">ID: {dept.id}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState title="No departments" description="Create a department to get started." />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">New Department</h3>
            <DepartmentForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDepartments;
