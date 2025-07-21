"use client";

import { signIn } from "next-auth/react";
import { Star, Layers, RefreshCw, ShieldCheck, Check, Zap, Globe, EyeOff, BarChart2, Headphones, Github, Rss, LayoutTemplate, Palette } from 'lucide-react';


export default function MarketingSections() {
  const callbackUrl = "/auth/dashboard";

  return (
    <>
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 text-center relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.2),rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-6 relative">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 text-white">Your Link-in-Bio is Now a <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Live Dev Portfolio.</span></h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400 mb-8">
            Stop just listing links. Showcase your real-time GitHub activity, latest tech articles, and project showcases with dynamic, automated content blocks. Built for developers, by developers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="#pricing" className="w-full sm:w-auto bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-blue-500/20 text-lg">
              Claim Your Profile
            </a>
            <a href="https://github.com/marcelhaerle/codecred" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-gray-800/50 hover:bg-gray-800 border border-gray-700 text-gray-300 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Star us on GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">A Standard &quot;Link-in-Bio&quot; Doesn&apos;t Show You&apos;re a Builder.</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-400">
            Generic link tools are built for influencers, not engineers. They let you list URLs, but they can&apos;t answer the questions that matter to clients and recruiters: &quot;What have you built?&quot;, &quot;How do you think?&quot;, and &quot;What&apos;s your real expertise?&quot;
          </p>
          <p className="max-w-3xl mx-auto text-lg text-gray-400 mt-4">
            Your professional identity is more than a list of social media profiles. It&apos;s your code, your projects, and your insights. It&apos;s time for a tool that understands that.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4"><span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Introducing Dynamic</span> Content Blocks.</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-400">
              CodeCred transforms your profile from a static list into a living dashboard of your professional identity. Instead of just links, you build your page with powerful, automated blocks that pull data directly from the sources of truth.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/10 text-blue-400 rounded-full p-3 mb-4 border border-blue-500/20">
                <Layers className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Show, Don&apos;t Just Tell</h3>
              <p className="text-gray-400">Automatically display your latest contributions and projects.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/10 text-blue-400 rounded-full p-3 mb-4 border border-blue-500/20">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Always Up-to-Date</h3>
              <p className="text-gray-400">Your profile syncs in real-time. No more manual updates.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-500/10 text-blue-400 rounded-full p-3 mb-4 border border-blue-500/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Prove Your Authority</h3>
              <p className="text-gray-400">Let your work speak for itself with verifiable, data-driven evidence.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-gray-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">The Blocks That Build Your Reputation.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-800/50 hover:bg-gray-800">
              <div className="flex items-center gap-4 mb-3">
                <Github className="w-8 h-8 text-blue-800" />
                <h3 className="text-2xl font-bold text-white">Live GitHub Showcase</h3>
              </div>
              <p className="text-gray-400">Display your contribution graph, pinned repositories with live star/fork counts, and recent activity. Let your GitHub profile do the talking.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-800/50 hover:bg-gray-800">
              <div className="flex items-center gap-4 mb-3">
                <Rss className="w-8 h-8 text-blue-800" />
                <h3 className="text-2xl font-bold text-white">Tech Blog Aggregator</h3>
              </div>
              <p className="text-gray-400">Connect your RSS feed or link your Dev.to, Hashnode, or Medium profile to automatically display your most recent articles.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-800/50 hover:bg-gray-800">
              <div className="flex items-center gap-4 mb-3">
                <LayoutTemplate className="w-8 h-8 text-blue-800" />
                <h3 className="text-2xl font-bold text-white">Project Showcase</h3>
              </div>
              <p className="text-gray-400">Create rich project cards with descriptions, tech stack tags, and links to both the live site and the source code.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 transition-all duration-300 hover:border-blue-800/50 hover:bg-gray-800">
              <div className="flex items-center gap-4 mb-3">
                <Palette className="w-8 h-8 text-blue-800" />
                <h3 className="text-2xl font-bold text-white">Full Customization</h3>
              </div>
              <p className="text-gray-400">Choose from developer-centric themes like Dracula and Solarized, or use custom CSS to create a truly unique design.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="open-source" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4">Transparent, Trustworthy, and <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Built for You to Hack On.</span></h2>
            <p className="text-lg text-gray-400 mb-8">We believe you should own your professional identity. That&apos;s why CodeCred&apos;s core is fully open source.</p>
            <div className="grid sm:grid-cols-3 gap-8 mb-10 text-left">
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-white text-lg mb-1">Total Transparency</h4>
                <p className="text-gray-400">Inspect the code and know exactly how it works.</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-white text-lg mb-1">Ultimate Customization</h4>
                <p className="text-gray-400">Fork the project, add your own blocks, and create something unique.</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-lg">
                <h4 className="font-semibold text-white text-lg mb-1">Self-Host for Free</h4>
                <p className="text-gray-400">Want complete control? Host CodeCred on your own server. Forever.</p>
              </div>
            </div>
            <a href="https://github.com/marcelhaerle/codecred" target="_blank" rel="noopener noreferrer" className="bg-white hover:bg-gray-200 text-gray-950 font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 inline-flex items-center gap-2">
              <i className="w-5 h-5">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.906.614a3.4 3.4 0 0 0-.896.127c-.955.262-1.824.76-2.646 1.302a13.7 13.7 0 0 0-6.807-.002A11 11 0 0 0 6.71 1.016C6.136.78 5.526.585 4.899.622c-.113.01-.263.013-.315.135a5.8 5.8 0 0 0-.422 1.737 4.8 4.8 0 0 0 .223 1.923 5.4 5.4 0 0 0-1.36 3.053c-.05.453-.036.91-.015 1.365-.934-.237-1.93-.278-2.867-.035-.11.025-.174.16-.128.261.036.092.146.14.238.111.912-.232 1.881-.177 2.783.074q.045.412.107.821c-.798-.196-1.635-.093-2.42.11-.14.033-.18.238-.071.328.083.08.205.04.303.015.74-.18 1.536-.258 2.275-.027.072.248.13.5.226.741l.316.715c.321.63.806 1.167 1.365 1.596a6.8 6.8 0 0 0 1.73.942c.727.277 1.49.449 2.258.571a3.3 3.3 0 0 0-.376.498 3.2 3.2 0 0 0-.335.795c-.43.007-.865.05-1.288-.045a1.95 1.95 0 0 1-.864-.452 3.6 3.6 0 0 1-.62-.739 1 1 0 0 0-.618-.43.73.73 0 0 0-.57.11.67.67 0 0 0-.256.406c-.051.221-.011.452.059.665.122.365.351.687.626.954.485.467 1.089.799 1.726 1.006.535.17 1.112.257 1.667.143-.003.99.003 1.979-.003 2.968-.024.232-.134.45-.28.628-.1.128-.23.231-.377.301-.128.056-.268.102-.362.212a.43.43 0 0 0-.097.422.41.41 0 0 0 .265.25c.148.05.306.039.46.036.45-.013.907-.1 1.306-.318.55-.294.95-.897.925-1.532-.002-.679-.022-1.357-.032-2.036-.003-.385-.018-.771.016-1.155.028 1.009.034 2.019.054 3.028.002.324-.001.654-.09.97a1.8 1.8 0 0 1-.365.682c-.098.12-.226.22-.295.362-.06.114-.07.26.001.37.084.143.254.197.409.22.33.041.657-.073.95-.218a2.16 2.16 0 0 0 .86-.783c.209-.338.308-.736.316-1.13.01-.584.008-1.167.017-1.75.035-.297.021-.596.028-.894.005.175.003.35.004.525-.027.534-.003 1.07-.004 1.604.01.31-.013.624.049.93.062.324.195.636.398.897.234.3.551.53.902.678.294.123.63.204.943.105.156-.044.296-.18.3-.35.003-.169-.105-.312-.22-.427a1.87 1.87 0 0 1-.524-1.36V18.47c.004-.27-.012-.54.014-.809.049.405.034.814.033 1.22.004.733-.003 1.466.004 2.2.015.41.18.822.48 1.108.346.337.824.5 1.295.565q.36.05.719.026c.182-.016.37-.137.408-.324.039-.176-.059-.355-.2-.457-.093-.075-.215-.095-.318-.153-.292-.16-.5-.451-.588-.77-.045-.138-.022-.284-.028-.426.001-.89-.007-1.782.008-2.672.483.097.983.043 1.455-.084a4.6 4.6 0 0 0 1.794-.94c.334-.29.618-.651.761-1.073.068-.205.11-.426.068-.641a.7.7 0 0 0-.233-.414.72.72 0 0 0-.583-.137 1 1 0 0 0-.632.431c-.206.314-.445.612-.744.841a1.9 1.9 0 0 1-.718.346c-.43.103-.876.059-1.314.051a3.9 3.9 0 0 0-.72-1.269c-.032-.022.018-.042.036-.041 1.228-.18 2.453-.528 3.514-1.188a5.15 5.15 0 0 0 1.638-1.593 3 3 0 0 0 .21-.383c.096-.214.203-.423.285-.644a8 8 0 0 0 .218-.725c.661-.228 1.38-.193 2.057-.057q.187.037.375.084c.07.017.154.017.21-.036.104-.084.073-.278-.054-.323-.81-.218-1.677-.314-2.5-.104a9 9 0 0 0 .109-.792c0-.031.038-.032.06-.041.903-.252 1.874-.306 2.788-.073.12.038.227-.057.263-.165v-.037c-.031-.073-.074-.156-.16-.173-.956-.246-1.971-.197-2.92.052.038-.68.033-1.37-.125-2.037a5.5 5.5 0 0 0-1.251-2.399c.386-1.133.283-2.39-.134-3.499-.04-.105-.07-.249-.204-.27q-.15-.03-.3-.032" />
                </svg>
              </i>
              Explore the Code on GitHub
            </a>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">Simple, Transparent Pricing.</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto items-stretch">
            <div className="bg-gray-800 border border-gray-800 rounded-2xl p-8 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-white">Free</h3>
              <p className="text-gray-400 mt-2 mb-6">For hobbyists and developers who want full control.</p>
              <div className="text-4xl font-extrabold text-white mb-6">$0 <span className="text-xl font-medium text-gray-400">/ forever</span></div>
              <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  All core features
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  All dynamic blocks
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  Host on your own infrastructure
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  Community support
                </li>
              </ul>
              <a href="https://github.com/marcelhaerle/codecred" target="_blank" rel="noopener noreferrer" className="w-full text-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Get Started</a>
            </div>

            <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <div className="bg-blue-800 text-white text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</div>
              </div>
              <h3 className="text-2xl font-bold text-white">Starter</h3>
              <p className="text-gray-400 mt-2 mb-6">Students, hobbyists, or developers who want a live profile without the hassle of self-hosting.</p>
              <div className="text-4xl font-extrabold text-white mb-6">~$3 <span className="text-xl font-medium text-gray-400">/ month</span></div>
              <ul className="space-y-4 text-gray-300 mb-8 flex-grow">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  All features of the Free plan, plus:
                </li>
                <li className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Managed Hosting (No setup)
                </li>
                <li className="flex items-center gap-3">
                  <EyeOff className="w-5 h-5 text-blue-400" />
                  Remove &quot;Powered by&quot; branding
                </li>
              </ul>
              <button onClick={() => signIn("github", { callbackUrl })} className="w-full text-center bg-blue-800 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">Start Now</button>
            </div>

            <div className="bg-gray-800 border rounded-2xl p-8 flex flex-col h-full relative border-blue-800 shadow-2xl shadow-blue-500/10">
              <h3 className="text-2xl font-bold text-white">Pro</h3>
              <p className="text-gray-400 mt-2 mb-6">For the professional freelancer, consultant, or job-seeker.</p>
              <div className="text-4xl font-extrabold text-white mb-6">~$7 <span className="text-xl font-medium text-gray-400">/ month</span></div>
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
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">Ready to Build a Profile That <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">Truly Represents You?</span></h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
            Spend less time convincing people you&apos;re a great developer and more time doing great work. Create your dynamic portfolio in minutes.
          </p>
          <button onClick={() => signIn("github", { callbackUrl })} className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-4 px-10 rounded-lg transition-transform hover:scale-105 shadow-lg shadow-blue-500/20 text-xl">
            Get Started with CodeCred
          </button>
        </div>
      </section>
    </>
  );
}