import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession, SavedAddress } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  session: UserSession | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  logout: () => void;
  setVerifiedSession: (session: UserSession) => void;
  savedAddresses: SavedAddress[];
  addSavedAddress: (address: Omit<SavedAddress, 'id'>) => void;
  authStatus: {
    status?: string;
    hasCustomApiKey?: boolean;
    sandboxMode?: boolean;
    docsUrl?: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_SESSION_KEY = 'kora_threads_minimoth_session';
const LOCAL_STORAGE_ADDRESSES_KEY = 'kora_threads_saved_addresses';

const INITIAL_DEFAULT_ADDRESS: SavedAddress = {
  id: 'addr-default-1',
  fullName: 'Pooja Deshmukh',
  phone: '+91 98230 45678',
  addressLine: 'Flat 402, Rohan Viti, Law College Road, Erandwane',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411004',
  isDefault: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADDRESSES_KEY);
      return saved ? JSON.parse(saved) : [INITIAL_DEFAULT_ADDRESS];
    } catch {
      return [INITIAL_DEFAULT_ADDRESS];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<any>({ sandboxMode: true });

  useEffect(() => {
    api.getAuthStatus().then(status => {
      setAuthStatus(status);
    }).catch(() => {});
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const setVerifiedSession = (newSession: UserSession) => {
    setSession(newSession);
    try {
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newSession));
    } catch {}
  };

  const logout = () => {
    setSession(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
    } catch {}
  };

  const addSavedAddress = (newAddr: Omit<SavedAddress, 'id'>) => {
    const created: SavedAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`
    };
    const updated = [created, ...savedAddresses];
    setSavedAddresses(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_ADDRESSES_KEY, JSON.stringify(updated));
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        logout,
        setVerifiedSession,
        savedAddresses,
        addSavedAddress,
        authStatus
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
