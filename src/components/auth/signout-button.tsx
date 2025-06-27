import { Button } from "@/components/ui/button";
import { signOut } from "@/server/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <Button type="submit" variant="outline">
        Sign Out
      </Button>
    </form>
  );
}
