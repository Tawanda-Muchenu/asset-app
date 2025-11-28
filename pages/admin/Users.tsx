import React, { useState } from 'react';
import { Plus, User as UserIcon } from 'lucide-react';
import { MOCK_USERS } from '../../constants';
import { User, Role } from '../../types';
import UserForm from '../../components/UserForm';
import EmptyState from '../../components/EmptyState';

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreate = (data: { email: string; role: Role; name: string }) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      role: data.role,
      name: data.name,
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {users.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <ul className="divide-y divide-gray-100">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <UserIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  user.role === Role.ADMIN ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700'
                }`}>
                  {user.role}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState title="No users found" description="Create a user to get started." />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-bold text-gray-900">New User</h3>
            <UserForm onSubmit={handleCreate} onCancel={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
