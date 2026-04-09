import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 font-sans">
      
     
      <nav className="border-b border-zinc-800/50 fixed w-full z-50 bg-zinc-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
               
<Link href="/" className="flex items-center gap-0 group"> 
  <div className="relative flex items-center justify-center">
  
    <div className="relative h-20 w-20 -mr-2 flex items-center justify-center transition-all duration-300">
      <Image 
        src="/uploads/logo33.png" 
        alt="BioNest Logo" 
        fill
        priority
        className="object-contain brightness-150 contrast-125 group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]"
      />
    </div>
  </div>

  <div className="flex flex-col leading-none">
    <span className="text-2xl font-bold tracking-tighter text-white group-hover:text-emerald-400 transition-all duration-300">
      BioNest
    </span>
  
  </div>
</Link>

          {/* Action Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-900">
                Log in
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full px-6 shadow-lg shadow-emerald-900/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <section className="pt-48 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 mb-10 hover:border-emerald-500/30 transition-colors cursor-default">
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" /> 
          <span className="text-sm font-semibold text-zinc-300">
            Early Access — <span className="text-emerald-400 font-bold">April 2026</span>
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1] bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Your links.<br />
          <span className="text-emerald-500">Your safe nest.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          The professional home for your digital identity. Consolidate your media, audience, and analytics in one clean space.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link href="/sign-up">
            <Button 
              size="lg" 
              className="bg-white hover:bg-emerald-50 text-black text-lg px-12 h-16 rounded-2xl font-bold shadow-2xl transition-all hover:-translate-y-1"
            >
              Build your BioNest 
              <ArrowRight className="ml-3 w-5 h-5 text-emerald-600" />
            </Button>
          </Link>

          <Link href="/discover">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 text-lg px-12 h-16 rounded-2xl text-zinc-300 transition-all"
            >
              Explore Hubs
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}