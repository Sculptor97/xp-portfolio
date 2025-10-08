import { useState, useEffect } from 'react';
import { authService, type AuthSession } from '@/services/authService';

export const useAuth = () => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentSession = authService.getSession();
    setSession(currentSession);
    setIsLoading(false);
  }, []);

  const login = () => {
    const newSession = authService.login();
    setSession(newSession);
    return newSession;
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  const restart = () => {
    authService.restart();
    setSession(null);
  };

  const refreshSession = () => {
    authService.refreshSession();
    const currentSession = authService.getSession();
    setSession(currentSession);
  };

  return {
    session,
    isAuthenticated: !!session?.isAuthenticated,
    isLoading,
    login,
    logout,
    restart,
    refreshSession,
  };
};
