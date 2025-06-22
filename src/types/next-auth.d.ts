/* eslint-disable ts/consistent-type-definitions */

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      role: string;
    };
  }

  interface User extends DefaultUser {
    role: string;
  }
}
