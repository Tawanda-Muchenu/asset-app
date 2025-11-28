import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssetForm from '../../components/AssetForm';
import { MOCK_CATEGORIES, MOCK_DEPARTMENTS } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const CreateAsset: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: any) => {
    setIsLoading(true);
    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Creating Asset:', { ...data, createdBy: user?.id });
    setIsLoading(false);
    navigate('/user/assets');
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add New Asset</h1>
        <p className="mt-2 text-sm text-gray-600">Fill in the details below to register a new asset in the system.</p>
      </div>
      
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <AssetForm 
          categories={MOCK_CATEGORIES} 
          departments={MOCK_DEPARTMENTS} 
          onSubmit={handleCreate}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateAsset;
