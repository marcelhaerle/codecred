import { GithubPinnedReposBlock, GithubActivityBlock, LinksBlock, ProfileBlock, Theme, RssFeedBlock } from "@/types/custom";
import LinksBlockRenderer from "./LinksBlockRenderer";
import GitHubPinnedReposBlockRenderer from "./GithubPinnedReposBlockRenderer";
import GitHubActivityBlockRenderer from "./GithubActivityBlockRenderer";
import RssFeedBlockRenderer from "./RssFeedBlockRenderer";

export default function BlockRenderer({ username, block, theme }: { username: string, block: ProfileBlock, theme: Theme }) {
  const renderBlock = (block: ProfileBlock) => {
    switch (block.type) {
      case 'LINKS':
        const linksBlock = block as LinksBlock;
        return <LinksBlockRenderer username={username} block={linksBlock} theme={theme} />;
      case 'GITHUB_PINNED_REPOS':
        const githubBlock = block as GithubPinnedReposBlock;
        return (
          <GitHubPinnedReposBlockRenderer username={username} block={githubBlock} theme={theme} />
        );
      case 'GITHUB_ACTIVITY':
        const githubActivityBlock = block as GithubActivityBlock;
        return (
          <GitHubActivityBlockRenderer username={username} block={githubActivityBlock} theme={theme} />
        );
      case 'RSS_FEED':
        const rssFeedBlock = block as RssFeedBlock;
        return (
          <RssFeedBlockRenderer username={username} block={rssFeedBlock} theme={theme} />
        );
      default:
        return null;
    }
  }

  return (
    <div
      className="w-full p-4"
      style={{
        color: theme.colors.blockText,
        backgroundColor: theme.blocks.style === "filled" ? theme.colors.blockBackground : "transparent",
        border: theme.blocks.style === "outline" ? `1px solid ${theme.colors.blockBackground}` : "none",
        borderRadius: theme.blocks.cornerRadius === "sharp" ? "2px" : "8px",
        padding: "16px",
        boxShadow: theme.blocks.shadow === "none" ? "none" : theme.blocks.shadow === "subtle" ? "0 1px 2px rgba(0, 0, 0, 0.1)" : theme.blocks.shadow === "medium" ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: theme.layout.verticalGap + "px",
      }}
    >
      {renderBlock(block)}
    </div>
  );
};
