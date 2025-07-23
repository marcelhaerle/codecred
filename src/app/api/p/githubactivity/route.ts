import { GitHubActivityResponse } from "@/types/github";
import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

  try {
    const res = await octokit.graphql<GitHubActivityResponse>(ActivityQuery, {
      username: username,
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("Could not resolve to a User")) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Error fetching GitHub data" }, { status: 500 });
  }
}
