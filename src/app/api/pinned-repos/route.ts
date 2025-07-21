import { Octokit } from "@octokit/core";
import { NextResponse } from "next/server";

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

interface PinnedRepoResponse {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ message: "Missing username parameter" }, { status: 400 });
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

  try {
    const { user } = await octokit.graphql<PinnedRepoResponse>(PinnedReposQuery, {
      username: username,
    });

    return NextResponse.json(user.pinnedItems.nodes);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (errorMessage.includes("Could not resolve to a User")) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Error fetching GitHub data" }, { status: 500 });
  }
}
