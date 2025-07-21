"use client";

import { signIn } from "next-auth/react";
import GithubIcon from "./GithubIcon";

export default function LoginPrompt() {
  const callbackUrl = "/auth/dashboard";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gray-950 p-6">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center items-center gap-3 mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-800">
            <path d="M7 8L3 12L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M17 16L21 12L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <h1 className="text-3xl font-bold tracking-tighter text-white">
            CodeCred
          </h1>
        </div>

        <p className="text-gray-400 mb-8">
          Welcome to your self-hosted CodeCred instance. Sign in to continue.
        </p>

        <button
          onClick={() => signIn("github", { callbackUrl })}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-gray-950 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-white"
        >
          <GithubIcon className="w-5 h-5" />
          Sign In with GitHub
        </button>
      </div>
    </div>
  );
}
