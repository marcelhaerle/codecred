
import { LinksEditor } from "@/components/LinksEditor";
import LinksEditorFallback from "@/components/LinksEditorFallback";
import { getCurrentUser } from "@/lib/auth";
import { getLinks } from "@/lib/links";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LinksPage() {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  const links = await getLinks();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Your Links</h1>
      <Suspense fallback={<LinksEditorFallback />}>
        <LinksEditor links={links} />
      </Suspense>
    </div>
  );
}
