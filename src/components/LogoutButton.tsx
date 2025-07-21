"use client";

import { signOut } from "next-auth/react"

export default function LogoutButton({ username }: { username?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-white">Hi, {username}</div>
      <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded" onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
