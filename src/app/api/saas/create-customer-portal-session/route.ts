import { authOptions } from "@/lib/auth";
import { createCustomPortalSession } from "@/lib/subscription";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ error: "Not a SaaS version" }, { status: 400 });
  }

  const url = await createCustomPortalSession(session.user.id);

  return NextResponse.json({ url });
}
