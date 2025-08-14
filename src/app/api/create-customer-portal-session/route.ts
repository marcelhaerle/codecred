import { withAuth } from "@/lib/api/with-auth";
import { createCustomPortalSession } from "@/lib/subscription";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  const url = await createCustomPortalSession(session.user.id);

  return NextResponse.json({ url });
}

export const GET = withAuth(getHandler);
