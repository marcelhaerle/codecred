import RssFeedManager from "@/components/RssFeedManager";
import RssFeedManagerFallback from "@/components/RssFeedManagerFallback";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function RssPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Your RSS Feeds</h1>
      <Suspense fallback={<RssFeedManagerFallback />}>
        <RssFeedManager />
      </Suspense>
    </div>

  );
}
