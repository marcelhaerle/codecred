import { getCachedArticlesByUsername } from "@/lib/rss";
import { NextResponse } from "next/server";

// Public API route to fetch cached RSS feed articles by username
// Example usage: GET /api/p/rss?username=johndoe
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const articles = await getCachedArticlesByUsername(username);

  return NextResponse.json(articles);
}
