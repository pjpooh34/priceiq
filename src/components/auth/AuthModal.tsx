import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../auth/AuthProvider';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

type Mode = 'signin' | 'signup' | 'reset';

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      if (mode === 'signin') await login(email, password);
      if (mode === 'signup') await signup(email, password);
      if (mode !== 'reset') onClose();
    } catch (e: any) {
      setError(e.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="w-[420px] p-6 glass-card">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Reset Password'}</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm">Name</label>
                <input className="w-full rounded-md border bg-background p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm">Email</label>
              <input className="w-full rounded-md border bg-background p-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            {mode !== 'reset' && (
              <div className="space-y-2">
                <label className="text-sm">Password</label>
                <input className="w-full rounded-md border bg-background p-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
            )}

            {error && <div className="text-sm text-red-500">{error}</div>}

            <Button className="w-full" onClick={submit} disabled={loading}>
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              {mode === 'signin' && (
                <>
                  <div className="mt-2">
                    New here?{' '}
                    <button className="hover:text-primary" onClick={() => setMode('signup')}>Create an account</button>
                  </div>
                </>
              )}
              {mode === 'signup' && (
                <>
                  Already have an account?{' '}
                  <button className="hover:text-primary" onClick={() => setMode('signin')}>Sign in</button>
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
