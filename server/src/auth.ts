import { Lucia, TimeSpan } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { prisma } from './prisma';
import type { User } from '@prisma/client';
import { ENV } from './env';

const adapter = new PrismaAdapter(prisma.session, prisma.user, prisma.key);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'session',
    secrets: [ENV.LUCIA_SESSION_SECRET],
    attributes: {
      secure: ENV.NODE_ENV === 'production',
      sameSite: (ENV.NODE_ENV === 'production' ? 'none' : 'lax') as any,
      path: '/',
    },
  },
  sessionExpiresIn: new TimeSpan(30, 'd'),
  getUserAttributes: (user: User) => ({
    id: user.id,
    email: user.email,
    plan: user.plan,
  }),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: { id: string; email: string; plan: string };
  }
}
