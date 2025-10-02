import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Profile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, country: string, phone: string, role: 'freelancer' | 'client') => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedProfile = localStorage.getItem('profile');

    if (storedUser && storedProfile) {
      setUser(JSON.parse(storedUser));
      setProfile(JSON.parse(storedProfile));
    }

    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const mockUser: User = {
      id: '1',
      email,
      role: 'freelancer'
    };

    const mockProfile: Profile = {
      id: '1',
      role: 'freelancer',
      firstName: 'John',
      lastName: 'Doe',
      email,
      country: 'USA',
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('profile', JSON.stringify(mockProfile));

    setUser(mockUser);
    setProfile(mockProfile);
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    country: string,
    phone: string,
    role: 'freelancer' | 'client'
  ) => {
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      role
    };

    const mockProfile: Profile = {
      id: mockUser.id,
      role,
      firstName,
      lastName,
      email,
      phone,
      country,
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('profile', JSON.stringify(mockProfile));

    setUser(mockUser);
    setProfile(mockProfile);
  };

  const signOut = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profile) return;

    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('profile', JSON.stringify(updatedProfile));
    setProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
