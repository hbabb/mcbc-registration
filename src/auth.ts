import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';

import { db } from '@/db/index';
import { accounts, sessions, users, verificationTokens } from '@/db/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [],
});
