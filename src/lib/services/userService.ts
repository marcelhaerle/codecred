import { userRepository } from "@/repositories/userRepository";

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
}
