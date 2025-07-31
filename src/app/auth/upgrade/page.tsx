import ProPlanSubscription from "@/components/saas/ProPlanSubscription";
import StarterPlanSubscription from "@/components/saas/StarterPlanSubscription";

export default async function UpgradePage() {
  return (
    <div className="max-w-6xl mx-auto mt-24 p-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">
          Choose a Subscription Plan.
        </h2>
        <p className="text-gray-400 mt-2">
          Please note: Paid subscriptions are currently only available to citizens of the
          European Union.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StarterPlanSubscription />
        <ProPlanSubscription />
      </div>
    </div >
  );
}
