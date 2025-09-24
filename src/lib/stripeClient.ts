import { loadStripe } from '@stripe/stripe-js';

let stripePromise: ReturnType<typeof loadStripe>;
export function getStripe() {
  if (!stripePromise) {
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!pk) throw new Error('Missing VITE_STRIPE_PUBLISHABLE_KEY');
    stripePromise = loadStripe(pk);
  }
  return stripePromise;
}

export async function redirectToCheckout(sessionId: string) {
  const stripe = await getStripe();
  await stripe?.redirectToCheckout({ sessionId });
}

