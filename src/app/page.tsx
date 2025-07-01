import { Header } from "@/components/page/header";

export default async function Home() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center-safe pt-1">
      <Header />
    </div>
  );
}
