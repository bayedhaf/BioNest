// components/bio/LinkCard.tsx
import { ExternalLink } from 'lucide-react';

interface LinkCardProps {
  title: string;
  url: string;
  isActive: boolean;
}

export function LinkCard({ title, url, isActive }: LinkCardProps) {
  return (
    <div className={`w-full p-5 rounded-2xl border transition-all ${
      isActive 
        ? 'border-zinc-700 hover:border-emerald-500 bg-zinc-950' 
        : 'border-zinc-800 opacity-60'
    }`}>
      <div className="flex items-start justify-between ">
        <div>
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm  text-zinc-500 truncate max-w-md ">{url}</p>
        </div>
        {isActive && (
          <ExternalLink className="w-5 h-5 text-emerald-500 mt-1" />
        )}
      </div>
    </div>
  );
}