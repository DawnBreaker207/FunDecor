import React from 'react';

export interface AuthType {
  _id?: string | undefined;
  username?: string;
  email: string | undefined;
  password: string | undefined;
  confirmPass?: string;
  role?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthType | null | undefined;
  Login: (user: AuthType) => Promise<void>;
  Register: (user: AuthType) => Promise<void>;
  Logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
