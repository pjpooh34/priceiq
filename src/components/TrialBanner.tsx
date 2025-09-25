import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Lock, Sparkles } from 'lucide-react';

export function TrialBanner({ creditsLeft, onSignup }: { creditsLeft: number; onSignup: () => void }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between p-4 rounded-xl border bg-amber-50/60 border-amber-200">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-amber-600" />
          <div>
            <div className="font-medium">Trial result</div>
            <div className="text-sm text-muted-foreground">Sign up to unlock full breakdown, all scripts, save history, and exports.</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-amber-600 text-white">{creditsLeft} free left</Badge>
          <Button onClick={onSignup}>
            <Sparkles className="h-4 w-4 mr-2" />
            Continue Free
          </Button>
        </div>
      </div>
    </div>
  );
}

