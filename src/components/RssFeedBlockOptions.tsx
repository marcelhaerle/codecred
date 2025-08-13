"use client";

import { RssFeedBlock } from "@/lib/types";
import { useState } from "react";

export default function RssFeedBlockOptions({ block, onChange }: { block: RssFeedBlock; onChange: (updatedBlock: RssFeedBlock) => void }) {
  const [currentBlock, setCurrentBlock] = useState<RssFeedBlock>(block);

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
