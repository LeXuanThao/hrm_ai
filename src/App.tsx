import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import EmployeesList from './pages/EmployeesList';
import DepartmentsList from './pages/DepartmentsList';
import PositionsList from './pages/PositionsList';
import EmployeeDetail from './pages/EmployeeDetail';
import DepartmentDetail from './pages/DepartmentDetail';
import PositionDetail from './pages/PositionDetail';
import DeniedPage from './pages/DeniedPage';
import EditDepartmentForm from './pages/EditDepartmentForm';
import EditEmployeeForm from './pages/EditEmployeeForm';
import EditPositionForm from './pages/EditPositionForm';
import { ThemeProvider } from './providers/ThemeProvider';
import { LanguageProvider } from './providers/LanguageProvider';
import { RoleProvider } from './providers/RoleProvider';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RoleProvider>
          <Router>
            <MainLayout>
              <Switch>
                <Route path="/employees" component={EmployeesList} />
                <Route path="/departments" component={DepartmentsList} />
                <Route path="/positions" component={PositionsList} />
                <Route path="/employee/:id" component={EmployeeDetail} />
                <Route path="/department/:id" component={DepartmentDetail} />
                <Route path="/position/:id" component={PositionDetail} />
                <Route path="/edit-department" component={EditDepartmentForm} />
                <Route path="/edit-employee" component={EditEmployeeForm} />
                <Route path="/edit-position" component={EditPositionForm} />
                <Route path="/denied" component={DeniedPage} />
              </Switch>
            </MainLayout>
          </Router>
        </RoleProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
