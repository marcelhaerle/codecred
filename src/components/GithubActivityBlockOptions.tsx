"use client";

import { GithubActivityBlock } from "@/lib/types";
import { useState } from "react";

export default function GithubActivityBlockOptions({ block, onChange }: { block: GithubActivityBlock; onChange: (updatedBlock: GithubActivityBlock) => void }) {
  const [currentBlock, setCurrentBlock] = useState<GithubActivityBlock>(block);

  const setLimit = (limit: number) => {
    const updatedBlock = { ...currentBlock, limit };
    setCurrentBlock(updatedBlock);
    onChange(updatedBlock);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Limit</label>
        <input
          type="number"
          value={currentBlock.limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800"
        />
      </div>
    </div>
  );
}
