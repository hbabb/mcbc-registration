import { AiOutlineMail } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GithubLogin } from "@/server/actions/githubLogin";
import { ResendLogin } from "@/server/actions/resendLogin";

export default function SignIn() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <Card className="flex max-w-5xl flex-col gap-8 md:min-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to get a Magic Link, or use the Social Media
            Login of your preference.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-6">
          {/* Github Login Button */}
          <div className="border-b-2 border-gray-400 pb-4">
            <form action={GithubLogin} className="flex flex-col">
              <Button
                type="submit"
                variant="default"
                className="bg-gray-800 hover:bg-gray-500"
              >
                Sing In with <FaGithub className="m-2 size-6" />{" "}
                <span className="font-monaSans text-xl font-bold">GitHub</span>
              </Button>
            </form>
          </div>

          {/* Resend Login form */}
          <div>
            <form action={ResendLogin} className="flex flex-col gap-4">
              <Input type="email" name="email" placeholder="Email" />
              <Button
                type="submit"
                variant="default"
                className="bg-blue-800 hover:bg-blue-500"
              >
                Sign In with <AiOutlineMail /> Email
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
