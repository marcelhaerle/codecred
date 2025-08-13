import { authOptions } from "@/lib/auth";
import { getProfile, updateProfile } from "@/lib/services/profileService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Profile } from "@/lib/types";

// API route to get user's profile
// Example usage: GET /api/profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await getProfile(session.user.username);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

// API route to update user's profile
// Example usage: PUT /api/profile
// Body should contain the updated profile data in JSON format
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: Profile = await req.json();

  try {
    const updatedProfile = await updateProfile(session.user.username, body);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
