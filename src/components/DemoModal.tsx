import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { mockAnalyzeQuote } from './mockAiService';
import { CheckCircle2, Loader2, Upload } from 'lucide-react';

type Step = 'idle' | 'uploading' | 'analyzing' | 'result';

export function DemoModal({ open, onClose, onComplete }: { open: boolean; onClose: () => void; onComplete?: (result: any) => void }) {
  const [step, setStep] = useState<Step>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setStep('idle');
      setProgress(0);
      setResult(null);
    }
  }, [open]);

  const startFlow = async (file: File) => {
    setStep('uploading');
    setProgress(0);
    // Fake upload progress
    await new Promise<void>((resolve) => {
      const start = Date.now();
      const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        const pct = Math.min(100, Math.round((elapsed / 800) * 100));
        setProgress(pct);
        if (pct >= 100) {
          clearInterval(timer);
          resolve();
        }
      }, 60);
    });

    setStep('analyzing');
    // Simulate AI analysis with existing mock
    const data = await mockAnalyzeQuote({ quotePhoto: file, zipCode: '28202', contractorName: 'Sample Contractor' });
    setResult(data);
    setStep('result');
  };

  const handleSample = () => {
    // Create a fake File for the demo
    const blob = new Blob([new Uint8Array([1,2,3])], { type: 'application/octet-stream' });
    const file = new File([blob], 'sample-quote.jpg', { type: 'image/jpeg' });
    startFlow(file);
  };

  const handlePickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) startFlow(f);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl">
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Live Demo</h3>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
          </div>

          {step === 'idle' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-6 rounded-lg border border-dashed bg-muted/30 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <p className="mb-4">Drag & drop a quote photo or use our sample</p>
                  <div className="flex gap-3 justify-center">
                    <Button onClick={() => inputRef.current?.click()} variant="outline">Upload your quote</Button>
                    <Button onClick={handleSample}>Use sample</Button>
                  </div>
                  <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={handlePickFile} />
                </div>
                <ul className="text-sm text-muted-foreground list-disc list-inside">
                  <li>No data leaves your browser in this demo</li>
                  <li>We’ll simulate OCR and market comparison</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">What you’ll see</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <div>• Upload and processing progress</div>
                  <div>• Fair price range vs. your quote</div>
                  <div>• Overpriced line items and red flags</div>
                  <div>• Negotiation scripts you can use</div>
                </div>
              </div>
            </div>
          )}

          {step !== 'idle' && step !== 'result' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                {step === 'uploading' ? <Upload className="h-4 w-4 text-primary" /> : <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                <div className="font-medium">{step === 'uploading' ? 'Uploading quote…' : 'Analyzing quote…'}</div>
              </div>
              <Progress value={progress} />
              <div className="text-sm text-muted-foreground">Steps: OCR → Market comparison → Scripts</div>
            </div>
          )}

          {step === 'result' && result && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div className="font-medium">Analysis complete</div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Fair price range</div>
                  <div className="text-2xl font-bold">${result.priceRange.low} – ${result.priceRange.high}</div>
                  <div className="text-xs text-muted-foreground mt-1">Service: {result.service}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Quoted</div>
                  <div className="text-2xl font-bold">${result.quoteAnalysis.totalAmount}</div>
                  <div className="text-xs text-muted-foreground mt-1">Assessment: {result.quoteAnalysis.overallAssessment}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Potential savings</div>
                  <div className="text-2xl font-bold">${result.quoteAnalysis.potentialSavings ?? 0}</div>
                  <div className="text-xs text-muted-foreground mt-1">Confidence: {result.confidence}</div>
                </Card>
              </div>

              <Card className="p-4">
                <div className="font-medium mb-2">Line items</div>
                <div className="space-y-2 text-sm">
                  {result.quoteAnalysis.lineItems.slice(0,4).map((li: any, idx: number) => (
                    <div key={idx} className="flex justify-between">
                      <span>{li.description}</span>
                      <span className={li.isOverpriced ? 'text-red-500' : ''}>${li.amount}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={onClose}>Close</Button>
                <Button onClick={() => { setStep('idle'); setResult(null); }}>Run again</Button>
                {onComplete && (
                  <Button onClick={() => { onComplete(result); onClose(); }}>See Full Results</Button>
                )}
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
