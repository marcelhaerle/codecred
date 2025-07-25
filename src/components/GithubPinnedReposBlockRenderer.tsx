"use client";

import { GithubPinnedReposBlock, PinnedRepo, Theme } from "@/types/custom";

interface GithubPinnedReposBlockRendererProps {
  block: GithubPinnedReposBlock;
  theme: Theme;
  data: PinnedRepo[];
}

export default function GitHubPinnedReposBlockRenderer({ data: repos, block, theme }: GithubPinnedReposBlockRendererProps) {
  if (repos.length === 0) {
    return <p>No pinned repositories found.</p>;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Pinned repositories</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {repos.slice(0, block.limit || 4).map((repo) => (
          <div key={repo.name} className="border rounded-lg p-4" style={{ borderColor: theme.colors.primaryText }}>
            <a href={repo.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <p className="font-bold">{repo.name}</p>
            </a>
            <p className="text-sm" style={{ color: theme.colors.secondaryText }}>{repo.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">
                Stars: {repo.stargazerCount} | Forks: {repo.forkCount}
              </span>
              {repo.primaryLanguage && (
                <span
                  className="inline-block px-2 py-1 rounded text-white"
                  style={{ backgroundColor: repo.primaryLanguage.color }}
                >
                  {repo.primaryLanguage.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
