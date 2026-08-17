'use client';

import React, { useEffect, useRef } from 'react';
import { ChessReviewItem } from '../chess/types';
import { EVALUATION_SIGNALS } from '../domain/evaluationMeta';

interface MoveListProps {
  items: ChessReviewItem[];
  currentIndex: number;
  onSelectMove: (index: number) => void;
}

export const MoveList: React.FC<MoveListProps> = ({
  items,
  currentIndex,
  onSelectMove,
}) => {
  const activeMoveRef = useRef<HTMLButtonElement | null>(null);

  // Auto-scroll active move into view
  useEffect(() => {
    if (activeMoveRef.current) {
      activeMoveRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentIndex]);

  // Group moves into pairs (White move, Black move)
  const movePairs = React.useMemo(() => {
    const pairs: { moveNumber: number; whiteIndex?: number; blackIndex?: number; white?: ChessReviewItem; black?: ChessReviewItem }[] = [];
    
    items.forEach((item, index) => {
      const moveNum = item.payload.moveNumber;
      let pair = pairs.find((p) => p.moveNumber === moveNum);
      
      if (!pair) {
        pair = { moveNumber: moveNum };
        pairs.push(pair);
      }

      if (item.payload.color === 'w') {
        pair.white = item;
        pair.whiteIndex = index;
      } else {
        pair.black = item;
        pair.blackIndex = index;
      }
    });

    return pairs;
  }, [items]);

  return (
    <nav
      aria-label="Move history navigation list"
      className="flex flex-col h-full bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl"
    >
      {/* Move List Header */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
          Move History
        </h3>
        <span className="text-xs text-slate-500 font-mono">
          {items.length} moves
        </span>
      </div>

      {/* Scrollable Move Pairs Table */}
      <div
        role="list"
        aria-label="Game moves list"
        className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[320px] sm:max-h-[420px]"
      >
        {movePairs.map((pair) => {
          const isWhiteActive = pair.whiteIndex === currentIndex;
          const isBlackActive = pair.blackIndex === currentIndex;

          const whiteMeta = pair.white ? EVALUATION_SIGNALS[pair.white.signal] : undefined;
          const blackMeta = pair.black ? EVALUATION_SIGNALS[pair.black.signal] : undefined;

          return (
            <div
              key={`move-pair-${pair.moveNumber}`}
              role="listitem"
              className="flex items-center text-xs font-mono rounded-lg hover:bg-slate-800/50 transition-colors p-1"
            >
              {/* Move Number */}
              <div className="w-10 text-slate-500 text-right pr-3 font-semibold select-none">
                {pair.moveNumber}.
              </div>

              {/* White Move */}
              <div className="flex-1 pr-1">
                {pair.white && pair.whiteIndex !== undefined && (
                  <button
                    ref={isWhiteActive ? activeMoveRef : null}
                    onClick={() => onSelectMove(pair.whiteIndex!)}
                    aria-label={`Move ${pair.moveNumber} White ${pair.white.payload.san}, ${whiteMeta?.label || ''}`}
                    aria-current={isWhiteActive ? 'step' : undefined}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isWhiteActive
                        ? 'bg-slate-700 text-white font-bold shadow border border-slate-600'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{pair.white.payload.san}</span>
                    {whiteMeta && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: whiteMeta.color }}
                        title={`${whiteMeta.label} (${pair.white.payload.san})`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )}
              </div>

              {/* Black Move */}
              <div className="flex-1 pl-1">
                {pair.black && pair.blackIndex !== undefined && (
                  <button
                    ref={isBlackActive ? activeMoveRef : null}
                    onClick={() => onSelectMove(pair.blackIndex!)}
                    aria-label={`Move ${pair.moveNumber} Black ${pair.black.payload.san}, ${blackMeta?.label || ''}`}
                    aria-current={isBlackActive ? 'step' : undefined}
                    className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      isBlackActive
                        ? 'bg-slate-700 text-white font-bold shadow border border-slate-600'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{pair.black.payload.san}</span>
                    {blackMeta && (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: blackMeta.color }}
                        title={`${blackMeta.label} (${pair.black.payload.san})`}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
