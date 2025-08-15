import { AuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { githubDarkTheme } from "./themes";
import { User } from "@/generated/prisma";
import { env } from "@/lib/env";
import { subscriptionService } from "./services/subscriptionService";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID as string,
      clientSecret: env.GITHUB_SECRET as string,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          bio: profile.bio,
          // Default theme for new users
          theme: JSON.stringify(githubDarkTheme),
          blocks: "[]", // Initialize with an empty array for blocks
          termsAccepted: profile.termsAccepted,
          privacyPolicyAccepted: profile.privacyPolicyAccepted,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        const subscription = await subscriptionService.getStatus(user.id);
        token.id = user.id;
        token.username = user.username;
        token.termsAccepted = user.termsAccepted;
        token.privacyPolicyAccepted = user.privacyPolicyAccepted;
        token.plan = subscription.plan;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
}
