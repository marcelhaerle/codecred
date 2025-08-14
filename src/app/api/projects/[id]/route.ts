import { withAuth } from "@/lib/api/with-auth";
import { deleteProject } from "@/lib/projects";
import { NextResponse } from "next/server";

const deleteHandler = async (req: Request, { params }: { params: { id: string } }) => {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const isDeleted = await deleteProject(id);

  if (!isDeleted) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Project deleted successfully" });
}

export const DELETE = withAuth(deleteHandler);
