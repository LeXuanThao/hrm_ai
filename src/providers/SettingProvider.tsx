import { createContext, useContext, useState, ReactNode } from 'react';

interface SettingContextType {
  settings: Record<string, any>;
  updateSetting: (key: string, value: any) => void;
  registerSetting: (key: string, defaultValue: any) => void;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

interface SettingProviderProps {
  children: ReactNode;
  defaultSettings?: Record<string, any>;
}

export const SettingProvider = ({ children, defaultSettings = {} }: SettingProviderProps) => {
  const [settings, setSettings] = useState<Record<string, any>>(defaultSettings);

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const registerSetting = (key: string, defaultValue: any) => {
    setSettings((prev) => {
      if (prev[key] === undefined) {
        return { ...prev, [key]: defaultValue };
      }
      return prev;
    });
  };

  return (
    <SettingContext.Provider value={{ settings, updateSetting, registerSetting }}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = (): SettingContextType => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error('useSetting must be used within a SettingProvider');
  }
  return context;
};
