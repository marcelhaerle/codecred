import ProjectShowcaseEditor from "@/components/ProjectShowcaseEditor";
import ProjectShowcaseEditorFallback from "@/components/ProjectShowcaseEditorFallback";
import { getProjects } from "@/lib/projects";
import { Suspense } from "react";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <Suspense fallback={<ProjectShowcaseEditorFallback />}>
        <ProjectShowcaseEditor initialProjects={projects} />
      </Suspense>
    </div>
  );
}
