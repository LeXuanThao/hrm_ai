import { Employee, employees } from '../mock/employees';

// Simulate API call with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface EmployeeListResponse {
  employees: Employee[];
  total: number;
}

export interface EmployeeListParams {
  page: number;
  pageSize: number;
  search?: string;
  department?: string;
  status?: string;
}

export const employeeService = {
  async getEmployees({ page, pageSize, search, department, status }: EmployeeListParams): Promise<EmployeeListResponse> {
    // Simulate API delay
    await delay(300);
    
    let filteredEmployees = [...employees];
    
    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      filteredEmployees = filteredEmployees.filter(emp => 
        emp.name.toLowerCase().includes(searchLower) || 
        emp.email.toLowerCase().includes(searchLower) ||
        emp.position.toLowerCase().includes(searchLower)
      );
    }
    
    if (department) {
      filteredEmployees = filteredEmployees.filter(emp => emp.department === department);
    }
    
    if (status) {
      filteredEmployees = filteredEmployees.filter(emp => emp.status === status);
    }
    
    // Calculate pagination
    const total = filteredEmployees.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + pageSize);
    
    return {
      employees: paginatedEmployees,
      total
    };
  },
  
  async getEmployeeById(id: string): Promise<Employee | null> {
    await delay(200);
    const employee = employees.find(emp => emp.id === id);
    return employee || null;
  }
};
