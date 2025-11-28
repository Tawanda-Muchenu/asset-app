import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Building2, 
  Users, 
  Menu, 
  X,
  PlusSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';
import { cn } from '../lib/ui';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = user?.role === Role.ADMIN;
  const basePath = isAdmin ? '/admin' : '/user';

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/assets', label: 'Manage Assets', icon: Package },
    { href: '/admin/categories', label: 'Categories', icon: Tags },
    { href: '/admin/departments', label: 'Departments', icon: Building2 },
    { href: '/admin/users', label: 'Users', icon: Users },
  ];

  const userLinks = [
    { href: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/user/assets', label: 'My Assets', icon: Package },
    { href: '/user/assets/create', label: 'Add Asset', icon: PlusSquare },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 rounded-md bg-white p-2 shadow-md md:hidden"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <span className="text-xl font-bold text-gray-900">AssetManager</span>
        </div>
        
        <nav className="flex flex-col gap-1 p-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {isAdmin ? 'Administration' : 'User Panel'}
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link.href) 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
             <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                {user?.name?.[0]?.toUpperCase() || 'U'}
             </div>
             <div className="overflow-hidden">
               <p className="truncate text-sm font-medium text-gray-900">{user?.name}</p>
               <p className="truncate text-xs text-gray-500">{user?.email}</p>
             </div>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
