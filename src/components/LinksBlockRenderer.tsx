"use client";

import { LinksBlock, ProfileLink, Theme } from "@/types/custom";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LinksBlockRenderer({ username, block, theme }: { username: string, block: LinksBlock, theme: Theme }) {
  const [links, setLinks] = useState<ProfileLink[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch(`/api/p/links?username=${username}`);
      if (!response.ok) {
        console.error("Failed to fetch links");
        return;
      }
      const data = await response.json();
      setLinks(data);
    };

    fetchLinks();
  }, [username]);

  return (
    <>
      <h3 className="text-lg font-semibold mb-2">{block.header}</h3>
      <div className="flex items-center gap-3">
        {/* TODO Render link loading state */}
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="p-3 hover:underline"
            style={{
              color: theme.colors.accent,
            }}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </>
  );
}
