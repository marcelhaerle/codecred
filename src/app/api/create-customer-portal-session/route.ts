import { withAuth } from "@/lib/api/with-auth";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  const url = await subscriptionService.createCustomerPortalSession(session.user.id);

  return NextResponse.json({ url });
}

export const GET = withAuth(getHandler);
