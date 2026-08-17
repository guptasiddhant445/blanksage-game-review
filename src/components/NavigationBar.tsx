'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { NavigationState } from '../domain/types';

interface NavigationBarProps {
  navigationState: NavigationState;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
  className?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  navigationState,
  onFirst,
  onPrevious,
  onNext,
  onLast,
  className = '',
}) => {
  const { currentIndex, totalSteps, hasPrevious, hasNext, isFirst, isLast } = navigationState;

  // Keyboard shortcut listener (← ArrowLeft, → ArrowRight)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key events when user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        if (hasPrevious) onPrevious();
      } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        event.preventDefault();
        if (hasNext) onNext();
      } else if (event.key === 'Home') {
        event.preventDefault();
        if (!isFirst) onFirst();
      } else if (event.key === 'End') {
        event.preventDefault();
        if (!isLast) onLast();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasPrevious, hasNext, isFirst, isLast, onPrevious, onNext, onFirst, onLast]);

  return (
    <div className={`flex flex-col items-center gap-2 w-full ${className}`}>
      {/* Navigation Button Controls */}
      <div
        role="toolbar"
        aria-label="Move step navigation controls"
        className="flex items-center justify-center gap-2 w-full max-w-[420px] bg-slate-900/90 p-2 rounded-xl border border-slate-800 shadow-lg"
      >
        <button
          onClick={onFirst}
          disabled={!hasPrevious}
          aria-disabled={!hasPrevious}
          aria-label="First move (Home key)"
          className="flex items-center justify-center w-12 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-all border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
          title="Start of Review (Home)"
        >
          <ChevronsLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          aria-disabled={!hasPrevious}
          aria-label="Previous move (Left Arrow or A key)"
          className="flex items-center justify-center flex-1 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 font-medium transition-all border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95 gap-1"
          title="Previous Move (← Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          <span className="hidden sm:inline text-xs">Prev</span>
        </button>

        {/* Counter indicator */}
        <div
          aria-label={`Step ${totalSteps > 0 ? currentIndex + 1 : 0} of ${totalSteps}`}
          className="px-3 py-1 bg-slate-950 rounded-md border border-slate-800 text-center min-w-[70px]"
        >
          <span className="text-xs font-mono font-semibold text-slate-200">
            {totalSteps > 0 ? currentIndex + 1 : 0}
          </span>
          <span className="text-xs text-slate-500 font-mono"> / {totalSteps}</span>
        </div>

        <button
          onClick={onNext}
          disabled={!hasNext}
          aria-disabled={!hasNext}
          aria-label="Next move (Right Arrow or D key)"
          className="flex items-center justify-center flex-1 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:opacity-40 text-white font-medium transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-95 gap-1"
          title="Next Move (→ Right Arrow)"
        >
          <span className="hidden sm:inline text-xs">Next</span>
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          onClick={onLast}
          disabled={!hasNext}
          aria-disabled={!hasNext}
          aria-label="Last move (End key)"
          className="flex items-center justify-center w-12 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-200 transition-all border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
          title="End of Review (End)"
        >
          <ChevronsRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Keyboard Shortcut Hint */}
      <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">←</kbd>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">→</kbd>
        Use arrow keys to navigate moves
      </span>
    </div>
  );
};
