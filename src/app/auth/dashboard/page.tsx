import Dashboard from "@/components/Dashboard";
import DashboardFallback from "@/components/DashboardFallback";
import { authOptions } from "@/lib/auth";
import { getProfile } from "@/lib/profile";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const profile = await getProfile(session?.user?.username || "");

  if (!profile) {
    return (
      <div className="w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <Suspense fallback={<DashboardFallback />}>
        <Dashboard initialData={profile} />
      </Suspense>
    </div>
  );
}
