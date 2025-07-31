import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginPrompt from "@/components/LoginPrompt";
import MarketingSections from "@/components/saas/MarketingSections";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === 'true';

  const session = await getServerSession();

  if (session?.user) {
    return redirect("/auth/dashboard");
  }

  return (
    <>
      <Header />
      {isSaas ? <MarketingSections /> : <LoginPrompt />}
      <Footer />
    </>
  );
}
