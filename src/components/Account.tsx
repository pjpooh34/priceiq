import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../auth/AuthProvider';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { User, CreditCard, LogOut } from 'lucide-react';

export function Account({ onBack }: { onBack?: () => void }) {
  const { user, plan, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const manageBilling = async () => {
    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE_URL || '';
      const res = await fetch(`${base}/api/stripe/create-portal-session`, { method: 'POST', credentials: 'include' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Portal error');
      window.location.href = data.url as string;
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium">{user?.email}</div>
              <div className="text-sm text-muted-foreground">Signed in</div>
            </div>
            <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 capitalize">{plan}</Badge>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={manageBilling} disabled={loading}>
              <CreditCard className="h-4 w-4 mr-2" />
              {loading ? 'Opening…' : 'Manage Billing'}
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            {onBack && (
              <Button variant="ghost" onClick={onBack}>Back</Button>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            Changes to your subscription reflect here automatically after Stripe updates.
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

