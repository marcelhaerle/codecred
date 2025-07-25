import { GithubPinnedReposBlock, GithubActivityBlock, LinksBlock, Theme, RssFeedBlock, ProjectShowcaseBlock, BlockWithData } from "@/types/custom";
import LinksBlockRenderer from "./LinksBlockRenderer";
import GitHubPinnedReposBlockRenderer from "./GithubPinnedReposBlockRenderer";
import GitHubActivityBlockRenderer from "./GithubActivityBlockRenderer";
import RssFeedBlockRenderer from "./RssFeedBlockRenderer";
import ProjectShowcaseBlockRenderer from "./ProjectShowcaseBlockRenderer";

export default function BlockRenderer({ block, theme }: { block: BlockWithData, theme: Theme }) {
  const renderBlock = (block: BlockWithData) => {
    switch (block.type) {
      case 'LINKS':
        const linksBlock = block as LinksBlock;
        return <LinksBlockRenderer data={block.data} block={linksBlock} theme={theme} />;
      case 'GITHUB_PINNED_REPOS':
        const githubBlock = block as GithubPinnedReposBlock;
        return (
          <GitHubPinnedReposBlockRenderer data={block.data} block={githubBlock} theme={theme} />
        );
      case 'GITHUB_ACTIVITY':
        const githubActivityBlock = block as GithubActivityBlock;
        return (
          <GitHubActivityBlockRenderer data={block.data} block={githubActivityBlock} theme={theme} />
        );
      case 'RSS_FEED':
        const rssFeedBlock = block as RssFeedBlock;
        return (
          <RssFeedBlockRenderer data={block.data} block={rssFeedBlock} theme={theme} />
        );
      case 'PROJECT_SHOWCASE':
        const projectShowcaseBlock = block as ProjectShowcaseBlock;
        return (
          <ProjectShowcaseBlockRenderer data={block.data} block={projectShowcaseBlock} theme={theme} />
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
