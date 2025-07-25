interface Repository {
  nameWithOwner: string;
  url?: string; // Optional as it's not in all contribution types
}

// Represents a single commit contribution node.
interface CommitNode {
  occurredAt: string;
  commitCount: number;
}

// Represents the structure for commit contributions grouped by repository.
interface CommitContribution {
  repository: Repository;
  contributions: {
    nodes: CommitNode[];
  };
}

// Represents a single pull request contribution node.
interface PullRequestNode {
  occurredAt: string;
  pullRequest: {
    title: string;
    url: string;
    repository: Repository;
  };
}

// Represents a single issue contribution node.
interface IssueNode {
  occurredAt: string;
  issue: {
    title: string;
    url: string;
    repository: Repository;
  };
}

// Represents the main contributions collection.
export interface ContributionsCollection {
  contributionCalendar: {
    totalContributions: number;
  };
  commitContributionsByRepository: CommitContribution[];
  pullRequestContributions: {
    nodes: PullRequestNode[];
  };
  issueContributions: {
    nodes: IssueNode[];
  };
}

// The root interface for the entire GraphQL response.
export interface GitHubActivityResponse {
  user: {
    contributionsCollection: ContributionsCollection;
  } | null; // User can be null if not found
}

export interface PinnedRepoResponse {
  user: {
    pinnedItems: {
      nodes: Array<{
        name: string;
        description: string;
        stargazerCount: number;
        forkCount: number;
        url: string;
        primaryLanguage: {
          name: string;
          color: string;
        } | null;
      }>;
    };
  }
}
