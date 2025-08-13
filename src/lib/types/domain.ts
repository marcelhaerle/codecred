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
