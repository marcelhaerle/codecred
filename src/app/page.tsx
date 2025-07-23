"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginPrompt from "@/components/LoginPrompt";
import MarketingSections from "@/components/MarketingSections";

export default function Home() {
  const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === 'true';

  return (
    <>
      <Header />
      {isSaas ? <MarketingSections /> : <LoginPrompt />}
      <Footer />
    </>
  );
}
