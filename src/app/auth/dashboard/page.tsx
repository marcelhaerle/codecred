import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GitHubBlock from "@/components/GithubBlock";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile Preview</h1>
      <div className="mt-12">
        <GitHubBlock username={session?.user?.username} />
      </div>
    </div>
  );
}
