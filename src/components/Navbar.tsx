"use client";

import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  const navLinks = () => {
    if (session) {
      return (
        <div className="flex items-center space-x-4">
          <Link href="/auth/dashboard" className="text-blue-400 hover:underline">
            Dashboard
          </Link>
          <Link href="/auth/links" className="text-blue-400 hover:underline">
            Links
          </Link>
        </div>
      );
    }
    return (
      <Link href="/login" className="text-blue-400 hover:underline">
        Login
      </Link>
    );
  }

  return (
    <nav className="container mx-auto px-4 py-2 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-blue-400">CodeCred</Link>
      {navLinks()}
      <LogoutButton />
    </nav>
  );
}
