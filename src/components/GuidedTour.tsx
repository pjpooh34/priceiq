import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function GuidedTour({ open, onClose }: { open: boolean; onClose: () => void }) {
  const steps = [
    { title: 'Fair Price Range', text: 'This shows the typical low-to-high price for similar work in your area.' },
    { title: 'Quoted vs. Typical', text: 'We compare your total quoted price against market to flag over/under priced quotes.' },
    { title: 'Line Items & Red Flags', text: 'Spot overpriced items and common issues like big emergency fees.' },
    { title: 'Negotiation Scripts', text: 'Copy a friendly, professional, or firm script to negotiate with the contractor.' }
  ];
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!open) setI(0);
  }, [open]);

  if (!open) return null;

  const step = steps[i];
  const isLast = i === steps.length - 1;

  return (
    <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl bg-background/95 border rounded-xl p-5 shadow-xl">
        <div className="text-sm text-muted-foreground mb-1">Step {i + 1} of {steps.length}</div>
        <div className="text-lg font-semibold mb-2">{step.title}</div>
        <div className="text-sm text-muted-foreground mb-4">{step.text}</div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onClose}>Skip</Button>
          <div className="flex gap-2">
            {i > 0 && <Button variant="outline" onClick={() => setI(i - 1)}>Back</Button>}
            <Button onClick={() => isLast ? onClose() : setI(i + 1)}>{isLast ? 'Done' : 'Next'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

