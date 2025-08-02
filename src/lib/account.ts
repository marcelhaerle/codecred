import { Account } from "@/types/custom";
import { getCurrentUser } from "./auth"

export async function getAccount(): Promise<Account | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const account: Account = {
    id: user.id,
    termsAccepted: user.termsAccepted || false,
    privacyPolicyAccepted: user.privacyPolicyAccepted || false,
    email: user.email || "",
    username: user.username,
    name: user.name || "",
    bio: user.bio || "",
    image: user.image || "",
    scheduledForDeletion: user.scheduledForDeletion ? new Date(user.scheduledForDeletion).toISOString() : null,
  }

  return account;
}
