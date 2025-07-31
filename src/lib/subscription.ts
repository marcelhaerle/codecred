export interface Subscription {
  plan: "NONE" | "STARTER" | "PRO";
  currentPeriodEnd: string; // ISO date string
  pendingCancellation: boolean;
  expiresAt: string | null;
}

export async function getSubscriptionStatus(userId: string | null): Promise<Subscription> {
  const response = await fetch(`${process.env.SUBCRIPTION_SERVICE_URL}/api/status?userId=${userId}`, {
    headers: {
      "Authorization": `Bearer ${process.env.SUBSCRIPTION_SERVICE_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching subscription: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    plan: data.plan,
    currentPeriodEnd: data.currentPeriodEnd,
    pendingCancellation: data.pendingCancellation,
    expiresAt: data.expiresAt,
  };
}

export async function createCheckoutSession(userId: string, plan: "STARTER" | "PRO", userEmail: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.SUBCRIPTION_SERVICE_URL}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUBSCRIPTION_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({ userId, plan, userEmail }),
    });

    if (!response.ok) {
      throw new Error(`Error creating checkout session: ${response.statusText}`);
    }

    const data = await response.json();

    return data.url;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
}

export async function createCustomPortalSession(userId: string): Promise<string> {
  try {
    const response = await fetch(`${process.env.SUBCRIPTION_SERVICE_URL}/api/create-customer-portal-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUBSCRIPTION_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Error creating checkout session: ${response.statusText}`);
    }

    const data = await response.json();

    return data.url;
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
}

export async function cancelSubscription(userId: string): Promise<Date> {
  try {
    const response = await fetch(`${process.env.SUBCRIPTION_SERVICE_URL}/api/cancel-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUBSCRIPTION_SERVICE_API_KEY}`,
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Error cancelling subscription: ${response.statusText}`);
    }

    const { expirationDate } = await response.json();

    return new Date(expirationDate);
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    throw error;
  }
}
