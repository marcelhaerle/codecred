import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/lib/services/userService";
import { Session } from "next-auth";
import { withAuth } from "@/lib/api/with-auth";

const postHandler = async (req: NextRequest, { session }: { session: Session }) => {
  await userService.userAcceptedTermsAndPolicy(session.user.id);

  return new NextResponse("OK", { status: 200 });
}

export const POST = withAuth(postHandler);
