import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>HRM System</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/employees">Employees</a></li>
            <li><a href="/departments">Departments</a></li>
            <li><a href="/positions">Positions</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
