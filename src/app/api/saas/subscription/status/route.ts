import { authOptions } from "@/lib/auth";
import { getSubscriptionStatus } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ status: "NONE" });
  }

  const status = await getSubscriptionStatus(session.user.id);

  return NextResponse.json(status);
}
