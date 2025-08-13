import { PrismaClient } from "@/generated/prisma";
import { Article, BlockWithData, PinnedRepo, Profile, ProfileBlock, ProfileLink, Project, Theme, ContributionsCollection } from "@/lib/types";
import { githubDarkTheme } from "@/lib/themes";
import { getLinksByUsername } from "@/lib/links";
import { getProjectsByUsername } from "@/lib/projects";
import { getGithubActivity, getPinnedRepos } from "@/lib/github";
import { rssFeedService } from "@/lib/services/rssFeedService";

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

  let userTheme: Theme = githubDarkTheme;
  if (user.theme && typeof JSON.parse(user.theme) === 'object' && !Array.isArray(JSON.parse(user.theme))) {
    userTheme = JSON.parse(user.theme) as unknown as Theme;
  }

  let userBlocks: ProfileBlock[] = [];
  if (user.blocks && Array.isArray(JSON.parse(user.blocks))) {
    userBlocks = JSON.parse(user.blocks) as unknown as ProfileBlock[];
  }

  const dataPromises = userBlocks.map(block => {
    switch (block.type) {
      case 'LINKS': return getLinksByUsername(username);
      case 'GITHUB_ACTIVITY': return getGithubActivity(username);
      case 'GITHUB_PINNED_REPOS': return getPinnedRepos(username);
      case 'RSS_FEED': return rssFeedService.getCachedArticlesByUsername(username);
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
    blocks: userBlocks,
    blocksWithData: blocksWithData,
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
      theme: JSON.stringify(profileData.theme),
      blocks: JSON.stringify(profileData.blocks),
    },
  });

  return getProfile(username);
}
