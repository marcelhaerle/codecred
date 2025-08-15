import { withAuth } from "@/lib/api/with-auth";
import { subscriptionService } from "@/lib/services/subscriptionService";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  const status = await subscriptionService.getStatus(session.user.id);

  return NextResponse.json(status);
}

export const GET = withAuth(getHandler);
