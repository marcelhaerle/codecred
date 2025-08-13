"use client";

import { LinksBlock, ProfileLink, Theme } from "@/lib/types";
import Link from "next/link";

interface LinksBlockRendererProps {
  block: LinksBlock;
  theme: Theme;
  data: ProfileLink[];
}

export default function LinksBlockRenderer({ data: links, block, theme }: LinksBlockRendererProps) {
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
