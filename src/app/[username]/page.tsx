import BlockRenderer from "@/components/BlockRenderer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { getProfile } from "@/lib/profile";
import { BlockWithData } from "@/types/custom";
import { env } from "process";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/blocks?username=${username}`);
  const blocksWithData: BlockWithData[] = await res.json();

  const profile = await getProfile(username);

  if (!profile) {
    return (
      <div className="w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      height: "100%",
      minHeight: "100vh",
      backgroundColor: profile.theme.colors.pageBackground,
      padding: "2rem 0",
    }}>
      <div style={{
        maxWidth:
          profile.theme.layout.contentWidth === "standard"
            ? "840px"
            : "960px",
        margin: "0 auto",
        padding: "16px",
        backgroundColor: profile.theme.colors.pageBackground,
      }}>
        <ProfileHeader profile={profile} />
        {profile && blocksWithData.map((block) => <BlockRenderer key={block.id} block={block} theme={profile.theme} />)}
      </div>
    </div >
  );
}
