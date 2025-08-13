import { ProfileBlock, Theme } from "@/types/custom";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  username: string;
  bio: string;
  theme: Theme;
  blocks: ProfileBlock[];
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
}

export interface RssFeed {
  id: string;
  url: string;
  lastFetchedAt: Date | null;
}

export interface CachedArticle {
  title: string;
  link: string;
  pubDate: string;
  snippet: string | null;
  imageUrl: string | null;
}
