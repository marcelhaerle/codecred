"use client";

import { Subscription } from "@/lib/subscription";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";

interface ManageSubscriptionProps {
  subscription: Subscription;
  isScheduledForDeletion: boolean;
  onError: (error: string) => void;
}


export default function ManageSubscription({ subscription, isScheduledForDeletion, onError }: ManageSubscriptionProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubscriptionUpdate = async () => {
    setIsUpdating(true);

    const response = await fetch("/api/saas/create-customer-portal-session");

    if (!response.ok) {
      setIsUpdating(false);
      onError("Failed to create customer portal session. Please try again later.");
      return;
    }

    // Redirect to the customer portal
    const { url } = await response.json();
    window.location.href = url;
  };

  return (
    <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
      <h3 className="flex justify-between items-center text-2xl font-bold text-white">
        Your Subscription Details
        {subscription.pendingCancellation && (
          <span className="text-red-600 font-semibold bg-red-500/10 px-3 py-1 rounded-full text-sm">CANCELLED</span>
        )}
      </h3>

      <div className="mt-6 flex-grow space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-400">Current Plan</p>
          <p className="text-white font-semibold bg-blue-500/10 px-3 py-1 rounded-full text-sm">{subscription.plan}</p>
        </div>
        {subscription.pendingCancellation && subscription.expiresAt ? (
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Expires on</p>
            <p className="text-white font-semibold">{new Date(subscription.expiresAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p className="text-gray-400">Renews on</p>
            <p className="text-white font-semibold">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      {!isScheduledForDeletion && <button
        className={`mt-8 w-full text-center bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleSubscriptionUpdate}
        disabled={isUpdating}
      >
        {isUpdating && <RefreshCcw className="inline mr-2 animate-spin" size={20} />}
        {isUpdating ? "You will be redirected shortly..." : "Manage Subscription"}
      </button>}

    </div >
  );
}
