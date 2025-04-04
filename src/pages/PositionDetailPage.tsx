import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import Tabs from '../components/Tabs';
import { positionService } from '../services/positionService';
import { Position } from '../mock/positions';
import { formatCurrency } from '../utils/formatters';
import { Employee, employees } from '../mock/employees';

const PositionDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [positionEmployees, setPositionEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchPosition = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await positionService.getPositionById(id);
          if (data) {
            setPosition(data);
            // Filter employees by position
            const posEmployees = employees.filter(emp => emp.position === data.title);
            setPositionEmployees(posEmployees);
          } else {
            navigate('/404');
          }
        }
      } catch (error) {
        console.error('Error fetching position:', error);
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
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
        <p className="mt-4 text-gray-600">Loading position details...</p>
      </div>
    );
  }

  if (!position) {
    return null;
  }

  // Define different sections of position information
  const overviewSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Position Information</h3>
          <p className="mb-3"><span className="font-medium">Title:</span> {position.title}</p>
          <p className="mb-3"><span className="font-medium">Department:</span> {position.department}</p>
          <p className="mb-3"><span className="font-medium">Status:</span> 
            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
              position.status === 'active' ? 'bg-green-100 text-green-800' :
              position.status === 'inactive' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
            </span>
          </p>
          <p className="mb-3"><span className="font-medium">Created:</span> {formatDate(position.createdAt)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Information</h3>
          <p className="mb-3"><span className="font-medium">Minimum Salary:</span> ${formatCurrency(position.minSalary)}</p>
          <p className="mb-3"><span className="font-medium">Maximum Salary:</span> ${formatCurrency(position.maxSalary)}</p>
          <p className="mb-3"><span className="font-medium">Average Salary:</span> ${formatCurrency((position.minSalary + position.maxSalary) / 2)}</p>
          <p className="mb-3"><span className="font-medium">Employees in position:</span> {position.employeeCount}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Description</h3>
        <p className="text-gray-700">{position.description}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Salary Range Distribution</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-blue-600 h-4 rounded-full" style={{ width: '70%' }}></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>${formatCurrency(position.minSalary)}</span>
          <span>${formatCurrency(position.maxSalary)}</span>
        </div>
      </div>
    </div>
  );

  const employeesSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Current Employees</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Employee
        </button>
      </div>
      
      {positionEmployees.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {positionEmployees.map((employee) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
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
          <h3 className="mt-2 text-sm font-medium text-gray-900">No employees</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding employees to this position.</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Employee
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const responsibilitiesSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Job Responsibilities</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Responsibility
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Design and Development</h4>
          <p className="text-gray-700">Design, develop, and maintain high-quality software solutions that meet business requirements.</p>
        </div>
        
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Code Review and Testing</h4>
          <p className="text-gray-700">Conduct code reviews, implement testing strategies, and ensure software quality and performance.</p>
        </div>
        
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Collaboration</h4>
          <p className="text-gray-700">Collaborate with cross-functional teams to define, design, and implement features that meet business needs.</p>
        </div>
        
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
          <p className="text-gray-700">Create and maintain technical documentation for software systems and components.</p>
        </div>
        
        <div className="border p-4 rounded-lg hover:bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-2">Problem Solving</h4>
          <p className="text-gray-700">Identify, troubleshoot, and resolve technical issues in a timely manner.</p>
        </div>
      </div>
    </div>
  );

  const requirementsSection = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Position Requirements</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Requirement
        </button>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Education</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Bachelor's degree in Computer Science, Software Engineering, or related field</li>
          <li>Master's degree preferred but not required</li>
          <li>Relevant professional certifications are a plus</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Experience</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>3+ years of professional experience in software development</li>
          <li>Experience with modern web development frameworks and libraries</li>
          <li>Previous experience in an Agile development environment</li>
          <li>Track record of delivering high-quality software products</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TypeScript</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">HTML/CSS</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Git</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">SQL</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">REST APIs</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Testing</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Problem Solving</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Communication</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Teamwork</span>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Additional Requirements</h4>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Strong understanding of software development principles</li>
          <li>Excellent problem-solving and analytical skills</li>
          <li>Ability to work independently and as part of a team</li>
          <li>Good written and verbal communication skills</li>
          <li>Willingness to learn new technologies and frameworks</li>
        </ul>
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
      id: 'employees',
      label: 'Employees',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      content: employeesSection
    },
    {
      id: 'responsibilities',
      label: 'Responsibilities',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: responsibilitiesSection
    },
    {
      id: 'requirements',
      label: 'Requirements',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      content: requirementsSection
    }
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Positions', path: '/positions' },
          { label: position.title }
        ]}
      />
      
      <div className="mb-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <p className="text-sm text-gray-500">Position ID: {position.id}</p>
            <h1 className="text-2xl font-bold text-gray-900">{position.title}</h1>
            <p className="text-gray-600 mt-1">{position.description}</p>
            
            <div className="mt-2 flex items-center">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(position.status)}`}>
                {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
              </span>
              <span className="ml-2 text-sm text-gray-500">• Department: {position.department}</span>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
              <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Position
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Post Job
            </button>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Department</span>
            <span className="block text-lg font-medium">{position.department}</span>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Employees</span>
            <span className="block text-lg font-medium">{position.employeeCount}</span>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Salary Range</span>
            <span className="block text-lg font-medium">${formatCurrency(position.minSalary)} - ${formatCurrency(position.maxSalary)}</span>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <span className="block text-sm text-gray-500">Created</span>
            <span className="block text-lg font-medium">{formatDate(position.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <Tabs tabs={tabs} defaultActiveTab="overview" />
    </div>
  );
};

export default PositionDetailPage;
