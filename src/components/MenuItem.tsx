import React from 'react';

interface MenuItemProps {
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ label }) => {
  return <li className="menu-item">{label}</li>;
};

export default MenuItem;
