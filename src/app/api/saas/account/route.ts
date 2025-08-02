import { PrismaClient } from "@/generated/prisma";
import { getAccount } from "@/lib/account";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

    const account = await getAccount();

    return NextResponse.json(account);
  } catch (error) {
    console.error("Failed to fetch user account:", error);
    return NextResponse.json({ error: "Failed to fetch user account" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSaas) {
    return NextResponse.json({ status: "NONE" }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: session.user.id },
    });

    return NextResponse.json({ status: "DELETED" });
  } catch (error) {
    console.error("Failed to delete account:", error);
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}
