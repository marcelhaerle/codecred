"use client";

import { BarChart2, Check, Globe, Headphones } from "lucide-react";

export default function ProPlanSubscription() {
  return (
    <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
      <h3 className="text-2xl font-bold text-white">Pro</h3>
      <p className="text-gray-400 mt-2 mb-6">For the professional freelancer, consultant, or job-seeker.</p>
      <div className="text-4xl font-extrabold text-white mb-6">~&euro;7 <span className="text-xl font-medium text-gray-400">/ month</span></div>
      <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
        <li className="flex items-center gap-3">
          <Check className="w-5 h-5 text-green-500" />
          All features of the Starter plan, plus:
        </li>
        <li className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-blue-400" />
          Use your own custom domain
        </li>
        <li className="flex items-center gap-3">
          <BarChart2 className="w-5 h-5 text-blue-400" />
          Advanced Analytics
        </li>
        <li className="flex items-center gap-3">
          <Headphones className="w-5 h-5 text-blue-400" />
          Priority Support
        </li>
      </ul>
      <span className="w-full text-center bg-gray-400 text-gray-200 font-bold py-3 px-6 rounded-lg">Coming Soon</span>
    </div>
  );
}
