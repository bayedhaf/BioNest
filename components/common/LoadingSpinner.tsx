
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
  text?: string;
}

export default function LoadingSpinner({
  size = 'md',
  className,
  fullScreen = false,
  text = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-zinc-700 border-t-emerald-500',
          sizeClasses[size]
        )}
      />
      {text && <p className="text-sm text-zinc-400">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-zinc-950/90 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return <div className={cn('flex items-center justify-center py-8', className)}>{spinner}</div>;
}