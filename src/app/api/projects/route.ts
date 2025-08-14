import { withAuth } from "@/lib/api/with-auth";
import { createProject, updateProject } from "@/lib/projects";
import { NextResponse } from "next/server";

const postHandler = async (req: Request) => {
  const { title, description, techStack, imageUrl, liveDemoUrl, sourceCodeUrl, displayOrder } = await req.json();

  if (!title || !description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
  }

  if (typeof displayOrder !== 'number' || displayOrder < 0) {
    return NextResponse.json({ error: "Display order must be a non-negative number" }, { status: 400 });
  }

  if (!Array.isArray(techStack) || techStack.some(tag => typeof tag !== 'string')) {
    return NextResponse.json({ error: "Tech stack must be an array of strings" }, { status: 400 });
  }

  const project = await createProject({
    title,
    description,
    techStack: techStack || [],
    imageUrl: imageUrl || undefined,
    liveDemoUrl: liveDemoUrl || undefined,
    sourceCodeUrl: sourceCodeUrl || undefined,
    displayOrder: displayOrder || 0,
  });

  return NextResponse.json(project);
}

const putHandler = async (req: Request) => {
  const { id, title, description, techStack, imageUrl, liveDemoUrl, sourceCodeUrl, displayOrder } = await req.json();

  if (!id || !title || !description) {
    return NextResponse.json({ error: "ID, title, and description are required" }, { status: 400 });
  }

  if (typeof displayOrder !== 'number' || displayOrder < 0) {
    return NextResponse.json({ error: "Display order must be a non-negative number" }, { status: 400 });
  }

  if (!Array.isArray(techStack) || techStack.some(tag => typeof tag !== 'string')) {
    return NextResponse.json({ error: "Tech stack must be an array of strings" }, { status: 400 });
  }

  const project = await updateProject({
    id,
    title,
    description,
    techStack: techStack || [],
    imageUrl: imageUrl || undefined,
    liveDemoUrl: liveDemoUrl || undefined,
    sourceCodeUrl: sourceCodeUrl || undefined,
    displayOrder: displayOrder || 0,
  });

  return NextResponse.json(project);
}

export const POST = withAuth(postHandler);
export const PUT = withAuth(putHandler);
