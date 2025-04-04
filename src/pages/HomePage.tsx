import { useAuth } from '../providers'

const HomePage = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to HRM System</h1>
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Hello, {user.name}!</h2>
          <p className="text-gray-600">You are logged in as a {user.role}.</p>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Employee Management</h3>
          <p className="text-gray-600">Manage your employees and their information</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Time Tracking</h3>
          <p className="text-gray-600">Track employee working hours and attendance</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Payroll</h3>
          <p className="text-gray-600">Manage employee compensation and benefits</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
