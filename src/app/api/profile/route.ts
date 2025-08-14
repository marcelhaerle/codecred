import { getProfile, updateProfile } from "@/lib/services/profileService";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { Profile } from "@/lib/types";
import { withAuth } from "@/lib/api/with-auth";

// API route to get user's profile
// Example usage: GET /api/profile
const getHandler = async (req: NextRequest, { session }: { session: Session }) => {
  const profile = await getProfile(session.user.username);

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

// API route to update user's profile
// Example usage: PUT /api/profile
// Body should contain the updated profile data in JSON format
const putHandler = async (req: Request, { session }: { session: Session }) => {
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

export const GET = withAuth(getHandler);
export const PUT = withAuth(putHandler);
