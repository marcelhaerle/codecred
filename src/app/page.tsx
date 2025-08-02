import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginPrompt from "@/components/LoginPrompt";
import MarketingSections from "@/components/saas/MarketingSections";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === 'true';

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
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
