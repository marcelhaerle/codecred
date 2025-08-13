import SaasAccountManagement from "@/components/saas/SaasAccountManagement";
import { userService } from "@/lib/services/userService";
import { getSubscriptionStatus } from "@/lib/subscription";
import { redirect } from "next/navigation";

const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

export default async function AccountPage() {
  const user = await userService.getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const subscription = await getSubscriptionStatus(user.id);

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">Account Settings</h1>
      <p className="text-gray-400 mt-2">
        Manage your account settings and preferences here.
      </p>
      {isSaas && <SaasAccountManagement user={user} subscription={subscription} />}
    </div>
  );
}
