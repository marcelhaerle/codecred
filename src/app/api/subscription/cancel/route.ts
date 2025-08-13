import { authOptions } from "@/lib/auth";
import { cancelSubscription } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const expirationDate = await cancelSubscription(session.user.id);

    return NextResponse.json({ status: "CANCELLED", expirationDate });
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
  }
}
