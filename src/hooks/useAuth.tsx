import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  type: 'customer' | 'supplier';
};

type AuthContextData = {
  user: User | null;
  loginAsCustomer: (name?: string) => void;
  loginAsSupplier: (name?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function loginAsCustomer(name = 'Cliente Teste') {
    setUser({ id: 'c1', name, type: 'customer' });
  }

  function loginAsSupplier(name = 'Fornecedor Teste') {
    setUser({ id: 's1', name, type: 'supplier' });
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginAsCustomer, loginAsSupplier, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export type { User };
