import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { userService } from "@/lib/services/userService";


export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await userService.deleteUser(session.user.id);

  return new NextResponse("OK", { status: 200 });
}
