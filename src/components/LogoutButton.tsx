"use client" // Add this for App Router

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function AuthButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-white">Hi, {session.user?.name}</div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <Link href="/login">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in
      </button>
    </Link>
  )
}
