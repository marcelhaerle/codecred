import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/lib/auth";
import { Account } from "@/types/custom";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ status: "NONE" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const account: Account = {
      id: user.id,
      email: user.email || "",
      username: user.username,
      name: user.name || "",
      bio: user.bio || "",
      image: user.image || "",
      scheduledForDeletion: user.scheduledForDeletion ? new Date(user.scheduledForDeletion).toISOString() : null,
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error("Failed to fetch user account:", error);
    return NextResponse.json({ error: "Failed to fetch user account" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ status: "NONE" }, { status: 400 });
  }

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
