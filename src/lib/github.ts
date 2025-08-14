import { PinnedRepo, ContributionsCollection, GitHubActivityResponse, PinnedRepoResponse } from "@/lib/types";
import { Octokit } from "@octokit/core";
import { env } from "@/lib/env";

const ActivityQuery = `
query UserActivity($username: String!, $limit: Int = 10) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
      }
      commitContributionsByRepository(maxRepositories: $limit) {
        repository {
          nameWithOwner
          url
        }
        contributions(first: 1, orderBy: {field: OCCURRED_AT, direction: DESC}) {
          nodes {
            occurredAt
            commitCount
          }
        }
      }
      pullRequestContributions(first: $limit, orderBy: {direction: DESC}) {
        nodes {
          occurredAt
          pullRequest {
            title
            url
            repository {
              nameWithOwner
            }
          }
        }
      }
      issueContributions(first: $limit, orderBy: {direction: DESC}) {
        nodes {
          occurredAt
          issue {
            title
            url
            repository {
              nameWithOwner
            }
          }
        }
      }
    }
  }
}
`;

export async function getGithubActivity(username: string): Promise<ContributionsCollection | null> {
  try {
    const octokit = new Octokit({ auth: env.GITHUB_PAT });

    try {
      const res = await octokit.graphql<GitHubActivityResponse>(ActivityQuery, {
        username: username,
        request: {
          next: {
            revalidate: 3600, // Cache for 1 hour
          },
        },
      });

      return res.user?.contributionsCollection || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching GitHub activity for ${username}:`, error);
    return null;
  }
}

const PinnedReposQuery = `
  query GetPinnedRepos($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            stargazerCount
            forkCount
            url
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedRepos(username: string): Promise<PinnedRepo[]> {
  const octokit = new Octokit({ auth: env.GITHUB_PAT });

  try {
    const res = await octokit.graphql<PinnedRepoResponse>(PinnedReposQuery, {
      username,
      request: {
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      },
    });

    return res.user?.pinnedItems.nodes || [];
  } catch (error) {
    console.error(`Error fetching pinned repositories for ${username}:`, error);
    return [];
  }
}
