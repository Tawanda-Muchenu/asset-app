import { Asset, Category, Department, Role, User } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', email: 'admin@company.com', role: Role.ADMIN, name: 'Admin User' },
  { id: '2', email: 'user@company.com', role: Role.USER, name: 'Regular User' },
  { id: '3', email: 'john@company.com', role: Role.USER, name: 'John Doe' },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 'c1', name: 'Electronics' },
  { id: 'c2', name: 'Furniture' },
  { id: 'c3', name: 'Software' },
  { id: 'c4', name: 'Vehicles' },
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'IT' },
  { id: 'd2', name: 'HR' },
  { id: 'd3', name: 'Sales' },
  { id: 'd4', name: 'Operations' },
];

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'a1',
    name: 'MacBook Pro M1',
    categoryId: 'c1',
    departmentId: 'd1',
    cost: 1999,
    purchasedDate: '2023-01-15',
    createdBy: '1',
    createdAt: '2023-01-15T10:00:00Z',
  },
  {
    id: 'a2',
    name: 'Office Chair',
    categoryId: 'c2',
    departmentId: 'd2',
    cost: 250,
    purchasedDate: '2023-02-20',
    createdBy: '2',
    createdAt: '2023-02-20T11:30:00Z',
  },
  {
    id: 'a3',
    name: 'Adobe Creative Cloud',
    categoryId: 'c3',
    departmentId: 'd3',
    cost: 600,
    purchasedDate: '2023-03-10',
    createdBy: '2',
    createdAt: '2023-03-10T09:15:00Z',
  },
  {
    id: 'a4',
    name: 'Dell XPS 15',
    categoryId: 'c1',
    departmentId: 'd4',
    cost: 1500,
    purchasedDate: '2023-04-05',
    createdBy: '1',
    createdAt: '2023-04-05T14:20:00Z',
  },
  {
    id: 'a5',
    name: 'Conference Table',
    categoryId: 'c2',
    departmentId: 'd2',
    cost: 1200,
    purchasedDate: '2023-05-12',
    createdBy: '3',
    createdAt: '2023-05-12T16:00:00Z',
  },
];
