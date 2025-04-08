export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  managerId: string | null;
  managerName: string | null;
  employeeCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

const departments: Department[] = [
  {
    id: '1',
    name: 'Human Resources',
    code: 'HR',
    description: 'Responsible for recruiting, onboarding, and employee relations',
    managerId: '2',
    managerName: 'Jane Smith',
    employeeCount: 12,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Information Technology',
    code: 'IT',
    description: 'Responsible for managing technology infrastructure and software development',
    managerId: '3',
    managerName: 'Mike Johnson',
    employeeCount: 25,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Finance',
    code: 'FIN',
    description: 'Handles company finances, accounting, and payroll',
    managerId: '4',
    managerName: 'Sarah Williams',
    employeeCount: 15,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'Marketing',
    code: 'MKT',
    description: 'Handles brand management and marketing campaigns',
    managerId: '5',
    managerName: 'David Brown',
    employeeCount: 18,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Sales',
    code: 'SLS',
    description: 'Responsible for client acquisition and relationship management',
    managerId: '6',
    managerName: 'Jennifer Lee',
    employeeCount: 20,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '6',
    name: 'Operations',
    code: 'OPS',
    description: 'Manages day-to-day business operations',
    managerId: '7',
    managerName: 'Robert Chen',
    employeeCount: 22,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '7',
    name: 'Research & Development',
    code: 'R&D',
    description: 'Focuses on product innovation and development',
    managerId: '8',
    managerName: 'Emily Wilson',
    employeeCount: 17,
    status: 'active',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
  {
    id: '8',
    name: 'Customer Support',
    code: 'CS',
    description: 'Provides assistance and technical support to customers',
    managerId: '9',
    managerName: 'Thomas Garcia',
    employeeCount: 14,
    status: 'inactive',
    createdAt: '2020-01-15T00:00:00.000Z',
  },
];

export default departments;
