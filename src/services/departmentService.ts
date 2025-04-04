import { Department, departments } from '../mock/departments';

// Simulate API call with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface DepartmentListResponse {
  departments: Department[];
  total: number;
}

export interface DepartmentListParams {
  page: number;
  pageSize: number;
  search?: string;
}

export const departmentService = {
  async getDepartments({ page, pageSize, search }: DepartmentListParams): Promise<DepartmentListResponse> {
    // Simulate API delay
    await delay(300);
    
    let filteredDepartments = [...departments];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredDepartments = filteredDepartments.filter(dept => 
        dept.name.toLowerCase().includes(searchLower) || 
        dept.description.toLowerCase().includes(searchLower) ||
        dept.manager.toLowerCase().includes(searchLower)
      );
    }
    
    // Calculate pagination
    const total = filteredDepartments.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedDepartments = filteredDepartments.slice(startIndex, startIndex + pageSize);
    
    return {
      departments: paginatedDepartments,
      total
    };
  },
  
  async getDepartmentById(id: string): Promise<Department | null> {
    await delay(200);
    const department = departments.find(dept => dept.id === id);
    return department || null;
  }
};
