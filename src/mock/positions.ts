export interface Position {
  id: string;
  title: string;
  department: string;
  employeeCount: number;
  minSalary: number;
  maxSalary: number;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  description: string;
}

export const positions: Position[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    department: 'Engineering',
    employeeCount: 8,
    minSalary: 50000,
    maxSalary: 90000,
    status: 'active',
    createdAt: '2022-01-15',
    description: 'Responsible for implementing visual elements that users see and interact with in a web application.'
  },
  {
    id: '2',
    title: 'Backend Developer',
    department: 'Engineering',
    employeeCount: 10,
    minSalary: 60000,
    maxSalary: 100000,
    status: 'active',
    createdAt: '2022-01-15',
    description: 'Responsible for server-side web application logic and integration with databases.'
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    employeeCount: 3,
    minSalary: 70000,
    maxSalary: 120000,
    status: 'active',
    createdAt: '2022-02-10',
    description: 'Responsible for product planning, roadmap development, and feature specification.'
  },
  {
    id: '4',
    title: 'UX Designer',
    department: 'Design',
    employeeCount: 4,
    minSalary: 55000,
    maxSalary: 95000,
    status: 'active',
    createdAt: '2022-03-05',
    description: 'Responsible for enhancing user satisfaction with a product by improving the usability and accessibility.'
  },
  {
    id: '5',
    title: 'UI Designer',
    department: 'Design',
    employeeCount: 3,
    minSalary: 50000,
    maxSalary: 90000,
    status: 'active',
    createdAt: '2022-03-05',
    description: 'Responsible for designing the visual elements of the user interface and brand identity.'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    department: 'Engineering',
    employeeCount: 5,
    minSalary: 65000,
    maxSalary: 110000,
    status: 'active',
    createdAt: '2022-01-20',
    description: 'Responsible for implementing and maintaining CI/CD pipelines and infrastructure automation.'
  },
  {
    id: '7',
    title: 'QA Engineer',
    department: 'Engineering',
    employeeCount: 6,
    minSalary: 45000,
    maxSalary: 85000,
    status: 'active',
    createdAt: '2022-01-25',
    description: 'Responsible for ensuring product quality through manual and automated testing.'
  },
  {
    id: '8',
    title: 'HR Specialist',
    department: 'Human Resources',
    employeeCount: 3,
    minSalary: 40000,
    maxSalary: 70000,
    status: 'active',
    createdAt: '2022-02-15',
    description: 'Responsible for recruitment, employee relations, and company culture initiatives.'
  },
  {
    id: '9',
    title: 'Marketing Specialist',
    department: 'Marketing',
    employeeCount: 4,
    minSalary: 45000,
    maxSalary: 75000,
    status: 'active',
    createdAt: '2022-02-20',
    description: 'Responsible for developing and implementing marketing strategies to promote the company\'s products and services.'
  },
  {
    id: '10',
    title: 'Financial Analyst',
    department: 'Finance',
    employeeCount: 3,
    minSalary: 55000,
    maxSalary: 90000,
    status: 'active',
    createdAt: '2022-03-01',
    description: 'Responsible for financial planning, analysis, and reporting to support business decisions.'
  },
  {
    id: '11',
    title: 'Customer Support Representative',
    department: 'Customer Support',
    employeeCount: 8,
    minSalary: 35000,
    maxSalary: 55000,
    status: 'active',
    createdAt: '2022-03-10',
    description: 'Responsible for addressing customer inquiries, resolving issues, and providing product information.'
  },
  {
    id: '12',
    title: 'Sales Representative',
    department: 'Sales',
    employeeCount: 6,
    minSalary: 40000,
    maxSalary: 80000,
    status: 'active',
    createdAt: '2022-03-15',
    description: 'Responsible for selling products or services and building relationships with potential customers.'
  },
  {
    id: '13',
    title: 'Project Manager',
    department: 'Operations',
    employeeCount: 3,
    minSalary: 65000,
    maxSalary: 110000,
    status: 'active',
    createdAt: '2022-01-10',
    description: 'Responsible for planning, executing, and closing projects on time and within budget.'
  },
  {
    id: '14',
    title: 'Data Scientist',
    department: 'Research & Development',
    employeeCount: 2,
    minSalary: 70000,
    maxSalary: 120000,
    status: 'active',
    createdAt: '2022-04-05',
    description: 'Responsible for analyzing and interpreting complex data to inform business decisions.'
  },
  {
    id: '15',
    title: 'Chief Executive Officer',
    department: 'Executive',
    employeeCount: 1,
    minSalary: 150000,
    maxSalary: 300000,
    status: 'active',
    createdAt: '2020-01-01',
    description: 'Responsible for the overall operation, resources, and performance of the company.'
  }
];
