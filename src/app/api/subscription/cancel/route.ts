import { withAuth } from "@/lib/api/with-auth";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { userService } from "@/lib/services/userService";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  try {
    await subscriptionService.cancelSubscription(session.user.id);
    const user = await userService.getCurrentUser();

    return NextResponse.json({ status: "CANCELLED", expirationDate: user?.stripeExpiresAt?.toISOString() });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
