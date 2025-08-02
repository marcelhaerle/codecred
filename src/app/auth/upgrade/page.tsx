import SaasUpgradeManager from "@/components/saas/SaasUpgradeManager";
import { getAccount } from "@/lib/account";
import { redirect } from "next/navigation";

export default async function UpgradePage() {
  const account = await getAccount();

  if (!account) {
    return redirect("/");
  }

  return (
    <>
      <SaasUpgradeManager />
    </>
  );
}
