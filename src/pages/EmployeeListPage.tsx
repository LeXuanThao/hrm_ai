import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ViewToggle, { ViewMode } from '../components/ViewToggle';
import Pagination from '../components/Pagination';
import { employeeService, EmployeeListParams } from '../services/employeeService';
import { Employee } from '../mock/employees';
import { Link } from 'react-router-dom';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const pageSize = 5;

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const params: EmployeeListParams = {
        page: currentPage,
        pageSize,
      };
      
      const response = await employeeService.getEmployees(params);
      setEmployees(response.employees);
      setTotalPages(Math.ceil(response.total / pageSize));
      setSelectedEmployees([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectEmployee = (id: string) => {
    setSelectedEmployees(prev => {
      if (prev.includes(id)) {
        const newSelected = prev.filter(empId => empId !== id);
        setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, id];
        if (newSelected.length === employees.length) {
          setSelectAll(true);
        }
        return newSelected;
      }
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date to be more human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const renderEmployeeTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Position
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Join Date
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    checked={selectedEmployees.includes(employee.id)}
                    onChange={() => toggleSelectEmployee(employee.id)}
                  />
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={employee.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
                      alt={employee.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.position}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{employee.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(employee.status)}`}>
                  {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(employee.joinDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                <Link to={`/employees/edit/${employee.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmployeeCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <div key={employee.id} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-1 bg-gray-100 flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => toggleSelectEmployee(employee.id)}
            />
          </div>
          <div className="px-6 py-4 flex flex-col items-center">
            <img
              className="h-24 w-24 rounded-full mb-3"
              src={employee.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random&size=128`}
              alt={employee.name}
            />
            <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
            <span className={`mt-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(employee.status)}`}>
              {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
            </span>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-sm">
            <p className="mb-1"><span className="font-medium">Department:</span> {employee.department}</p>
            <p className="mb-1"><span className="font-medium">Email:</span> {employee.email}</p>
            <p className="mb-1"><span className="font-medium">Join Date:</span> {formatDate(employee.joinDate)}</p>
          </div>
          <div className="px-6 py-2 bg-gray-100 flex justify-between">
            <Link to={`/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 text-sm">View</Link>
            <Link to={`/employees/edit/${employee.id}`} className="text-indigo-600 hover:text-indigo-900 text-sm">Edit</Link>
            <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Employees' }
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-2">Employee Management</h1>
      <p className="text-gray-600 mb-6">View and manage your organization's employees</p>
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <Link 
            to="/employees/new"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Employee
          </Link>
          
          {selectedEmployees.length > 0 && (
            <span className="text-sm text-gray-600">{selectedEmployees.length} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input 
              type="text" 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 block pl-10 p-2.5"
              placeholder="Search employees" 
            />
          </div>
          
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-20">
          <svg className="animate-spin h-10 w-10 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      ) : employees.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {viewMode === 'list' ? renderEmployeeTable() : renderEmployeeCards()}
        </div>
      ) : (
        <div className="text-center py-20 bg-white shadow rounded-lg">
          <svg className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No employees found</h3>
          <p className="mt-1 text-gray-500">Get started by adding a new employee.</p>
          <div className="mt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add Employee
            </button>
          </div>
        </div>
      )}
      
      {!loading && employees.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EmployeeListPage;
