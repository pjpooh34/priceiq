import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './env';
import authRoutes from './routes/auth';
import stripeRoutes, { webhookHandler } from './routes/stripe';

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN === '*' ? true : ENV.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

// Stripe webhook must come before json parser to preserve raw body
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), (req: any, res) => {
  (req as any).rawBody = req.body; // Buffer
  return webhookHandler(req, res);
});

app.use(express.json());

// Auth and API routes
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripeRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(ENV.PORT, () => {
  console.log(`Server listening on :${ENV.PORT}`);
});
