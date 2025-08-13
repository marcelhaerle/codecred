import { authOptions } from "@/lib/auth";
import { getSubscriptionStatus } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = await getSubscriptionStatus(session.user.id);

  return NextResponse.json(status);
}
