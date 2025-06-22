"use server";

import { signIn } from "@/server/auth";

export async function GithubLogin() {
  await signIn("github", { callbackUrl: "/admin" });
}
