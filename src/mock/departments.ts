export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  managerId: string;
  employeeCount: number;
  location: string;
  budget: number;
  createdAt: string;
}

export const departments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical infrastructure',
    manager: 'John Doe',
    managerId: '1',
    employeeCount: 24,
    location: 'Main Office - Floor 3',
    budget: 1200000,
    createdAt: '2020-01-15',
  },
  {
    id: '2',
    name: 'Product',
    description: 'Product management and design',
    manager: 'Jane Smith',
    managerId: '2',
    employeeCount: 12,
    location: 'Main Office - Floor 2',
    budget: 800000,
    createdAt: '2020-02-10',
  },
  {
    id: '3',
    name: 'Marketing',
    description: 'Marketing, communications and brand management',
    manager: 'Emma Thomas',
    managerId: '10',
    employeeCount: 8,
    location: 'Branch Office - East',
    budget: 650000,
    createdAt: '2020-03-05',
  },
  {
    id: '4',
    name: 'Human Resources',
    description: 'Recruiting, employee relations and company culture',
    manager: 'Sophie Brown',
    managerId: '6',
    employeeCount: 5,
    location: 'Main Office - Floor 1',
    budget: 420000,
    createdAt: '2020-01-20',
  },
  {
    id: '5',
    name: 'Finance',
    description: 'Accounting, budgeting and financial planning',
    manager: 'William Anderson',
    managerId: '9',
    employeeCount: 7,
    location: 'Main Office - Floor 1',
    budget: 520000,
    createdAt: '2020-02-18',
  },
  {
    id: '6',
    name: 'Sales',
    description: 'Customer acquisition and account management',
    manager: 'Daniel White',
    managerId: '11',
    employeeCount: 15,
    location: 'Branch Office - West',
    budget: 900000,
    createdAt: '2020-04-12',
  },
  {
    id: '7',
    name: 'Customer Support',
    description: 'Post-sales customer service and technical support',
    manager: 'Ava Harris',
    managerId: '12',
    employeeCount: 10,
    location: 'Branch Office - East',
    budget: 480000,
    createdAt: '2020-05-22',
  },
  {
    id: '8',
    name: 'Legal',
    description: 'Legal compliance, contracts and intellectual property',
    manager: 'Michael Johnson',
    managerId: '3',
    employeeCount: 3,
    location: 'Main Office - Floor 4',
    budget: 350000,
    createdAt: '2020-06-14',
  },
  {
    id: '9',
    name: 'Research & Development',
    description: 'Innovation, research and new product exploration',
    manager: 'David Wilson',
    managerId: '5',
    employeeCount: 8,
    location: 'Research Center',
    budget: 1500000,
    createdAt: '2021-01-05',
  },
  {
    id: '10',
    name: 'Operations',
    description: 'Facilities, security and daily operations',
    manager: 'James Taylor',
    managerId: '7',
    employeeCount: 6,
    location: 'Main Office - Floor 1',
    budget: 380000,
    createdAt: '2021-02-18',
  },
];
