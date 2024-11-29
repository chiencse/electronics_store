'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  sessionToken: '',
  setSessionToken: (token: string) => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sessionToken, setSessionToken] = useState('');
  return (
    <AuthContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AuthContext.Provider>
  );
}
