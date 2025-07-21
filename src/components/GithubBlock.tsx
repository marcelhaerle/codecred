"use client";

import { useEffect, useState } from "react";

async function getPinnedRepos(username: string) {
  const res = await fetch(`/api/pinned-repos?username=${username}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    return [];
  }
  return res.json();
}

interface Repo {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  url: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}

export default function GitHubBlock({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    async function fetchRepos() {
      const fetchedRepos = await getPinnedRepos(username);
      setRepos(fetchedRepos);
    }

    fetchRepos();
  }, [username]);

  if (repos.length === 0) {
    return <p>No pinned repositories found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pinned repositories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo) => (
          <div key={repo.name} className="border rounded-lg p-4">
            <a href={repo.url} target="_blank" rel="noopener noreferrer">
              <h3 className="font-bold">{repo.name}</h3>
            </a>
            <p className="text-sm text-gray-600">{repo.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-500">
                Stars: {repo.stargazerCount} | Forks: {repo.forkCount}
              </span>
              {repo.primaryLanguage && (
                <span
                  className="inline-block px-2 py-1 rounded"
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
