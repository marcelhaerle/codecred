import { userRepository } from "@/repositories/userRepository";
import { User } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const userService = {
  userAcceptedTermsAndPolicy: async (id: string): Promise<void> => {
    await userRepository.updateUser(id, {
      termsAccepted: true,
      privacyPolicyAccepted: true,
    });
  },

  deleteUser: async (id: string): Promise<void> => {
    await userRepository.deleteUser(id);
  },

  getCurrentUser: async (): Promise<User | null> => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      theme: user.theme ? JSON.parse(user.theme) : null,
      blocks: user.blocks ? JSON.parse(user.blocks) : [],
      termsAccepted: user.termsAccepted || false,
      privacyPolicyAccepted: user.privacyPolicyAccepted || false,
      email: user.email || "",
      username: user.username,
      name: user.name || "",
      bio: user.bio || "",
      image: user.image || "",
      scheduledForDeletion: user.scheduledForDeletion ? new Date(user.scheduledForDeletion).toISOString() : null,
    };
  }
}
