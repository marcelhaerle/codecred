"use client";

import { LinksBlock } from "@/lib/types";
import { useState } from "react";

export default function LinksBlockOptions({ block, onChange }: { block: LinksBlock; onChange: (updatedBlock: LinksBlock) => void }) {
  const [currentBlock, setCurrentBlock] = useState<LinksBlock>(block);

  const setHeader = (header: string) => {
    const updatedBlock = { ...currentBlock, header };
    setCurrentBlock(updatedBlock);
    onChange(updatedBlock);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Header</label>
        <input
          type="text"
          value={currentBlock.header}
          onChange={(e) => setHeader(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white focus:ring-blue-800 focus:border-blue-800"
        />
      </div>
    </div>
  );
}
