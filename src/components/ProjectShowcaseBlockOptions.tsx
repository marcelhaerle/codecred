"use client";

import { ProjectShowcaseBlock } from "@/lib/types";

interface ProjectShowcaseBlockOptionsProps {
  block: ProjectShowcaseBlock;
  onChange: (updatedBlock: ProjectShowcaseBlock) => void
}

export default function ProjectShowcaseBlockOptions({ }: ProjectShowcaseBlockOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">No options</label>
      </div>
    </div>
  );
}
