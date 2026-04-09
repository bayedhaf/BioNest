import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, Search, LifeBuoy, Hash, TrendingUp } from 'lucide-react'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center px-6 py-20 text-center selection:bg-emerald-500/30">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-300/10 via-transparent to-transparent pointer-events-none" />

      {/* 404 Header */}
      <div className="relative mb-8">
        <h1 className="text-[8rem] md:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-emerald-400 to-emerald-900 opacity-20 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-8xl md:text-9xl font-extrabold text-emerald-400 drop-shadow-[0_0_35px_rgba(52,211,153,0.5)] flex items-center gap-2">
            4<span className="opacity-50 inline-block animate-pulse">0</span>4
          </div>
        </div>
      </div>

      {/* Main Message */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
          This link hasn't been <span className="text-emerald-400">BioNest</span> yet.
        </h2>
        <p className="text-zinc-400 text-2xl md:text-xl mb-10 leading-relaxed">
          The page you're looking for doesn't exist or has <br className="hidden md:block"/> 
          been moved to a deeper layer of the nest.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link href="/">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-full px-8 h-14 text-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105">
              <Home className="mr-2 w-5 h-5" /> Back to Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant="outline" className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 text-white font-bold rounded-full px-8 h-14 text-lg backdrop-blur-sm transition-all">
              <Search className="mr-2 w-5 h-5" /> Search Creators
            </Button>
          </Link>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left">
          <Card className="bg-zinc-900/40 border-zinc-800/50 p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
            <LifeBuoy className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Need help?</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our nest guardians are always ready to guide you back.
            </p>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800/50 p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
            <Hash className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Status Code</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Link reference 404: Not found in the BioNest registry.
            </p>
          </Card>

          <Card className="bg-zinc-900/40 border-zinc-800/50 p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-colors">
            <TrendingUp className="w-6 h-6 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Trending</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Check out the most popular active creators this week.
            </p>
          </Card>
        </div>
      </div>

      {/* Footer text like the screenshot */}
      <div className="mt-20 text-zinc-600 text-xs uppercase tracking-[0.3em]">
        © 2026 BioNest • Built for the Digital Identity
      </div>
    </div>
  );
}