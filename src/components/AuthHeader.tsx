"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import LogoutButton from "./LogoutButton";

export default function AuthHeader() {
  const { data: session } = useSession();

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
          <Link href={`/p/${session?.user.username}`} className="text-gray-400 hover:text-white transition-colors flex group">Profile</Link>
        </nav>
        <LogoutButton username={session?.user.name} />
      </div>
    </header>
  );
}
