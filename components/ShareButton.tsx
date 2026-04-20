'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for very old browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors active:scale-95"
    >
      <Share2 className="w-3 h-3" />
      <span className="font-medium">{copied ? '✅ Copied!' : 'Share profile'}</span>
    </button>
  );
}