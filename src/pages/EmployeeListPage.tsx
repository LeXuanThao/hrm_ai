import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ViewToggle, { ViewMode } from '../components/ViewToggle';
import Pagination from '../components/Pagination';
import Badge from '../components/Badge';
import Table from '../components/Table';
import TableNoData from '../components/TableNoData';
import Button, { LinkButton } from '../components/Button';
import Input from '../components/Input';
import Card, { CardHeader, CardContent, CardFooter } from '../components/Card';
import { PlusIcon, SearchIcon, EyeIcon, EditIcon, TrashIcon, LoadingIcon, UserGroupIcon } from '../components/Icons';
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
  const [searchTerm, setSearchTerm] = useState('');
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
        search: searchTerm.trim() || undefined,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchEmployees();
      } else {
        setCurrentPage(1); // This will trigger fetchEmployees via the currentPage dependency
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  // Format date to be more human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const renderEmployeeTable = () => {
    const columns = [
      {
        header: (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
        ),
        accessor: (employee: Employee) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectedEmployees.includes(employee.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectEmployee(employee.id);
              }}
            />
          </div>
        ),
        className: 'w-10'
      },
      {
        header: 'Employee',
        accessor: (employee: Employee) => (
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
        )
      },
      {
        header: 'Position',
        accessor: (employee: Employee) => (
          <div className="text-sm text-gray-900">{employee.position}</div>
        )
      },
      {
        header: 'Department',
        accessor: (employee: Employee) => (
          <div className="text-sm text-gray-900">{employee.department}</div>
        )
      },
      {
        header: 'Status',
        accessor: (employee: Employee) => (
          <Badge status={employee.status} />
        )
      },
      {
        header: 'Join Date',
        accessor: (employee: Employee) => (
          <div className="text-sm text-gray-500">{formatDate(employee.joinDate)}</div>
        )
      },
      {
        header: 'Actions',
        accessor: (employee: Employee) => (
          <div className="text-right text-sm font-medium">
            <Button 
              variant="light" 
              size="sm" 
              className="text-blue-600 mr-2"
              onClick={() => window.location.href = `/employees/${employee.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button 
              variant="light" 
              size="sm" 
              className="text-indigo-600 mr-2"
              onClick={() => window.location.href = `/employees/edit/${employee.id}`}
              icon={<EditIcon size={16} />}
            >
              Edit
            </Button>
            <Button 
              variant="light" 
              size="sm" 
              className="text-red-600"
              onClick={() => {/* Handle delete */}}
              icon={<TrashIcon size={16} />}
            >
              Delete
            </Button>
          </div>
        ),
        className: 'text-right'
      }
    ];

    return (
      <Table
        columns={columns}
        data={employees}
        keyField="id"
      />
    );
  };

  const renderEmployeeCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <Card key={employee.id}>
          <CardHeader
            title={
              <div className="flex flex-col items-center">
                <img
                  className="h-24 w-24 rounded-full mb-3"
                  src={employee.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random&size=128`}
                  alt={employee.name}
                />
                <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-500">{employee.position}</p>
                <Badge status={employee.status} className="mt-2" />
              </div>
            }
            className="flex justify-center"
          />
          <CardContent className="bg-gray-50 text-sm">
            <p className="mb-1"><span className="font-medium">Department:</span> {employee.department}</p>
            <p className="mb-1"><span className="font-medium">Email:</span> {employee.email}</p>
            <p className="mb-1"><span className="font-medium">Join Date:</span> {formatDate(employee.joinDate)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="light"
              size="sm"
              className="text-blue-600"
              onClick={() => window.location.href = `/employees/${employee.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button
              variant="light"
              size="sm" 
              className="text-indigo-600"
              onClick={() => window.location.href = `/employees/edit/${employee.id}`}
              icon={<EditIcon size={16} />}
            >
              Edit
            </Button>
            <Button
              variant="light"
              size="sm"
              className="text-red-600"
              onClick={() => {/* Handle delete */}}
              icon={<TrashIcon size={16} />}
            >
              Delete
            </Button>
          </CardFooter>
        </Card>
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
          <LinkButton 
            to="/employees/new"
            variant="primary"
            icon={<PlusIcon size={20} />}
          >
            Add Employee
          </LinkButton>
          
          {selectedEmployees.length > 0 && (
            <span className="text-sm text-gray-600">{selectedEmployees.length} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search employees"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<SearchIcon size={18} className="text-gray-500" />}
            size="md"
            fullWidth={false}
            className="min-w-[240px]"
          />
          
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-20">
          <LoadingIcon size={40} className="mx-auto text-blue-500" />
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      ) : (
        <div className="">
          {viewMode === 'list' ? (
            employees.length > 0 ? renderEmployeeTable() : (
              <TableNoData 
                title="No employees found"
                message="Get started by adding a new employee."
                icon={<UserGroupIcon size={64} className="mx-auto text-gray-400" />}
                actionLabel="Add Employee"
                actionPath="/employees/new"
              />
            )
          ) : (
            employees.length > 0 ? renderEmployeeCards() : (
              <TableNoData 
                title="No employees found"
                message="Get started by adding a new employee."
                icon={<UserGroupIcon size={64} className="mx-auto text-gray-400" />}
                actionLabel="Add Employee"
                actionPath="/employees/new"
              />
            )
          )}
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
