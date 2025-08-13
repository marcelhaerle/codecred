"use client";

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { LinksBlock, ProfileBlock } from "@/lib/types";
import { useState } from 'react';
import LinksBlockOptions from './LinksBlockOptions';
import GithubActivityBlockOptions from './GithubActivityBlockOptions';
import GithubPinnedReposBlockOptions from './GithubPinnedReposBlockOptions';
import RssFeedBlockOptions from './RssFeedBlockOptions';
import ProjectShowcaseBlockOptions from './ProjectShowcaseBlockOptions';

interface SlideInControlPanelProps {
  selectedBlock: ProfileBlock | null;
  onUpdateBlock: (updatedBlock: ProfileBlock | null) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function SlideInControlPanel({ selectedBlock, onUpdateBlock, onDelete, onClose }: SlideInControlPanelProps) {
  const [currentBlock, setCurrentBlock] = useState<ProfileBlock | null>(selectedBlock);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 shadow-2xl z-50 p-6 flex flex-col"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-6">
        <h2 className="text-xl font-bold text-white">Edit Block</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Panel Content */}
      {selectedBlock ? (
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-white mb-4">Editing: <span className="font-bold text-blue-800">{selectedBlock.name}</span></h3>
          {selectedBlock.type === 'LINKS' && <LinksBlockOptions block={selectedBlock as LinksBlock} onChange={setCurrentBlock} />}
          {selectedBlock.type === 'GITHUB_ACTIVITY' && <GithubActivityBlockOptions block={selectedBlock} onChange={setCurrentBlock} />}
          {selectedBlock.type === 'GITHUB_PINNED_REPOS' && <GithubPinnedReposBlockOptions block={selectedBlock} onChange={setCurrentBlock} />}
          {selectedBlock.type === 'RSS_FEED' && <RssFeedBlockOptions block={selectedBlock} onChange={setCurrentBlock} />}
          {selectedBlock.type === 'PROJECT_SHOWCASE' && <ProjectShowcaseBlockOptions block={selectedBlock} onChange={setCurrentBlock} />}
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          <p>No block selected.</p>
        </div>
      )}

      {/* Panel Footer */}
      <div className="mt-auto pt-6 border-t border-gray-800 flex gap-4">
        <button onClick={() => onUpdateBlock(currentBlock)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Save
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600/20 hover:bg-red-500/30 text-red-400 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Delete Block
        </button>
      </div>
    </motion.div>
  );
};
