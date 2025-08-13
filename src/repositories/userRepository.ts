import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types";
import { User as PrismaUser } from "@/generated/prisma";

export const userRepository = {
  updateUser: async (id: string, data: Partial<User>) => {
    const dataForUpdate: Partial<PrismaUser> = {};

    if (data.name !== undefined) {
      dataForUpdate.name = data.name;
    }
    if (data.email !== undefined) {
      dataForUpdate.email = data.email;
    }
    if (data.image !== undefined) {
      dataForUpdate.image = data.image;
    }
    if (data.username !== undefined) {
      dataForUpdate.username = data.username;
    }
    if (data.bio !== undefined) {
      dataForUpdate.bio = data.bio;
    }
    if (data.theme !== undefined) {
      dataForUpdate.theme = JSON.stringify(data.theme);
    }
    if (data.blocks !== undefined) {
      dataForUpdate.blocks = JSON.stringify(data.blocks);
    }
    if (data.termsAccepted !== undefined) {
      dataForUpdate.termsAccepted = data.termsAccepted;
    }
    if (data.privacyPolicyAccepted !== undefined) {
      dataForUpdate.privacyPolicyAccepted = data.privacyPolicyAccepted;
    }

    return prisma.user.update({
      where: { id },
      data: dataForUpdate,
    });
  },

  deleteUser: async (id: string): Promise<void> => {
    await prisma.user.delete({
      where: { id },
    });
  },
}
