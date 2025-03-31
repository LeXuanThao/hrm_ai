import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
