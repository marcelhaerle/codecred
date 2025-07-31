import { authOptions } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ error: "Not a SaaS version" }, { status: 400 });
  }

  const plan = request.nextUrl.searchParams.get("plan");

  if (!plan || (plan !== "STARTER" && plan !== "PRO")) {
    return NextResponse.json({ error: "Invalid plan specified" }, { status: 400 });
  }

  const url = await createCheckoutSession(session.user.id, plan, session.user.email);

  return NextResponse.json({ url });
}
