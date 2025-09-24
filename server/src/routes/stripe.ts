import { Router } from 'express';
import Stripe from 'stripe';
import { ENV } from '../env';
import { prisma } from '../prisma';
import { lucia } from '../auth';

const router = Router();
const stripe = new Stripe(ENV.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });

router.post('/create-checkout-session', async (req, res) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  const { user } = sessionId ? await lucia.validateSession(sessionId) : { user: null };

  const { plan } = (req.body as any) ?? {};
  if (!plan || !['homeowner', 'family', 'pro'].includes(plan)) return res.status(400).json({ error: 'Invalid plan' });

  const priceId = plan === 'homeowner' ? ENV.PRICE_HOMEOWNER : plan === 'family' ? ENV.PRICE_FAMILY : ENV.PRICE_PRO;
  const email = user?.email;

  // Ensure or create Stripe customer
  let customerId = null as string | null;
  if (email) {
    const dbUser = await prisma.user.findUnique({ where: { email } });
    if (dbUser?.stripeCustomerId) {
      customerId = dbUser.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
      await prisma.user.update({ where: { email }, data: { stripeCustomerId: customerId } });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId || undefined,
    customer_email: customerId ? undefined : email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${ENV.APP_URL}/?checkout=success`,
    cancel_url: `${ENV.APP_URL}/?checkout=cancelled`,
    metadata: { plan },
  });
  return res.json({ id: session.id });
});

router.post('/create-portal-session', async (req, res) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  const { user } = sessionId ? await lucia.validateSession(sessionId) : { user: null };
  if (!user?.email) return res.status(401).json({ error: 'Unauthorized' });

  let dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!dbUser) return res.status(404).json({ error: 'User not found' });

  // Ensure Stripe customer exists
  if (!dbUser.stripeCustomerId) {
    const customer = await stripe.customers.create({ email: user.email });
    dbUser = await prisma.user.update({ where: { email: user.email }, data: { stripeCustomerId: customer.id } });
  }

  const portal = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeCustomerId as string,
    return_url: `${ENV.APP_URL}/?portal=done`,
  });
  return res.json({ url: portal.url });
});

// Stripe expects raw body for signature verification; this should be mounted with raw body parser
export const webhookHandler = async (req: any, res: any) => {
  const sig = req.headers['stripe-signature'];
  if (!sig) return res.status(400).send('Missing signature');
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig as string, ENV.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object as Stripe.Checkout.Session;
        const email = s.customer_details?.email || (s.customer_email as string | undefined);
        const plan = (s.metadata?.plan as string) || 'homeowner';
        if (email) await prisma.user.update({ where: { email }, data: { plan } }).catch(() => {});
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
        if (customerId) {
          const customer = await stripe.customers.retrieve(customerId);
          const email = (customer as any).email as string | undefined;
          const plan = (sub.metadata?.plan as string) || 'homeowner';
          if (email) await prisma.user.update({ where: { email }, data: { plan } }).catch(() => {});
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
        if (customerId) {
          const customer = await stripe.customers.retrieve(customerId);
          const email = (customer as any).email as string | undefined;
          if (email) await prisma.user.update({ where: { email }, data: { plan: 'free' } }).catch(() => {});
        }
        break;
      }
    }
    return res.json({ received: true });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
};

export default router;
