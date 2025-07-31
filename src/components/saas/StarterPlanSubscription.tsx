"use client";

import { Boxes, EyeOff, Zap } from "lucide-react";

export default function StarterPlanSubscription() {
  const startCheckout = async () => {
    const response = await fetch(`/api/saas/create-checkout-session?plan=STARTER`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating checkout session:", errorData.error);
      return;
    }

    const { url } = await response.json();

    window.location.href = url;
  }

  return (
    <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div className="bg-blue-800 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
      </div>
      <h3 className="text-2xl font-bold text-white">Starter</h3>
      <p className="text-gray-400 mt-2 mb-6">Students, hobbyists, or developers who want a live profile without the hassle of self-hosting.</p>
      <div className="text-4xl font-extrabold text-white mb-6">~&euro;3 <span className="text-xl font-medium text-gray-400">/ month</span></div>
      <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
        <li className="flex items-center gap-3">
          <Boxes className="w-5 h-5 text-blue-400" />
          All dynamic blocks
        </li>
        <li className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-400" />
          Managed Hosting (No setup)
        </li>
        <li className="flex items-center gap-3">
          <EyeOff className="w-5 h-5 text-blue-400" />
          Remove &quot;Powered by&quot; branding
        </li>
      </ul>
      <button
        onClick={startCheckout}
        className="w-full text-center bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
        Subscribe
      </button>
    </div>
  );
}
