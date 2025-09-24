import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../prisma';
import { lucia } from '../auth';
import bcrypt from 'bcryptjs';

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

router.post('/signup', async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const user = await prisma.user.create({ data: { email: email.toLowerCase() } });
  const keyId = `email:${email.toLowerCase()}`;
  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.key.create({ data: { id: keyId, userId: user.id, hashedPassword } });
  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);
  res.setHeader('Set-Cookie', cookie.serialize());
  return res.status(201).json({ user: { id: user.id, email: user.email, plan: user.plan } });
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  const { email, password } = parsed.data;
  const keyId = `email:${email.toLowerCase()}`;
  const key = await prisma.key.findUnique({ where: { id: keyId }, include: { user: true } });
  if (!key?.hashedPassword) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, key.hashedPassword);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const session = await lucia.createSession(key.userId, {});
  const cookie = lucia.createSessionCookie(session.id);
  res.setHeader('Set-Cookie', cookie.serialize());
  return res.json({ user: { id: key.user.id, email: key.user.email, plan: key.user.plan } });
});

router.post('/logout', async (req, res) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  if (sessionId) await lucia.invalidateSession(sessionId);
  const cookie = lucia.createBlankSessionCookie();
  res.setHeader('Set-Cookie', cookie.serialize());
  return res.json({ ok: true });
});

router.get('/me', async (req, res) => {
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? '');
  if (!sessionId) return res.status(200).json({ user: null });
  const { user, session } = await lucia.validateSession(sessionId);
  if (!session) {
    const blank = lucia.createBlankSessionCookie();
    res.setHeader('Set-Cookie', blank.serialize());
    return res.json({ user: null });
  }
  return res.json({ user });
});

export default router;

