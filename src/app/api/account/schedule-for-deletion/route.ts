import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api/with-auth";

const deleteHandler = async (request: NextRequest, { session }: { session: Session }) => {
  const { expiresAt } = await request.json();

  if (!expiresAt) {
    return NextResponse.json({ error: "Expiration date is required" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { scheduledForDeletion: new Date(expiresAt) },
    });

    return NextResponse.json({ status: "DELETED" });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}

export const DELETE = withAuth(deleteHandler);
