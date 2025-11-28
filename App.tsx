import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/auth/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminAssets from './pages/admin/Assets';
import AdminCategories from './pages/admin/Categories';
import AdminDepartments from './pages/admin/Departments';
import AdminUsers from './pages/admin/Users';

// User Pages
import UserDashboard from './pages/user/Dashboard';
import MyAssets from './pages/user/MyAssets';
import CreateAsset from './pages/user/CreateAsset';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
          <Route path="/admin/assets" element={<Layout><AdminAssets /></Layout>} />
          <Route path="/admin/categories" element={<Layout><AdminCategories /></Layout>} />
          <Route path="/admin/departments" element={<Layout><AdminDepartments /></Layout>} />
          <Route path="/admin/users" element={<Layout><AdminUsers /></Layout>} />

          {/* User Routes */}
          <Route path="/user" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/user/dashboard" element={<Layout><UserDashboard /></Layout>} />
          <Route path="/user/assets" element={<Layout><MyAssets /></Layout>} />
          <Route path="/user/assets/create" element={<Layout><CreateAsset /></Layout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
