import React from 'react';

export interface AuthType {
  username?: string;
  email: string | undefined;
  password: string | undefined;
  role?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthType | null;
  login: (user: AuthType) => Promise<void>;
  register: (user: AuthType) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
