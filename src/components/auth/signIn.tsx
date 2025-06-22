import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GithubLogin } from "@/server/actions/githubLogin";
import { ResendLogin } from "@/server/actions/resendLogin";

export function SignIn() {
  return (
    <>
      {/* Github Login Button */}
      <form action={GithubLogin}>
        <Button type="submit" variant="default">
          Sing In with GitHub
        </Button>
      </form>

      {/* Resend Login form */}
      <form action={ResendLogin}>
        <Input type="email" name="email" placeholder="Email" />
        <Button type="submit" variant="destructive">
          Sign In with Resend
        </Button>
      </form>
    </>
  );
}
