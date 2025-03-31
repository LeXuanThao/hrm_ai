import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <Logo />
      <Menu />
    </div>
  );
};

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src="/path/to/logo.png" alt="Logo" />
    </div>
  );
};

const Menu: React.FC = () => {
  return (
    <ul className="menu">
      <MenuItem label="Home" />
      <MenuItem label="About" />
      <MenuItem label="Contact" />
    </ul>
  );
};

const MenuItem: React.FC<{ label: string }> = ({ label }) => {
  return <li className="menu-item">{label}</li>;
};

export default Sidebar;
