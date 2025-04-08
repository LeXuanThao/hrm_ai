import positions, { Position } from '../mock/positions';

export interface PositionListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  departmentId?: string;
}

export interface PositionListResponse {
  positions: Position[];
  total: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const positionService = {
  getPositions: async (params: PositionListParams = {}): Promise<PositionListResponse> => {
    // Simulate API delay
    await delay(500);
    
    const { page = 1, pageSize = 10, search = '', status = '', departmentId = '' } = params;
    
    let filteredPositions = [...positions];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredPositions = filteredPositions.filter(
        pos => 
          pos.title.toLowerCase().includes(searchLower) ||
          pos.code.toLowerCase().includes(searchLower) ||
          pos.department.toLowerCase().includes(searchLower) ||
          pos.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (status) {
      filteredPositions = filteredPositions.filter(pos => pos.status === status);
    }
    
    // Apply department filter
    if (departmentId) {
      filteredPositions = filteredPositions.filter(pos => pos.departmentId === departmentId);
    }
    
    // Calculate pagination
    const start = (page - 1) * pageSize;
    const paginatedPositions = filteredPositions.slice(start, start + pageSize);
    
    return {
      positions: paginatedPositions,
      total: filteredPositions.length,
    };
  },
  
  getPositionById: async (id: string): Promise<Position | null> => {
    // Simulate API delay
    await delay(300);
    
    const position = positions.find(pos => pos.id === id);
    return position || null;
  },
  
  createPosition: async (positionData: Omit<Position, 'id' | 'createdAt'>): Promise<Position> => {
    // Simulate API delay
    await delay(500);
    
    const newPosition: Position = {
      id: String(positions.length + 1),
      createdAt: new Date().toISOString(),
      ...positionData,
    };
    
    // In a real app, this would persist to a database
    // Here we just return the new object
    return newPosition;
  },
  
  updatePosition: async (id: string, positionData: Partial<Position>): Promise<Position | null> => {
    // Simulate API delay
    await delay(500);
    
    const positionIndex = positions.findIndex(pos => pos.id === id);
    if (positionIndex === -1) return null;
    
    // In a real app, this would update the database
    // Here we just return the updated object
    const updatedPosition = {
      ...positions[positionIndex],
      ...positionData,
    };
    
    return updatedPosition;
  },
  
  deletePosition: async (id: string): Promise<boolean> => {
    // Simulate API delay
    await delay(500);
    
    const positionIndex = positions.findIndex(pos => pos.id === id);
    if (positionIndex === -1) return false;
    
    // In a real app, this would delete from the database
    // Here we just return success
    return true;
  },
};
