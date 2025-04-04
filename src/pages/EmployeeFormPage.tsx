import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { employeeService } from '../services/employeeService';
import { departments } from '../mock/departments';
import { positions } from '../mock/positions';
import { Employee } from '../mock/employees';

const EmployeeFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
    phoneNumber: '',
  });

  useEffect(() => {
    if (isEditMode && id) {
      fetchEmployee(id);
    }
  }, [isEditMode, id]);

  const fetchEmployee = async (employeeId: string) => {
    try {
      const data = await employeeService.getEmployeeById(employeeId);
      if (data) {
        setFormData({
          ...data,
          joinDate: new Date(data.joinDate).toISOString().split('T')[0],
        });
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.error('Error fetching employee:', error);
      navigate('/404');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real application, this would call an API to save the employee
      console.log('Submitting employee data:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect back to the employees list page
      navigate('/employees');
    } catch (error) {
      console.error('Error saving employee:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <svg className="animate-spin h-10 w-10 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-gray-600">Loading employee data...</p>
      </div>
    );
  }

  const pageTitle = isEditMode ? 'Edit Employee' : 'Add New Employee';
  const pageSubtitle = isEditMode 
    ? 'Update employee information' 
    : 'Create a new employee record in the system';

  return (
    <div>
      <Breadcrumb
        items={[
          { label: 'Employees', path: '/employees' },
          { label: isEditMode ? 'Edit Employee' : 'Add Employee' }
        ]}
      />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-gray-600">{pageSubtitle}</p>
      </div>
      
      <div className="flex justify-end mb-6">
        <div className="flex space-x-3">
          <Link 
            to="/employees" 
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button 
            type="button" 
            onClick={() => document.getElementById('employee-form')?.requestSubmit()}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : isEditMode ? 'Save Changes' : 'Create Employee'}
          </button>
        </div>
      </div>
      
      <form id="employee-form" onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Personal Information</h3>
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                  placeholder="https://example.com/profile.jpg"
                />
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center">
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="h-12 w-12 rounded-full object-cover"
                      onError={(e) => { 
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=random`;
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-500">Image Preview</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Employment Details</h3>
              
              <div className="mb-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                <select
                  id="department"
                  name="department"
                  value={formData.department || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a department</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position <span className="text-red-500">*</span></label>
                <select
                  id="position"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a position</option>
                  {positions
                    .filter(pos => !formData.department || pos.department === formData.department)
                    .map(pos => (
                      <option key={pos.id} value={pos.title}>{pos.title}</option>
                    ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status <span className="text-red-500">*</span></label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || 'active'}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1">Join Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  id="joinDate"
                  name="joinDate"
                  value={formData.joinDate || ''}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Additional Information</h3>
            
            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                placeholder="Any additional information about the employee..."
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 text-right">
          <div className="flex justify-end space-x-3">
            <Link 
              to="/employees" 
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button 
              type="submit" 
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : isEditMode ? 'Save Changes' : 'Create Employee'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeFormPage;
