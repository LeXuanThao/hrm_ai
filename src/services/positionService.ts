import { Position, positions } from '../mock/positions';

// Simulate API call with delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface PositionListResponse {
  positions: Position[];
  total: number;
}

export interface PositionListParams {
  page: number;
  pageSize: number;
  search?: string;
  department?: string;
  status?: string;
}

export const positionService = {
  async getPositions({ page, pageSize, search, department, status }: PositionListParams): Promise<PositionListResponse> {
    // Simulate API delay
    await delay(300);
    
    let filteredPositions = [...positions];
    
    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPositions = filteredPositions.filter(pos => 
        pos.title.toLowerCase().includes(searchLower) || 
        pos.description.toLowerCase().includes(searchLower) ||
        pos.department.toLowerCase().includes(searchLower)
      );
    }
    
    if (department) {
      filteredPositions = filteredPositions.filter(pos => pos.department === department);
    }
    
    if (status) {
      filteredPositions = filteredPositions.filter(pos => pos.status === status);
    }
    
    // Calculate pagination
    const total = filteredPositions.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedPositions = filteredPositions.slice(startIndex, startIndex + pageSize);
    
    return {
      positions: paginatedPositions,
      total
    };
  },
  
  async getPositionById(id: string): Promise<Position | null> {
    await delay(200);
    const position = positions.find(pos => pos.id === id);
    return position || null;
  }
};
