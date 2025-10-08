import { nanoid } from 'nanoid';
import { playLogoffSound } from '@/lib/soundUtils';

const SESSION_KEY = 'xp-portfolio-session';

export interface AuthSession {
  sessionId: string;
  timestamp: number;
  isAuthenticated: boolean;
}

export const authService = {
  /**
   * Login - generates a session ID and stores it in localStorage
   */
  login: (): AuthSession => {
    const sessionId = nanoid();
    const session: AuthSession = {
      sessionId,
      timestamp: Date.now(),
      isAuthenticated: true,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Logout - plays logoff sound, clears session and redirects to login page
   */
  logout: (): void => {
    // Play Windows XP logoff sound
    playLogoffSound();

    // Clear session and redirect after a short delay to allow sound to play
    setTimeout(() => {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = '/login';
    }, 500);
  },

  /**
   * Restart - clears session and redirects to root (welcome page)
   */
  restart: (): void => {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = '/';
  },

  /**
   * Get current session from localStorage
   */
  getSession: (): AuthSession | null => {
    try {
      const sessionData = localStorage.getItem(SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData) as AuthSession;

      // Check if session is still valid (24 hours)
      const isExpired = Date.now() - session.timestamp > 24 * 60 * 60 * 1000;
      if (isExpired) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const session = authService.getSession();
    return session?.isAuthenticated === true;
  },

  /**
   * Update session timestamp
   */
  refreshSession: (): void => {
    const session = authService.getSession();
    if (session) {
      session.timestamp = Date.now();
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
  },
};
