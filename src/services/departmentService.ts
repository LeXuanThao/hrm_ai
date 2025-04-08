import departments, { Department } from '../mock/departments';

export interface DepartmentListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
}

export interface DepartmentListResponse {
  departments: Department[];
  total: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const departmentService = {
  getDepartments: async (params: DepartmentListParams = {}): Promise<DepartmentListResponse> => {
    // Simulate API delay
    await delay(500);
    
    const { page = 1, pageSize = 10, search = '', status = '' } = params;
    
    let filteredDepartments = [...departments];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredDepartments = filteredDepartments.filter(
        dept => 
          dept.name.toLowerCase().includes(searchLower) ||
          dept.code.toLowerCase().includes(searchLower) ||
          dept.description.toLowerCase().includes(searchLower) ||
          (dept.managerName && dept.managerName.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply status filter
    if (status) {
      filteredDepartments = filteredDepartments.filter(dept => dept.status === status);
    }
    
    // Calculate pagination
    const start = (page - 1) * pageSize;
    const paginatedDepartments = filteredDepartments.slice(start, start + pageSize);
    
    return {
      departments: paginatedDepartments,
      total: filteredDepartments.length,
    };
  },
  
  getDepartmentById: async (id: string): Promise<Department | null> => {
    // Simulate API delay
    await delay(300);
    
    const department = departments.find(dept => dept.id === id);
    return department || null;
  },
  
  createDepartment: async (departmentData: Omit<Department, 'id' | 'createdAt'>): Promise<Department> => {
    // Simulate API delay
    await delay(500);
    
    const newDepartment: Department = {
      id: String(departments.length + 1),
      createdAt: new Date().toISOString(),
      ...departmentData,
    };
    
    // In a real app, this would persist to a database
    // Here we just return the new object
    return newDepartment;
  },
  
  updateDepartment: async (id: string, departmentData: Partial<Department>): Promise<Department | null> => {
    // Simulate API delay
    await delay(500);
    
    const departmentIndex = departments.findIndex(dept => dept.id === id);
    if (departmentIndex === -1) return null;
    
    // In a real app, this would update the database
    // Here we just return the updated object
    const updatedDepartment = {
      ...departments[departmentIndex],
      ...departmentData,
    };
    
    return updatedDepartment;
  },
  
  deleteDepartment: async (id: string): Promise<boolean> => {
    // Simulate API delay
    await delay(500);
    
    const departmentIndex = departments.findIndex(dept => dept.id === id);
    if (departmentIndex === -1) return false;
    
    // In a real app, this would delete from the database
    // Here we just return success
    return true;
  },
};
