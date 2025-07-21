import GitHubBlock from "@/components/GithubBlock";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const username = (await params).username;

  return (
    <div className="w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome to the profile of {username}!</h1>
      <GitHubBlock username={username} />
    </div>
  );
}
