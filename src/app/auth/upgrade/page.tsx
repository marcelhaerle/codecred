import SaasUpgradeManager from "@/components/saas/SaasUpgradeManager";
import { userService } from "@/lib/services/userService";
import { redirect } from "next/navigation";

export default async function UpgradePage() {
  const user = await userService.getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <SaasUpgradeManager />
    </>
  );
}
