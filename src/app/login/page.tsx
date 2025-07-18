"use client";

import GithubIcon from "@/components/GithubIcon";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/auth/dashboard";

  return (
    <div className="flex mt-24 w-full items-center justify-center">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl shadow-gray-200 dark:bg-gray-800 dark:shadow-gray-900/50">

        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Login Required
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Please sign in to continue.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => signIn("github", { callbackUrl })}
            className="group flex w-full items-center justify-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-white transition-all duration-300 hover:bg-gray-700 hover:shadow-lg hover:-translate-y-0.5 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200"
          >
            <GithubIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Sign in with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}