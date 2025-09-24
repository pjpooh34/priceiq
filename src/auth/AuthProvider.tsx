import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthStatus = 'loading' | 'anonymous' | 'authenticated';
type Plan = 'free' | 'homeowner' | 'family' | 'pro' | 'enterprise';
type ApiUser = { id: string; email: string; plan: Plan } | null;
type AuthContextType = {
  status: AuthStatus;
  user: ApiUser;
  plan: Plan;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');
  const plan: Plan = (user?.plan as Plan) || 'free';

  const base = import.meta.env.VITE_API_BASE_URL || '';

  async function refresh() {
    try {
      const res = await fetch(`${base}/api/auth/me`, { credentials: 'include' });
      const data = await res.json();
      setUser(data.user);
      setStatus(data.user ? 'authenticated' : 'anonymous');
    } catch {
      setUser(null);
      setStatus('anonymous');
    }
  }

  useEffect(() => { refresh(); }, []);

  const value = useMemo<AuthContextType>(() => ({
    status,
    user,
    plan,
    async login(email, password) {
      const res = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ email, password }) });
      if (!res.ok) throw new Error('Login failed');
      await refresh();
    },
    async signup(email, password) {
      const res = await fetch(`${base}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ email, password }) });
      if (!res.ok) throw new Error('Signup failed');
      await refresh();
    },
    async logout() {
      await fetch(`${base}/api/auth/logout`, { method: 'POST', credentials: 'include' });
      await refresh();
    },
  }), [status, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
