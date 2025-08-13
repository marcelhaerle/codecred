import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarketingSections from "@/components/MarketingSections";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    return redirect("/auth/dashboard");
  }

  return (
    <>
      <Header />
      <MarketingSections />
      <Footer />
    </>
  );
}
