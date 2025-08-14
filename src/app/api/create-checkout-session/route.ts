import { withAuth } from "@/lib/api/with-auth";
import { createCheckoutSession } from "@/lib/subscription";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (request: NextRequest, { session }: { session: Session }) => {
  const plan = request.nextUrl.searchParams.get("plan");

  if (!plan || (plan !== "STARTER" && plan !== "PRO")) {
    return NextResponse.json({ error: "Invalid plan specified" }, { status: 400 });
  }

  const url = await createCheckoutSession(session.user.id, plan, session.user.email);

  return NextResponse.json({ url });
}

export const GET = withAuth(getHandler);
