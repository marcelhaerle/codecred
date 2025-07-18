
import { LinksEditor } from "@/components/LinksEditor";
import { getLinks } from "@/lib/links";

export default async function LinksPage() {
  const links = await getLinks();

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Your Links</h1>
      <LinksEditor links={links} />
    </div>
  );
}
