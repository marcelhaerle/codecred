"use client";

import ProPlanSubscription from "./ProPlanSubscription";
import StarterPlanSubscription from "./StarterPlanSubscription";
import { useState } from "react";
import { signOut } from "next-auth/react";
import DeleteAccount from "../DeleteAccount";

export default function UpgradeManager() {
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    const response = await fetch("/api/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      signOut();
    } else {
      setError("Failed to delete account. Please try again later.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
          Choose a Subscription Plan.
        </h2>
        <p className="text-gray-400 mt-2">
          Please note: Paid subscriptions are currently only available to citizens of the
          European Union.
        </p>
      </div>

      {error && <div className="bg-red-800 text-white mt-8 mb-8 mx-auto w-full p-8 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StarterPlanSubscription />
        <ProPlanSubscription />
        <DeleteAccount onConfirm={handleDeleteAccount} />
      </div>
    </div >
  );
}
