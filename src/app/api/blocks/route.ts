import { getGithubActivity, getPinnedRepos } from "@/lib/github";
import { getLinksByUsername } from "@/lib/links";
import { getProfile } from "@/lib/profile";
import { getProjectsByUsername } from "@/lib/projects";
import { getCachedArticlesByUsername } from "@/lib/rss";
import { Article, BlockWithData, PinnedRepo, ProfileLink, Project } from "@/types/custom";
import { ContributionsCollection } from "@/types/github";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const profile = await getProfile(username);

  if (!profile) {
    return NextResponse.json(
      { error: "Profile not found" },
      { status: 404 }
    );
  }

  const dataPromises = profile.blocks.map(block => {
    switch (block.type) {
      case 'LINKS': return getLinksByUsername(profile.username);
      case 'GITHUB_ACTIVITY': return getGithubActivity(profile.username);
      case 'GITHUB_PINNED_REPOS': return getPinnedRepos(profile.username);
      case 'RSS_FEED': return getCachedArticlesByUsername(profile.username);
      case 'PROJECT_SHOWCASE': return getProjectsByUsername(profile.username);
      default: return Promise.resolve(null);
    }
  });
  const results = await Promise.all(dataPromises);

  const blocksWithData: BlockWithData[] = profile.blocks.map((block, index) => {
    const data = results[index];
    switch (block.type) {
      case 'LINKS':
        return {
          ...block,
          data: data ? (data as ProfileLink[]) : [],
        };
      case 'GITHUB_ACTIVITY':
        return {
          ...block,
          data: data ? (data as ContributionsCollection) : null,
        };
      case 'GITHUB_PINNED_REPOS':
        return {
          ...block,
          data: data ? (data as PinnedRepo[]) : [],
        };
      case 'RSS_FEED':
        return {
          ...block,
          data: data ? (data as Article[]) : [],
        };
      case 'PROJECT_SHOWCASE':
        return {
          ...block,
          data: data ? (data as Project[]) : [],
        };
      default:
        throw new Error(`Unknown block type: ${block}`);
    }
  });

  return NextResponse.json(blocksWithData);
}
