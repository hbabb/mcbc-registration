"use server";

import { signIn } from "@/server/auth";

// export default async function resendLogin(formData: FormData) {
//     // console.log(formData)
//     await signIn('resend', formData)
// };

export async function ResendLogin(formData: FormData) {
  const email = formData.get("email");
  if (typeof email === "string") {
    await signIn("resend", {
      email,
      redirectTo: "/admin",
    });
  }
}
