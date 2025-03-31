import React from 'react';
import MenuItem from './MenuItem';

const Menu: React.FC = () => {
  return (
    <ul className="menu">
      <MenuItem label="Home" />
      <MenuItem label="Employees" />
      <MenuItem label="Departments" />
      <MenuItem label="Positions" />
    </ul>
  );
};

export default Menu;
