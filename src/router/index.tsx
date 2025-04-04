import { createBrowserRouter, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import SettingsPage from '../pages/SettingsPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import EmployeeListPage from '../pages/EmployeeListPage'
import EmployeeDetailPage from '../pages/EmployeeDetailPage'
import EmployeeFormPage from '../pages/EmployeeFormPage'
import DepartmentListPage from '../pages/DepartmentListPage'
import DepartmentDetailPage from '../pages/DepartmentDetailPage'
import PositionListPage from '../pages/PositionListPage'
import PositionDetailPage from '../pages/PositionDetailPage'
import AppLayout from '../layouts/AppLayout'
import ProtectedRoute from '../components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees',
        element: (
          <ProtectedRoute>
            <EmployeeListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees/new',
        element: (
          <ProtectedRoute>
            <EmployeeFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees/edit/:id',
        element: (
          <ProtectedRoute>
            <EmployeeFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'employees/:id',
        element: (
          <ProtectedRoute>
            <EmployeeDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'departments',
        element: (
          <ProtectedRoute>
            <DepartmentListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'departments/:id',
        element: (
          <ProtectedRoute>
            <DepartmentDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'positions',
        element: (
          <ProtectedRoute>
            <PositionListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'positions/:id',
        element: (
          <ProtectedRoute>
            <PositionDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: '404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
])
