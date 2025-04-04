import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Tabs from '../components/Tabs';
import { departmentService } from '../services/departmentService';
import { Department } from '../mock/departments';
import { formatCurrency } from '../utils/formatters';
import { Employee, employees } from '../mock/employees';

const DepartmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [departmentEmployees, setDepartmentEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await departmentService.getDepartmentById(id);
          if (data) {
            setDepartment(data);
            // Filter employees by department
            const deptEmployees = employees.filter(emp => emp.department === data.name);
            setDepartmentEmployees(deptEmployees);
          } else {
            navigate('/404');
          }
        }
      } catch (error) {
        console.error('Error fetching department:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id, navigate]);

  // Format date to be more human-readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <svg className="animate-spin h-10 w-10 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600">Loading department details...</p>
      </div>
    );
  }

  if (!department) {
    return null;
  }

  // Define different sections of department information
  const overviewSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Department Information</h3>
          <p className="mb-3"><span className="font-medium">Name:</span> {department.name}</p>
          <p className="mb-3"><span className="font-medium">Description:</span> {department.description}</p>
          <p className="mb-3"><span className="font-medium">Location:</span> {department.location}</p>
          <p className="mb-3"><span className="font-medium">Created:</span> {formatDate(department.createdAt)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Management & Statistics</h3>
          <p className="mb-3">
            <span className="font-medium">Manager:</span> 
            <Link to={`/employees/${department.managerId}`} className="ml-1 text-blue-600 hover:text-blue-800">
              {department.manager}
            </Link>
          </p>
          <p className="mb-3"><span className="font-medium">Employees:</span> {department.employeeCount}</p>
          <p className="mb-3"><span className="font-medium">Annual Budget:</span> ${formatCurrency(department.budget)}</p>
        </div>
      </div>
    </div>
  );

  const membersSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Department Members</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Member
        </button>
      </div>
      
      {departmentEmployees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {departmentEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(employee.joinDate)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/employees/${employee.id}`} className="text-blue-600 hover:text-blue-900 mr-3">View</Link>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No members</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a member to this department.</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const projectsSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Project
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium">Website Redesign</h4>
              <p className="text-sm text-gray-600 mt-1">Redesigning the company website with new branding and improved user experience.</p>
              <div className="mt-2 flex items-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">In Progress</span>
                <span className="text-sm text-gray-500">Due: Dec 15, 2023</span>
              </div>
            </div>
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/2.jpg" alt="" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/3.jpg" alt="" />
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium">Mobile App Development</h4>
              <p className="text-sm text-gray-600 mt-1">Creating a mobile app version of our platform for iOS and Android.</p>
              <div className="mt-2 flex items-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">On Track</span>
                <span className="text-sm text-gray-500">Due: Mar 30, 2024</span>
              </div>
            </div>
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/4.jpg" alt="" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/5.jpg" alt="" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/6.jpg" alt="" />
              <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-500">+2</div>
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:bg-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-medium">Customer Research Project</h4>
              <p className="text-sm text-gray-600 mt-1">Conducting market research to identify customer needs and preferences.</p>
              <div className="mt-2 flex items-center">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">At Risk</span>
                <span className="text-sm text-gray-500">Due: Nov 10, 2023</span>
              </div>
            </div>
            <div className="flex -space-x-2">
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/7.jpg" alt="" />
              <img className="h-8 w-8 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/8.jpg" alt="" />
            </div>
          </div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  const budgetSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Budget & Finance</h3>
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Download Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Annual Budget</p>
          <p className="text-2xl font-bold">${formatCurrency(department.budget)}</p>
          <p className="text-xs text-gray-500">Fiscal Year 2023</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Budget Spent</p>
          <p className="text-2xl font-bold">${formatCurrency(Math.floor(department.budget * 0.68))}</p>
          <p className="text-xs text-green-600">68% of total budget</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Budget Remaining</p>
          <p className="text-2xl font-bold">${formatCurrency(Math.floor(department.budget * 0.32))}</p>
          <p className="text-xs text-purple-600">32% remaining</p>
        </div>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-3">Budget Allocation</h4>
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Salaries & Benefits</span>
          <span className="text-sm font-medium">65%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
        </div>
        
        <div className="flex justify-between mb-1 mt-3">
          <span className="text-sm font-medium">Equipment & Supplies</span>
          <span className="text-sm font-medium">15%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
        </div>
        
        <div className="flex justify-between mb-1 mt-3">
          <span className="text-sm font-medium">Training & Development</span>
          <span className="text-sm font-medium">10%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
        </div>
        
        <div className="flex justify-between mb-1 mt-3">
          <span className="text-sm font-medium">Software & Subscriptions</span>
          <span className="text-sm font-medium">7%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '7%' }}></div>
        </div>
        
        <div className="flex justify-between mb-1 mt-3">
          <span className="text-sm font-medium">Miscellaneous</span>
          <span className="text-sm font-medium">3%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '3%' }}></div>
        </div>
      </div>
      
      <h4 className="font-medium text-gray-900 mb-3">Recent Expenses</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">New Workstation Setup</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 15, 2023</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Equipment</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">-$2,500</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Team Building Event</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 10, 2023</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Miscellaneous</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">-$1,200</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Software Licenses</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Oct 5, 2023</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Software</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">-$5,000</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Professional Training</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sep 28, 2023</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Training</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">-$3,500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const documentsSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Department Documents</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload Document
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added By</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Department Handbook</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                PDF
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate('2023-01-15')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {department.manager}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Strategic Plan 2023</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                PPTX
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate('2023-02-28')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {department.manager}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Budget Report Q3 2023</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                XLSX
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate('2023-10-05')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Finance Team
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      content: overviewSection
    },
    {
      id: 'members',
      label: 'Members',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      content: membersSection
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: projectsSection
    },
    {
      id: 'budget',
      label: 'Budget',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: budgetSection
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
        </svg>
      ),
      content: documentsSection
    }
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Departments', path: '/departments' },
          { label: department.name }
        ]}
      />
      
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-sm text-gray-500">Department ID: {department.id}</p>
            <h1 className="text-2xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-600 mt-1">{department.description}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Department
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Member
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Manager</span>
            <span className="block text-lg font-medium">{department.manager}</span>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Employees</span>
            <span className="block text-lg font-medium">{department.employeeCount}</span>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Location</span>
            <span className="block text-lg font-medium">{department.location}</span>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Established</span>
            <span className="block text-lg font-medium">{new Date(department.createdAt).getFullYear()}</span>
          </div>
        </div>
      </div>
      
      <Tabs tabs={tabs} defaultActiveTab="overview" />
    </div>
  );
};

export default DepartmentDetailPage;
