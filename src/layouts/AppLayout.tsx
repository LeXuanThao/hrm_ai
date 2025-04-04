import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../providers'

const AppLayout = () => {
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">HRM System</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
              {isAuthenticated && (
                <>
                  <li><Link to="/employees" className="hover:text-blue-300">Employees</Link></li>
                  <li><Link to="/departments" className="hover:text-blue-300">Departments</Link></li>
                  <li><Link to="/positions" className="hover:text-blue-300">Positions</Link></li>
                </>
              )}
              <li><Link to="/about" className="hover:text-blue-300">About</Link></li>
              <li><Link to="/settings" className="hover:text-blue-300">Settings</Link></li>
              {isAuthenticated ? (
                <li><button onClick={logout} className="hover:text-blue-300">Logout</button></li>
              ) : (
                <li><Link to="/login" className="hover:text-blue-300">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} HRM System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout
