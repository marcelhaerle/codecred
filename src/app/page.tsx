"use client";

import LoginPrompt from "@/components/LoginPrompt";
import MarketingSections from "@/components/MarketingSections";

export default function Home() {
  const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === 'true';

  return isSaas ? <MarketingSections /> : <LoginPrompt />;
}
