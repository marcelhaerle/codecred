import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // --- 1. Security Check ---
  // Protect the endpoint with a secret key passed as a bearer token.
  if (req.headers.get('Authorization') !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { count } = await prisma.user.deleteMany({
      where: {
        scheduledForDeletion: {
          lte: new Date(),
        },
      },
    });

    console.log(`Deleted ${count} accounts scheduled for deletion.`);

    return NextResponse.json({ success: true, deletedCount: count }, { status: 200 });
  } catch (error) {
    console.error("Error deleting accounts:", error);
    return NextResponse.json({ error: "Failed to delete accounts" }, { status: 500 });
  }
}
