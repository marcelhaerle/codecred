"use client";

import UUID from "uuid-js";
import {
  Profile,
  ProfileBlock,
  LinksBlock,
  GithubPinnedReposBlock,
  GithubActivityBlock,
  RssFeedBlock,
  ProjectShowcaseBlock,
  BlockWithData,
} from "@/types/custom";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import SlideInControlPanel from "./SlideInControlPanel";
import BlockRenderer from "./BlockRenderer";
import { Palette, Plus, ChevronUp, ChevronDown } from "lucide-react";
import AppearancePanel from "./AppearancePanel";
import { getFontStyle } from "@/lib/themes";
import ProfileHeader from "./profile/ProfileHeader";
import LoadingSpinner from "./LoadingSpinner";

const availableBlocks = [
  { type: "LINKS", name: "Links" },
  { type: "GITHUB_PINNED_REPOS", name: "Pinned Repositories" },
  { type: "GITHUB_ACTIVITY", name: "GitHub Activity" },
  { type: "RSS_FEED", name: "RSS Feed" },
  { type: "PROJECT_SHOWCASE", name: "Project Showcase" }
];

export default function Dashboard({ initialData }: { initialData: Profile & { blocksWithData: BlockWithData[] } }) {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(initialData);
  const [blocks, setBlocks] = useState<ProfileBlock[]>(initialData.blocks);
  const [blocksWithData, setBlocksWithData] = useState<BlockWithData[]>(initialData.blocksWithData);
  const [selectedBlock, setSelectedBlock] = useState<ProfileBlock | null>(null);
  const [isAppearancePanelOpen, setAppearancePanelOpen] = useState(false);
  const [isAddBlockOpen, setAddBlockOpen] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);

    const response = await fetch("/api/profile");
    if (!response.ok) {
      console.error("Failed to fetch profile data");
      setIsLoading(false);
      return;
    }
    const profileData: Profile & { blocksWithData: BlockWithData[] } = await response.json();

    setProfile(profileData);
    setBlocks(profileData.blocks);
    setBlocksWithData(profileData.blocksWithData);

    setIsLoading(false);
  };

  const saveProfile = async (updatedProfile: Profile, shouldFetch: boolean) => {
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      if (shouldFetch) {
        fetchProfile();
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };



  const handleBlockClick = (block: ProfileBlock) => {
    setSelectedBlock(block);
  };

  const handleClosePanel = () => {
    setSelectedBlock(null);
  };

  const handleUpdateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile, false);
  };

  const handleAddBlock = async (blockType: "LINKS" | "GITHUB_PINNED_REPOS" | "GITHUB_ACTIVITY" | "RSS_FEED" | "PROJECT_SHOWCASE") => {
    if (!profile) return;

    let newBlock: ProfileBlock;

    if (blockType === "LINKS") {
      const newLinksBlock: LinksBlock = {
        id: UUID.create().toString(),
        type: "LINKS",
        name: "Links",
        header: "My Links",
      };
      newBlock = newLinksBlock;
    } else if (blockType === "GITHUB_PINNED_REPOS") {
      const newGithubPinnedReposBlock: GithubPinnedReposBlock = {
        id: UUID.create().toString(),
        type: "GITHUB_PINNED_REPOS",
        name: "Pinned Repositories",
        limit: 4,
      };
      newBlock = newGithubPinnedReposBlock;
    } else if (blockType === "GITHUB_ACTIVITY") {
      const newGithubActivityBlock: GithubActivityBlock = {
        id: UUID.create().toString(),
        type: "GITHUB_ACTIVITY",
        name: "GitHub Activity",
        limit: 5,
      };
      newBlock = newGithubActivityBlock;
    } else if (blockType === "RSS_FEED") {
      const newRssFeedBlock: RssFeedBlock = {
        id: UUID.create().toString(),
        type: "RSS_FEED",
        name: "RSS Feed",
        limit: 10,
      };
      newBlock = newRssFeedBlock;
    } else if (blockType === "PROJECT_SHOWCASE") {
      const newProjectShowcaseBlock: ProjectShowcaseBlock = {
        id: UUID.create().toString(),
        type: "PROJECT_SHOWCASE",
        name: "Project Showcase",
      };
      newBlock = newProjectShowcaseBlock;
    } else {
      return;
    }

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);

    const updatedProfile = { ...profile, blocks: updatedBlocks };
    setProfile(updatedProfile);
    saveProfile(updatedProfile, true);

    setAddBlockOpen(false);
  };

  const handleUpdateBlock = (updatedBlock: ProfileBlock | null) => {
    if (!profile || !updatedBlock) return;

    const updatedBlocks = blocks.map((block) =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    setBlocks(updatedBlocks);
    setSelectedBlock(null);

    const updatedProfile = { ...profile, blocks: updatedBlocks };
    setProfile(updatedProfile);
    saveProfile(updatedProfile, true);
  };

  const handleDeleteBlock = async () => {
    if (!selectedBlock || !profile) return;

    const updatedBlocks = blocks.filter(
      (block) => block.id !== selectedBlock.id
    );
    setBlocks(updatedBlocks);
    setSelectedBlock(null);

    const updatedProfile = { ...profile, blocks: updatedBlocks };
    setProfile(updatedProfile);
    saveProfile(updatedProfile, true);
  };

  const handleMoveBlock = (blockId: string, direction: 'up' | 'down') => {
    if (!profile) return;

    const index = blocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;

    const newBlocks = [...blocks];
    const [movedBlock] = newBlocks.splice(index, 1);

    if (direction === 'up') {
      newBlocks.splice(Math.max(0, index - 1), 0, movedBlock);
    } else {
      newBlocks.splice(Math.min(newBlocks.length, index + 1), 0, movedBlock);
    }

    setBlocks(newBlocks);

    const updatedProfile = { ...profile, blocks: newBlocks };
    setProfile(updatedProfile);
    saveProfile(updatedProfile, true);
  };

  if (isLoading || !profile) {
    return (<LoadingSpinner />);
  }

  const unusedBlocks = availableBlocks.filter(
    (ab) => !blocks.some((b) => b.type === ab.type)
  );

  return (
    <div
      className={`relative min-h-screen`}
      style={{
        backgroundColor: profile.theme.colors.pageBackground,
        color: profile.theme.colors.primaryText,
        fontFamily: getFontStyle(profile.theme.typography.fontFamily),
      }}
    >
      <div className="sticky top-24 z-50 bg-transparent p-4">
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between mb-8">
          <button
            onClick={() => setAppearancePanelOpen(true)}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Palette className="w-5 h-5" />
            Customize
          </button>
          <div className="relative">
            <button
              onClick={() => setAddBlockOpen(!isAddBlockOpen)}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Block
            </button>
            {isAddBlockOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1">
                {unusedBlocks.length > 0 ? (
                  unusedBlocks.map((block) => (
                    <button
                      key={block.type}
                      onClick={() =>
                        handleAddBlock(block.type as "LINKS" | "GITHUB_PINNED_REPOS" | "GITHUB_ACTIVITY")
                      }
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                      {block.name}
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-400">
                    All blocks are in use.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content: Full-width live preview */}
      <main
        style={{
          maxWidth:
            profile.theme.layout.contentWidth === "standard"
              ? "840px"
              : "960px",
          margin: "0 auto",
          padding: "16px",
        }}
      >
        <ProfileHeader profile={profile} />

        <div className="space-y-4">
          {blocksWithData.map((block, index) => (
            <div
              key={block.id}
              className="relative group cursor-pointer"
              onClick={() => handleBlockClick(block)}
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveBlock(block.id, 'up');
                    }}
                    disabled={index === 0}
                    className="text-gray-600 hover:text-white disabled:text-gray-800 transition-colors p-1"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMoveBlock(block.id, 'down');
                    }}
                    disabled={index === blocks.length - 1}
                    className="text-gray-600 hover:text-white disabled:text-gray-800 transition-colors p-1"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
                <BlockRenderer block={block} theme={profile.theme} />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* The Slide-in Panel, rendered conditionally */}
      <AnimatePresence>
        {selectedBlock && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClosePanel}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <SlideInControlPanel
              selectedBlock={selectedBlock}
              onUpdateBlock={handleUpdateBlock}
              onDelete={handleDeleteBlock}
              onClose={handleClosePanel}
            />
          </>
        )}
        {isAppearancePanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAppearancePanelOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <AppearancePanel
              profile={profile}
              onUpdateProfile={handleUpdateProfile}
              onClose={() => setAppearancePanelOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
