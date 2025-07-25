"use client";

import { useMemo } from 'react';
import { GitCommit, GitPullRequest, MessageSquare } from 'lucide-react';
import type { ContributionsCollection } from '@/types/github';
import GithubIcon from './GithubIcon';
import { GithubActivityBlock, Theme } from '@/types/custom';

/**
 * A unified type to represent any kind of activity item for easier rendering.
 */
type ActivityItem = {
  type: 'COMMIT' | 'PULL_REQUEST' | 'ISSUE';
  date: Date;
  title: string;
  url: string;
  repo: string;
};

/**
* A simple helper to format dates into a relative time string.
* In a real app, you might use a library like `date-fns`.
*/
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

interface GitHubActivityProps {
  block: GithubActivityBlock;
  theme: Theme;
  limit?: number;
  data: ContributionsCollection | null;
}

export default function GitHubActivityBlockRenderer({ data: contributions, block, theme }: GitHubActivityProps) {
  const recentActivities = useMemo<ActivityItem[]>(() => {
    if (!contributions) return [];

    const allActivities: ActivityItem[] = [];

    // Map commit contributions
    contributions.commitContributionsByRepository.forEach(repoContribution => {
      repoContribution.contributions.nodes.forEach(commit => {
        allActivities.push({
          type: 'COMMIT',
          date: new Date(commit.occurredAt),
          title: `${commit.commitCount} commit${commit.commitCount > 1 ? 's' : ''}`,
          url: repoContribution.repository.url || '#',
          repo: repoContribution.repository.nameWithOwner,
        });
      });
    });

    // Map pull request contributions
    contributions.pullRequestContributions.nodes.forEach(pr => {
      allActivities.push({
        type: 'PULL_REQUEST',
        date: new Date(pr.occurredAt),
        title: pr.pullRequest.title,
        url: pr.pullRequest.url,
        repo: pr.pullRequest.repository.nameWithOwner,
      });
    });

    // Map issue contributions
    contributions.issueContributions.nodes.forEach(issue => {
      allActivities.push({
        type: 'ISSUE',
        date: new Date(issue.occurredAt),
        title: issue.issue.title,
        url: issue.issue.url,
        repo: issue.issue.repository.nameWithOwner,
      });
    });

    // Sort all activities by date, descending, and take the latest ones.
    return allActivities
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, block.limit);

  }, [contributions, block]);

  if (!contributions) {
    return <div className="text-brand-gray-500">Could not load GitHub activity.</div>;
  }

  const totalContributions = contributions.contributionCalendar.totalContributions;

  const activityConfig = {
    COMMIT: {
      Icon: GitCommit,
      text: 'Committed to',
    },
    PULL_REQUEST: {
      Icon: GitPullRequest,
      text: 'Opened PR in',
    },
    ISSUE: {
      Icon: MessageSquare,
      text: 'Opened issue in',
    },
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: `1px solid ${theme.colors.blockText}` }}>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <GithubIcon className="w-5 h-5" />
          Recent GitHub Activity
        </h3>
        <div className="text-right">
          <p className="text-xl font-bold" style={{ color: theme.colors.accent }}>{totalContributions.toLocaleString()}</p>
          <p className="text-xs text-brand-gray-400">contributions this year</p>
        </div>
      </div>

      {/* Activity List */}
      <ul className="space-y-4">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => {
            const config = activityConfig[activity.type];
            return (
              <li key={index} className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0`} style={{ color: theme.colors.accent }}>
                  <config.Icon className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <p className="text-sm">
                    <span className="font-semibold">{config.text}</span>{' '}
                    <a href={`https://github.com/${activity.repo}`} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                      {activity.repo}
                    </a>
                  </p>
                  <a href={activity.url} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline truncate">
                    {activity.title}
                  </a>
                  <p className="text-xs mt-0" style={{ color: theme.colors.secondaryText }}>{formatRelativeTime(activity.date)}</p>
                </div>
              </li>
            );
          })
        ) : (
          <p className="text-center py-4">No recent public activity found.</p>
        )}
      </ul>
    </div>
  );
};
