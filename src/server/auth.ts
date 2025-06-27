import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";

import { db } from "@/db/index";
import { accounts, sessions, users, verificationTokens } from "@/db/schema";

expand(config({ path: ".env.local" }));

console.log("AUTH_RESEND_KEY: ", process.env.AUTH_RESEND_KEY);

export const NextAuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  secret: process.env.AUTH_SECRET,
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: "no-reply@motlowcreekministries.com",
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(NextAuthConfig);
