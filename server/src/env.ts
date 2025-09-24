import 'dotenv/config';

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 8787),
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  DATABASE_URL: required('DATABASE_URL'),
  LUCIA_SESSION_SECRET: required('LUCIA_SESSION_SECRET'),
  STRIPE_SECRET_KEY: required('STRIPE_SECRET_KEY'),
  STRIPE_WEBHOOK_SECRET: required('STRIPE_WEBHOOK_SECRET'),
  APP_URL: required('APP_URL'),
  PRICE_HOMEOWNER: required('STRIPE_PRICE_HOMEOWNER'),
  PRICE_FAMILY: required('STRIPE_PRICE_FAMILY'),
  PRICE_PRO: required('STRIPE_PRICE_PRO'),
};

