'use client';

import React, { useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { ChessMovePayload } from '../chess/types';
import { EVALUATION_SIGNALS } from '../domain/evaluationMeta';
import { EvaluationSignal } from '../domain/types';

interface ChessboardViewProps {
  fen: string;
  orientation?: 'white' | 'black';
  lastMove?: ChessMovePayload;
  signal?: EvaluationSignal;
  onFlipBoard?: () => void;
}

export const ChessboardView: React.FC<ChessboardViewProps> = ({
  fen,
  orientation = 'white',
  lastMove,
  signal,
  onFlipBoard,
}) => {
  // Highlight squares for last move
  const customSquareStyles = useMemo(() => {
    if (!lastMove) return {};
    const styles: Record<string, React.CSSProperties> = {};

    const highlightColor = signal ? EVALUATION_SIGNALS[signal]?.color || '#96bc4b' : '#96bc4b';

    // From square highlight
    styles[lastMove.from] = {
      backgroundColor: `${highlightColor}35`,
    };

    // To square highlight
    styles[lastMove.to] = {
      backgroundColor: `${highlightColor}70`,
    };

    return styles;
  }, [lastMove, signal]);

  const signalMeta = signal ? EVALUATION_SIGNALS[signal] : undefined;

  return (
    <div className="relative flex flex-col items-center w-full max-w-[540px]">
      {/* Move Quality Badge floating on top right of board */}
      {signalMeta && lastMove && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900/90 border border-slate-700/80 shadow-lg backdrop-blur-md transition-all">
          <span
            className="w-2.5 h-2.5 rounded-full shadow"
            style={{ backgroundColor: signalMeta.color }}
          />
          <span className={`text-xs font-semibold uppercase tracking-wider ${signalMeta.badgeText}`}>
            {signalMeta.label}
          </span>
          <span className="text-xs text-slate-400 font-mono pl-1 border-l border-slate-700">
            {lastMove.san}
          </span>
        </div>
      )}

      {/* Board Container */}
      <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-900">
        <Chessboard
          position={fen}
          boardOrientation={orientation}
          customSquareStyles={customSquareStyles}
          arePiecesDraggable={false}
          customBoardStyle={{
            borderRadius: '6px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
          }}
          customDarkSquareStyle={{ backgroundColor: '#779952' }}
          customLightSquareStyle={{ backgroundColor: '#edeed1' }}
        />
      </div>

      {/* Board Utilities Bar */}
      <div className="flex items-center justify-between w-full mt-3 px-1 text-xs text-slate-400">
        <span className="font-mono text-slate-400">
          FEN: <span className="text-slate-400 font-mono text-[11px] truncate max-w-[280px] inline-block align-bottom">{fen}</span>
        </span>
        {onFlipBoard && (
          <button
            onClick={onFlipBoard}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
            title="Flip Board Orientation"
          >
            🔄 Flip Board
          </button>
        )}
      </div>
    </div>
  );
};
