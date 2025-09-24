
  # AI Service Cost Estimator

  This is a code bundle for AI Service Cost Estimator. The original project is available at https://www.figma.com/design/J5d3fl7VcEuHSKguyEdndk/AI-Service-Cost-Estimator.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Railway Backend + Payments

This project now uses an Express API with Lucia + Prisma + Postgres on Railway and Stripe Checkout for payments.

Backend (server/)
- Routes: `POST /api/auth/signup|login|logout`, `GET /api/auth/me`, `POST /api/stripe/create-checkout-session`, `POST /api/stripe/webhook`
- Env (see `server/.env.example`): `DATABASE_URL`, `LUCIA_SESSION_SECRET`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*`, `APP_URL`, `CORS_ORIGIN`.

Frontend
- Env (see `.env.example`): `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_API_BASE_URL` (e.g., http://localhost:8787)

Local Dev
1) Backend: `cd server && npm i && npx prisma generate && npx prisma migrate dev --name init && npm run dev`
2) Frontend: `npm i && npm run dev` (http://localhost:5173)

Stripe Test
- Choose a paid plan → Checkout → success → header shows updated plan after webhook
