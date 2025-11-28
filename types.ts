export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  email: string;
  role: Role;
  name?: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
  categoryId: string;
  departmentId: string;
  cost: number;
  purchasedDate: string;
  createdBy: string; // User ID
  createdAt: string;
}

// Stats types
export interface DashboardStats {
  totalAssets: number;
  totalCost: number;
  recentAsset?: Asset;
  totalCategories?: number;
  totalDepartments?: number;
  totalUsers?: number;
}
