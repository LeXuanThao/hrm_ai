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
import { departmentService, DepartmentListParams } from '../services/departmentService';
import { Department } from '../mock/departments';
import { Link } from 'react-router-dom';

const DepartmentListPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 5;

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchDepartments();
      } else {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const params: DepartmentListParams = {
        page: currentPage,
        pageSize,
        search: searchTerm.trim() || undefined,
      };
      
      const response = await departmentService.getDepartments(params);
      setDepartments(response.departments);
      setTotalPages(Math.ceil(response.total / pageSize));
      setSelectedDepartments([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedDepartments([]);
    } else {
      setSelectedDepartments(departments.map(dept => dept.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectDepartment = (id: string) => {
    setSelectedDepartments(prev => {
      if (prev.includes(id)) {
        const newSelected = prev.filter(deptId => deptId !== id);
        setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, id];
        if (newSelected.length === departments.length) {
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

  const renderDepartmentTable = () => {
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
        accessor: (department: Department) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectedDepartments.includes(department.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectDepartment(department.id);
              }}
            />
          </div>
        ),
        className: 'w-10'
      },
      {
        header: 'Department',
        accessor: (department: Department) => (
          <div>
            <div className="text-sm font-medium text-gray-900">{department.name}</div>
            <div className="text-sm text-gray-500">{department.code}</div>
          </div>
        )
      },
      {
        header: 'Manager',
        accessor: (department: Department) => (
          <div className="text-sm text-gray-900">
            {department.managerName || 'Not assigned'}
          </div>
        )
      },
      {
        header: 'Employees',
        accessor: (department: Department) => (
          <div className="text-sm text-gray-900 text-center">
            {department.employeeCount}
          </div>
        ),
        className: 'text-center'
      },
      {
        header: 'Status',
        accessor: (department: Department) => (
          <Badge status={department.status} />
        )
      },
      {
        header: 'Created Date',
        accessor: (department: Department) => (
          <div className="text-sm text-gray-500">{formatDate(department.createdAt)}</div>
        )
      },
      {
        header: 'Actions',
        accessor: (department: Department) => (
          <div className="text-right text-sm font-medium">
            <Button 
              variant="light" 
              size="sm" 
              className="text-blue-600 mr-2"
              onClick={() => window.location.href = `/departments/${department.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button 
              variant="light" 
              size="sm" 
              className="text-indigo-600 mr-2"
              onClick={() => window.location.href = `/departments/edit/${department.id}`}
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
        data={departments}
        keyField="id"
        noDataProps={{
          title: "No departments found",
          message: "Get started by adding a new department.",
          icon: <UserGroupIcon size={64} className="mx-auto text-gray-400" />,
          actionLabel: "Add Department",
          actionPath: "/departments/new"
        }}
      />
    );
  };

  const renderDepartmentCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {departments.map((department) => (
        <Card key={department.id}>
          <div className="p-1 bg-gray-100 flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
              checked={selectedDepartments.includes(department.id)}
              onChange={() => toggleSelectDepartment(department.id)}
            />
          </div>
          <CardHeader
            title={
              <h3 className="text-lg font-medium text-gray-900">{department.name}</h3>
            }
            subtitle={<p className="text-sm text-gray-500">Code: {department.code}</p>}
            action={<Badge status={department.status} />}
          />
          <CardContent>
            <p className="text-sm text-gray-600">{department.description}</p>
          </CardContent>
          <CardContent className="bg-gray-50 text-sm pt-2 pb-2">
            <p className="mb-1"><span className="font-medium">Manager:</span> {department.managerName || 'Not assigned'}</p>
            <p className="mb-1"><span className="font-medium">Employees:</span> {department.employeeCount}</p>
            <p className="mb-1"><span className="font-medium">Created:</span> {formatDate(department.createdAt)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="light"
              size="sm"
              className="text-blue-600"
              onClick={() => window.location.href = `/departments/${department.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button
              variant="light"
              size="sm" 
              className="text-indigo-600"
              onClick={() => window.location.href = `/departments/edit/${department.id}`}
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
          { label: 'Departments' }
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-2">Department Management</h1>
      <p className="text-gray-600 mb-6">Manage organizational structure and department hierarchy</p>
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <LinkButton 
            to="/departments/new"
            variant="primary"
            icon={<PlusIcon size={20} />}
          >
            Add Department
          </LinkButton>
          
          {selectedDepartments.length > 0 && (
            <span className="text-sm text-gray-600">{selectedDepartments.length} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search departments"
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
          <p className="mt-4 text-gray-600">Loading departments...</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {viewMode === 'list' ? (
            renderDepartmentTable()
          ) : (
            departments.length > 0 ? renderDepartmentCards() : (
              <TableNoData 
                title="No departments found"
                message="Get started by adding a new department."
                icon={<UserGroupIcon size={64} className="mx-auto text-gray-400" />}
                actionLabel="Add Department"
                actionPath="/departments/new"
              />
            )
          )}
        </div>
      )}
      
      {!loading && departments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DepartmentListPage;
