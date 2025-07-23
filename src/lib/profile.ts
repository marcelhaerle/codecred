import { Prisma, PrismaClient } from "@/generated/prisma";
import { Profile, ProfileBlock, Theme } from "@/types/custom";
import { githubDarkTheme } from "./themes";

const prisma = new PrismaClient();

/**
 * Fetch a user's profile by their username.
 * @param username The username of the user.
 * @returns The user's profile or null if not found.
 */
export async function getProfile(username: string): Promise<Profile | null> {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return null;
  }

  let userTheme: Theme = githubDarkTheme;

  if (user.theme && typeof user.theme === 'object' && !Array.isArray(user.theme)) {
    const currentTheme = user.theme as Prisma.JsonObject;
    userTheme = currentTheme as unknown as Theme;
  } else {
    throw new Error("Invalid theme format");
  }

  let userBlocks: ProfileBlock[] = [];

  if (user.blocks && Array.isArray(user.blocks)) {
    userBlocks = user.blocks as unknown as ProfileBlock[];
  } else if (user.blocks && typeof user.blocks === 'object') {
    userBlocks = user.blocks as unknown as ProfileBlock[];
  } else {
    throw new Error("Invalid blocks format");
  }

  const profile: Profile = {
    username: user.username,
    name: user?.name || "",
    bio: user?.bio || "",
    image: user?.image || "",
    theme: userTheme,
    blocks: userBlocks,
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
