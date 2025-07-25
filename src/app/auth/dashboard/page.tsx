import Dashboard from "@/components/Dashboard";
import DashboardFallback from "@/components/DashboardFallback";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <div className="w-full mx-auto">
      <Suspense fallback={<DashboardFallback />}>
        <Dashboard />
      </Suspense>
    </div>
  );
}
