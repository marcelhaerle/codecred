import { withAuth } from "@/lib/api/with-auth";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { SUBSCRIPTION_PLAN } from "@/lib/types";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (request: NextRequest, { session }: { session: Session }) => {
  const plan = request.nextUrl.searchParams.get("plan");

  if (!plan || (plan !== "STARTER" && plan !== "PRO")) {
    return NextResponse.json({ error: "Invalid plan specified" }, { status: 400 });
  }

  const url = await subscriptionService.createCheckoutSession(session.user.id, plan as SUBSCRIPTION_PLAN);

  return NextResponse.json({ url });
}

export const GET = withAuth(getHandler);
