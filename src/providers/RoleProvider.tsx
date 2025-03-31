import React, { createContext, useState, useContext, ReactNode } from 'react';

interface RoleContextProps {
  role: string;
  switchRole: (role: string) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState('User');

  const switchRole = (newRole: string) => {
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, switchRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = (): RoleContextProps => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
