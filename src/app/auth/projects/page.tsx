import ProjectShowcaseEditor from "@/components/ProjectShowcaseEditor";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-6xl mx-auto py-12">
      <ProjectShowcaseEditor initialProjects={projects} />
    </div>
  );
}
