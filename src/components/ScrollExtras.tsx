import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface Props {
  isUrdu: boolean;
}

/** Thin progress bar at the top + a "back to top" button. */
export const ScrollExtras: React.FC<Props> = ({ isUrdu }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-sky-400"
          style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
        />
      </div>

      {progress > 12 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={isUrdu ? 'اوپر جائیں' : 'Back to top'}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-zinc-900/80 text-white border border-white/10 backdrop-blur-md shadow-lg hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer animate-in"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
};
