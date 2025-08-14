import { withAuth } from "@/lib/api/with-auth";
import { userService } from "@/lib/services/userService";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const getHandler = async () => {
  try {
    const user = await userService.getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user account:", error);
    return NextResponse.json({ error: "Failed to fetch user account" }, { status: 500 });
  }
}

const deleteHandler = async (req: NextRequest, { session }: { session: Session }) => {
  try {
    await userService.deleteUser(session.user.id);

    return NextResponse.json({ status: "DELETED" });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}

export const GET = withAuth(getHandler);
export const DELETE = withAuth(deleteHandler);
