import BlockRenderer from "@/components/BlockRenderer";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { PrismaClient } from "@/generated/prisma";
import { getProfile } from "@/lib/profile";

const prisma = new PrismaClient();

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  const profile = await getProfile(username);

  if (!user || !profile) {
    return (
      <div className="w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      height: "100vh",
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
        {profile && profile.blocks.map((block) => <BlockRenderer key={block.id} username={profile.username} block={block} theme={profile.theme} />)}
      </div>
    </div >

  );
}
