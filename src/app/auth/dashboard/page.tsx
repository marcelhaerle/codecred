import Dashboard from "@/components/Dashboard";
import DashboardFallback from "@/components/DashboardFallback";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full mx-auto">
      <Suspense fallback={<DashboardFallback />}>
        <Dashboard username={session?.user?.username || ""} />
      </Suspense>
    </div>
  );
}
