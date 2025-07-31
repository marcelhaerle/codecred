"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"
import { ChevronDown, ChevronUp, User } from "lucide-react";

export default function AuthHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Close the dropdown if the user navigates to a different page
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/auth/dashboard" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-800">
            <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          CodeCred
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/auth/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
          <Link href="/auth/links" className="text-gray-400 hover:text-white transition-colors">Links</Link>
          <Link href="/auth/rss" className="text-gray-400 hover:text-white transition-colors">RSS</Link>
          <Link href="/auth/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link>
        </nav>
        <div className="relative group">
          <button
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            onClick={() => setOpen(!open)}
          >
            {session?.user.name}
            {open ? <ChevronUp /> : <ChevronDown />}
          </button>
          <div
            className="absolute right-0 mt-4 z-10 w-60 bg-gray-800 rounded-md shadow-lg px-4 py-4 text-center"
            style={{ display: open ? 'block' : 'none' }}
          >
            <Link href="/auth/account" className="block px-4 py-2 text-white hover:bg-gray-700 rounded">
              <User className="inline mr-2" size={20} /> Account
            </Link>
            <hr className="my-4 border-gray-700" />
            <button className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded w-full" onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      </div>
    </header>
  );
}
