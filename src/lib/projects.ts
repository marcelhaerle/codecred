import { PrismaClient } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { Project } from "@/lib/types";

const prisma = new PrismaClient();

export async function getProjectsByUsername(username: string): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    where: {
      user: {
        username: username,
      },
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl || undefined,
    liveDemoUrl: project.liveDemoUrl || undefined,
    sourceCodeUrl: project.sourceCodeUrl || undefined,
    techStack: project.techStack || [],
    displayOrder: project.displayOrder || 0,
  }));
}


export async function getProjects(): Promise<Project[]> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const projects = await prisma.project.findMany({
    where: {
      user: {
        id: session.user.id,
      },
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.imageUrl || undefined,
    liveDemoUrl: project.liveDemoUrl || undefined,
    sourceCodeUrl: project.sourceCodeUrl || undefined,
    techStack: project.techStack || [],
    displayOrder: project.displayOrder || 0,
  }));
}

export async function createProject(project: Partial<Project>): Promise<Project> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  if (!project.title || !project.description || !project.techStack || !project.displayOrder) {
    throw new Error("Title, description techStack and displayOrder are required");
  }

  const newProject = await prisma.project.create({
    data: {
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      liveDemoUrl: project.liveDemoUrl,
      sourceCodeUrl: project.sourceCodeUrl,
      techStack: project.techStack,
      displayOrder: project.displayOrder,
      user: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  return {
    id: newProject.id,
    title: newProject.title,
    description: newProject.description,
    imageUrl: newProject.imageUrl || undefined,
    liveDemoUrl: newProject.liveDemoUrl || undefined,
    sourceCodeUrl: newProject.sourceCodeUrl || undefined,
    techStack: newProject.techStack || [],
    displayOrder: newProject.displayOrder || 0,
  };
}

export async function updateProject(project: Project): Promise<Project> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const updatedProject = await prisma.project.update({
    where: { id: project.id },
    data: {
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      liveDemoUrl: project.liveDemoUrl,
      sourceCodeUrl: project.sourceCodeUrl,
      techStack: project.techStack,
      displayOrder: project.displayOrder,
    },
  });

  return {
    id: updatedProject.id,
    title: updatedProject.title,
    description: updatedProject.description,
    imageUrl: updatedProject.imageUrl || undefined,
    liveDemoUrl: updatedProject.liveDemoUrl || undefined,
    sourceCodeUrl: updatedProject.sourceCodeUrl || undefined,
    techStack: updatedProject.techStack || [],
    displayOrder: updatedProject.displayOrder || 0,
  };
}

export async function deleteProject(projectId: string): Promise<boolean> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const deletedProject = await prisma.project.delete({
    where: { id: projectId, user: { id: session.user.id } },
  });

  return deletedProject !== null;
}
