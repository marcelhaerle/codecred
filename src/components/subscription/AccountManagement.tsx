"use client";

import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Subscription } from "@/lib/subscription";
import ManageSubscription from "./ManageSubscription";
import { User } from "@/lib/types";
import SaasDeleteAccount from "./DeleteAccount";

interface AccountManagementProps {
  user: User;
  subscription: Subscription;
}

export default function AccountManagement({ user: initialUser, subscription: initialSubscription }: AccountManagementProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [subscription, setSubscription] = useState<Subscription>(initialSubscription);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async (): Promise<Subscription | null> => {
    try {
      const response = await fetch("/api/subscription/status");

      if (!response.ok) {
        throw new Error("Failed to fetch subscription status");
      }

      const data = await response.json();
      setSubscription(data);

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return null;
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await fetch("/api/account");

      if (!response.ok) {
        setError("Failed to fetch account details");
        return;
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching account details");
      return null;
    }
  }

  const handleDeleteAccount = async () => {
    if (!subscription?.currentPeriodEnd) {
      setError("No valid subscription found for account deletion.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 1. Cancel subscription
      const cancelSubscriptionResponse = await fetch("/api/subscription/cancel");

      if (!cancelSubscriptionResponse.ok) {
        setError("Failed to cancel subscription");
        return;
      }

      // 2. Refresh subscription status
      const canceledSubscription = await fetchSubscription();

      if (!canceledSubscription || canceledSubscription.expiresAt === null) {
        setError("Subscription does not have an expiration date.");
        return;
      }

      // 3. Schedule account deletion
      const deleteResponse = await fetch("/api/account/schedule-for-deletion", {
        method: "DELETE",
        body: JSON.stringify({ expiresAt: canceledSubscription.expiresAt }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!deleteResponse.ok) {
        setError("Failed to schedule account deletion");
        return;
      }

      // 4. Refresh account details
      await fetchAccount();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while deleting the account");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <RefreshCcw className="mx-auto mt-24 animate-spin" size={60} />;
  }

  return (
    <div>
      {error && <div className="bg-red-800 text-white mt-8 mx-auto w-full p-8 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <ManageSubscription
          subscription={subscription}
          isScheduledForDeletion={user.scheduledForDeletion !== null}
          onError={setError}
        />

        <SaasDeleteAccount
          subscription={subscription}
          user={user}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  );
}
