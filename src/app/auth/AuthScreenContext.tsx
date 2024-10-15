import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthScreenProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  role: string;
  setRole: (value: string) => void;
}

const AuthScreenContext = createContext<AuthScreenProps | undefined>(undefined);

export const AuthScreenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  return (
    <AuthScreenContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, role, setRole }}
    >
      {children}
    </AuthScreenContext.Provider>
  );
};

export const useAuthScreen = () => {
  const context = useContext(AuthScreenContext);
  if (!context) {
    throw new Error('useAuthScreen must be used within AuthScreenProvider');
  }
  return context;
};
