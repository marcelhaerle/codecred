import { withAuth } from "@/lib/api/with-auth";
import { cancelSubscription } from "@/lib/subscription";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  try {
    const expirationDate = await cancelSubscription(session.user.id);

    return NextResponse.json({ status: "CANCELLED", expirationDate });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
