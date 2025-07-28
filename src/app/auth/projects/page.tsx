import ProjectShowcaseEditor from "@/components/ProjectShowcaseEditor";
import ProjectShowcaseEditorFallback from "@/components/ProjectShowcaseEditorFallback";
import { getCurrentUser } from "@/lib/auth";
import { getProjects } from "@/lib/projects";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProjectsPage() {
  const isSaas = process.env.NEXT_PUBLIC_IS_SAAS_VERSION === "true";

  const user = await getCurrentUser();

  if (!user) {
    return redirect("/");
  }

  if (isSaas && (!user.privacyPolicyAccepted || !user.termsAccepted)) {
    return redirect("/auth/agreement");
  }

  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <Suspense fallback={<ProjectShowcaseEditorFallback />}>
        <ProjectShowcaseEditor initialProjects={projects} />
      </Suspense>
    </div>
  );
}
