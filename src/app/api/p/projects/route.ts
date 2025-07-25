import { getProjectsByUsername } from "@/lib/projects";
import { NextResponse } from "next/server";

// Public API route to fetch projects by username
// Example usage: GET /api/p/projects?username=johndoe
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const projects = await getProjectsByUsername(username);

  return NextResponse.json(projects);
}
