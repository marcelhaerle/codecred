import { getLinksByUsername } from "@/lib/links";
import { NextResponse } from "next/server";

// Public API route to fetch links by username
// Example usage: GET /api/p/links?username=johndoe
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const links = await getLinksByUsername(username);

  const filteredAndSortedLinks = links
    .filter(link => link.active)
    .sort((a, b) => a.position - b.position)
    .map(link => ({
      title: link.title,
      url: link.url,
    }));

  return NextResponse.json(filteredAndSortedLinks);
}
