import { motion } from 'motion/react';

type Box = { x: number; y: number; w: number; h: number; label: string };

const SAMPLE_BOXES: Box[] = [
  { x: 6, y: 18, w: 44, h: 10, label: 'Contractor • Quote #1024' },
  { x: 8, y: 36, w: 70, h: 12, label: 'Line Items' },
  { x: 10, y: 51, w: 60, h: 8, label: 'Labor (4 hours) - $400' },
  { x: 10, y: 61, w: 60, h: 8, label: 'Materials - $120' },
  { x: 10, y: 71, w: 60, h: 8, label: 'Emergency fee - $150' },
  { x: 62, y: 84, w: 28, h: 10, label: 'Total: $850' },
];

export function OcrScan({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border">
      <div className="aspect-[4/3] w-full bg-muted/20">
        <img src={imageUrl} alt="quote" className="w-full h-full object-cover" />
      </div>
      {/* Scanning bar */}
      <motion.div
        className="absolute left-0 right-0 h-24 pointer-events-none"
        initial={{ y: '-20%' }}
        animate={{ y: ['-20%', '90%', '-20%'] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(180deg, rgba(59,130,246,0.00) 0%, rgba(59,130,246,0.18) 45%, rgba(59,130,246,0.00) 100%)',
        }}
      />

      {/* OCR boxes */}
      {SAMPLE_BOXES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-md border border-blue-500/70 bg-blue-500/10 text-[11px] leading-tight"
          style={{ left: `${b.x}%`, top: `${b.y}%`, width: `${b.w}%`, height: `${b.h}%` }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.98, 1.0, 0.98] }}
          transition={{ duration: 2.0, repeat: Infinity, delay: i * 0.1 }}
        >
          <div className="absolute -top-5 left-0 px-1.5 py-0.5 rounded bg-blue-600 text-white shadow">
            {b.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

