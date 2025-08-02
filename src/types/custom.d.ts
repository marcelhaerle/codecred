export interface BaseBlock {
  id: string;
  type: 'LINK' | 'GITHUB_PINNED_REPOS' | 'GITHUB_ACTIVITY';
  name: string;
}

export interface LinksBlock extends BaseBlock {
  type: 'LINKS';
  name: "Links";
  header: string;
}

export interface GithubPinnedReposBlock extends BaseBlock {
  type: 'GITHUB_PINNED_REPOS';
  name: "Pinned Repositories";
  limit: number;
}

export interface GithubActivityBlock extends BaseBlock {
  type: 'GITHUB_ACTIVITY';
  name: "GitHub Activity";
  limit: number;
}

export interface RssFeedBlock extends BaseBlock {
  type: 'RSS_FEED';
  name: "RSS Feed";
  limit: number;
}

export interface ProjectShowcaseBlock extends BaseBlock {
  type: 'PROJECT_SHOWCASE';
  name: "Project Showcase";
}

export type ProfileBlock = LinksBlock | GithubPinnedReposBlock | GithubActivityBlock | RssFeedBlock | ProjectShowcaseBlock;

export type BlockWithData =
  | LinksBlock & { data: ProfileLink[] }
  | GithubPinnedReposBlock & { data: PinnedRepo[] }
  | GithubActivityBlock & { data: ContributionsCollection | null }
  | RssFeedBlock & { data: Article[] }
  | ProjectShowcaseBlock & { data: Project[] };

export interface ProfileLink {
  title: string;
  url: string;
}

export interface Theme {
  id: string;
  name: string;
  description?: string; // Optional description for the theme

  // --- 1. Colors ---
  // The foundational color palette for the page.
  // All colors should be valid CSS color strings (e.g., hex, rgb).
  colors: {
    pageBackground: string;
    primaryText: string;
    secondaryText: string;
    blockBackground: string;
    blockText: string;
    accent: string; // Used for buttons and highlights
  };

  // --- 2. Typography ---
  // Controls the text styles.
  typography: {
    // A curated list of Google Fonts.
    fontFamily: 'Inter' | 'JetBrains Mono' | 'Source Code Pro' | 'Roboto Mono' | 'Fira Code';
    // Font weight for the main headings (e.g., user's name).
    headingWeight: '400' | '500' | '600' | '700' | '800';
    // Font weight for the body text (e.g., bio, block text).
    bodyWeight: '400' | '500' | '600';
    // Font sizes for different text elements.
    // These can be mapped to Tailwind classes (e.g., 'text-2xl') or rem values.
    headingSize: '2xl' | '3xl' | '4xl'; // For the user's name
    bodySize: 'sm' | 'base' | 'lg'; // For the bio
    blockTextSize: 'sm' | 'base'; // For text inside content blocks
  };

  // --- 3. Block Styles ---
  // Defines the appearance of the content blocks.
  blocks: {
    // The visual style of the blocks.
    style: 'filled' | 'outline';
    // The roundness of the block corners.
    cornerRadius: 'sharp' | 'rounded'; // Corresponds to 0px, 8px
    // The drop shadow effect on the blocks.
    shadow: 'none' | 'subtle' | 'medium' | 'strong';
  };

  // --- 4. Layout ---
  // Controls the spacing and structure of the page.
  layout: {
    // The vertical space between each block in pixels.
    verticalGap: number;
    // The maximum width of the content area.
    contentWidth: 'standard' | 'wide'; // Corresponds to e.g., 840px, 960px
  };

  // --- 5. Profile ---
  // Controls the styling of the main profile elements.
  profile: {
    avatar: {
      shape: 'circle' | 'square';
      size: 'small' | 'medium' | 'large'; // Corresponds to e.g., 96px, 128px, 196px
      borderWidth: number; // in pixels
      borderColor: string; // CSS color string (can use 'accent' or a custom value)
    };
  };
}

export interface Profile {
  username: string;
  name: string;
  bio?: string;
  image?: string;
  theme: Theme;
  blocks: ProfileBlock[];
}

export interface PinnedRepo {
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

export interface RssFeed {
  id: string;
  url: string;
  lastFetchedAt: Date | null;
}

export interface Article {
  title: string;
  link: string;
  pubDate: string; // ISO date string
  snippet?: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  techStack: string[];
  displayOrder: number;
}

export interface Account {
  id: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  email: string;
  username: string;
  name?: string;
  bio?: string;
  image?: string;
  scheduledForDeletion?: string | null; // If the account is scheduled for deletion, this will be the date
}
