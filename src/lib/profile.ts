import { Prisma, PrismaClient } from "@/generated/prisma";
import { Article, BlockWithData, PinnedRepo, Profile, ProfileBlock, ProfileLink, Project, Theme } from "@/types/custom";
import { githubDarkTheme } from "./themes";
import { getLinksByUsername } from "./links";
import { getProjectsByUsername } from "./projects";
import { getCachedArticlesByUsername } from "./rss";
import { getGithubActivity, getPinnedRepos } from "./github";
import { ContributionsCollection } from "@/types/github";

const prisma = new PrismaClient();

/**
 * Fetch a user's profile by their username.
 * @param username The username of the user.
 * @returns The user's profile or null if not found.
 */
export async function getProfile(username: string): Promise<(Profile & { blocksWithData: BlockWithData[] }) | null> {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return null;
  }

  // Die Logik für Theme und Blöcke bleibt gleich
  let userTheme: Theme = githubDarkTheme;
  if (user.theme && typeof user.theme === 'object' && !Array.isArray(user.theme)) {
    userTheme = user.theme as unknown as Theme;
  }

  let userBlocks: ProfileBlock[] = [];
  if (user.blocks && Array.isArray(user.blocks)) {
    userBlocks = user.blocks as unknown as ProfileBlock[];
  }

  const dataPromises = userBlocks.map(block => {
    switch (block.type) {
      case 'LINKS': return getLinksByUsername(username);
      case 'GITHUB_ACTIVITY': return getGithubActivity(username);
      case 'GITHUB_PINNED_REPOS': return getPinnedRepos(username);
      case 'RSS_FEED': return getCachedArticlesByUsername(username);
      case 'PROJECT_SHOWCASE': return getProjectsByUsername(username);
      default: return Promise.resolve(null);
    }
  });
  const results = await Promise.all(dataPromises);

  const blocksWithData: BlockWithData[] = userBlocks.map((block, index) => {
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

  const profile: Profile & { blocksWithData: BlockWithData[] } = {
    username: user.username,
    name: user?.name || "",
    bio: user?.bio || "",
    image: user?.image || "",
    theme: userTheme,
    blocks: userBlocks, // Die reine Konfiguration
    blocksWithData: blocksWithData, // Konfiguration + dynamische Daten
  }

  return profile;
}

/**
 * Update a user's profile.
 * @param username The username of the user.
 * @param profileData The new profile data.
 * @returns The updated profile or null if not found.
 */
export async function updateProfile(username: string, profileData: Partial<Profile>): Promise<Profile | null> {
  await prisma.user.update({
    where: { username },
    data: {
      name: profileData.name,
      bio: profileData.bio,
      image: profileData.image,
      theme: profileData.theme as unknown as Prisma.JsonObject,
      blocks: profileData.blocks as unknown as Prisma.JsonArray,
    },
  });

  return getProfile(username);
}
