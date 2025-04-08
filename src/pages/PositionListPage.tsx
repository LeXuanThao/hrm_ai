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
import { positionService, PositionListParams } from '../services/positionService';
import { Position } from '../mock/positions';

const PositionListPage = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const pageSize = 5;

  useEffect(() => {
    fetchPositions();
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchPositions();
      } else {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchPositions = async () => {
    setLoading(true);
    try {
      const params: PositionListParams = {
        page: currentPage,
        pageSize,
        search: searchTerm.trim() || undefined,
      };
      
      const response = await positionService.getPositions(params);
      setPositions(response.positions);
      setTotalPages(Math.ceil(response.total / pageSize));
      setSelectedPositions([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error fetching positions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPositions([]);
    } else {
      setSelectedPositions(positions.map(pos => pos.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectPosition = (id: string) => {
    setSelectedPositions(prev => {
      if (prev.includes(id)) {
        const newSelected = prev.filter(posId => posId !== id);
        setSelectAll(false);
        return newSelected;
      } else {
        const newSelected = [...prev, id];
        if (newSelected.length === positions.length) {
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

  // Format currency for salary display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderPositionTable = () => {
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
        accessor: (position: Position) => (
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={selectedPositions.includes(position.id)}
              onChange={(e) => {
                e.stopPropagation();
                toggleSelectPosition(position.id);
              }}
            />
          </div>
        ),
        className: 'w-10'
      },
      {
        header: 'Position',
        accessor: (position: Position) => (
          <div>
            <div className="text-sm font-medium text-gray-900">{position.title}</div>
            <div className="text-sm text-gray-500">{position.code}</div>
          </div>
        )
      },
      {
        header: 'Department',
        accessor: (position: Position) => (
          <div className="text-sm text-gray-900">
            {position.department}
          </div>
        )
      },
      {
        header: 'Salary Range',
        accessor: (position: Position) => (
          <div className="text-sm text-gray-900">
            {formatCurrency(position.minSalary)} - {formatCurrency(position.maxSalary)}
          </div>
        ),
      },
      {
        header: 'Employees',
        accessor: (position: Position) => (
          <div className="text-sm text-gray-900 text-center">
            {position.employeeCount}
          </div>
        ),
        className: 'text-center'
      },
      {
        header: 'Status',
        accessor: (position: Position) => (
          <Badge status={position.status} />
        )
      },
      {
        header: 'Actions',
        accessor: (position: Position) => (
          <div className="text-right text-sm font-medium">
            <Button 
              variant="light" 
              size="sm" 
              className="text-blue-600 mr-2"
              onClick={() => window.location.href = `/positions/${position.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button 
              variant="light" 
              size="sm" 
              className="text-indigo-600 mr-2"
              onClick={() => window.location.href = `/positions/edit/${position.id}`}
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
        data={positions}
        keyField="id"
        noDataProps={{
          title: "No positions found",
          message: "Get started by adding a new position.",
          icon: <UserGroupIcon size={64} className="mx-auto text-gray-400" />,
          actionLabel: "Add Position",
          actionPath: "/positions/new"
        }}
      />
    );
  };

  const renderPositionCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {positions.map((position) => (
        <Card key={position.id}>
          <div className="p-1 bg-gray-100 flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded ml-2"
              checked={selectedPositions.includes(position.id)}
              onChange={() => toggleSelectPosition(position.id)}
            />
          </div>
          <CardHeader
            title={
              <h3 className="text-lg font-medium text-gray-900">{position.title}</h3>
            }
            subtitle={<p className="text-sm text-gray-500">Code: {position.code}</p>}
            action={<Badge status={position.status} />}
          />
          <CardContent>
            <p className="text-sm text-gray-600">{position.description}</p>
          </CardContent>
          <CardContent className="bg-gray-50 text-sm pt-2 pb-2">
            <p className="mb-1"><span className="font-medium">Department:</span> {position.department}</p>
            <p className="mb-1"><span className="font-medium">Salary Range:</span> {formatCurrency(position.minSalary)} - {formatCurrency(position.maxSalary)}</p>
            <p className="mb-1"><span className="font-medium">Employees:</span> {position.employeeCount}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="light"
              size="sm"
              className="text-blue-600"
              onClick={() => window.location.href = `/positions/${position.id}`}
              icon={<EyeIcon size={16} />}
            >
              View
            </Button>
            <Button
              variant="light"
              size="sm" 
              className="text-indigo-600"
              onClick={() => window.location.href = `/positions/edit/${position.id}`}
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
          { label: 'Positions' }
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-2">Position Management</h1>
      <p className="text-gray-600 mb-6">Manage job positions, titles, and salary ranges</p>
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <LinkButton 
            to="/positions/new"
            variant="primary"
            icon={<PlusIcon size={20} />}
          >
            Add Position
          </LinkButton>
          
          {selectedPositions.length > 0 && (
            <span className="text-sm text-gray-600">{selectedPositions.length} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search positions"
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
          <p className="mt-4 text-gray-600">Loading positions...</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {viewMode === 'list' ? (
            renderPositionTable()
          ) : (
            positions.length > 0 ? renderPositionCards() : (
              <TableNoData 
                title="No positions found"
                message="Get started by adding a new position."
                icon={<UserGroupIcon size={64} className="mx-auto text-gray-400" />}
                actionLabel="Add Position"
                actionPath="/positions/new"
              />
            )
          )}
        </div>
      )}
      
      {!loading && positions.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PositionListPage;
