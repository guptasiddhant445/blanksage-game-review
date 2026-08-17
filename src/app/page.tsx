'use client';

import React, { useMemo, useState } from 'react';
import { ChessReviewAdapter } from '../chess/ChessReviewAdapter';
import { ChessMovePayload } from '../chess/types';
import { ChessboardView } from '../components/ChessboardView';
import { GameHeader } from '../components/GameHeader';
import { MoveList } from '../components/MoveList';
import { NavigationBar } from '../components/NavigationBar';
import { ReviewFeedbackCard } from '../components/ReviewFeedbackCard';
import { useReviewEngine } from '../hooks/useReviewEngine';

export default function GameReviewPage() {
  const chessAdapter = useMemo(() => new ChessReviewAdapter(), []);
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');

  // Strongly typed review engine (100% strict TypeScript, zero 'any', zero type casting)
  const chessEngine = useReviewEngine<ChessMovePayload>(chessAdapter);

  const handleFlipBoard = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Game Header */}
        <GameHeader summary={chessEngine.summary} />

        {/* Main Review Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Board & Navigation Bar */}
          <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
            <ChessboardView
              fen={chessEngine.currentItem?.payload.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'}
              orientation={boardOrientation}
              lastMove={chessEngine.currentItem?.payload}
              signal={chessEngine.currentItem?.signal}
              onFlipBoard={handleFlipBoard}
            />
            <NavigationBar
              navigationState={chessEngine.navigationState}
              onFirst={chessEngine.firstStep}
              onPrevious={chessEngine.previousStep}
              onNext={chessEngine.nextStep}
              onLast={chessEngine.lastStep}
            />
          </div>

          {/* Right Column: Review Feedback & Move List */}
          <div className="lg:col-span-5 flex flex-col gap-4 w-full">
            <ReviewFeedbackCard item={chessEngine.currentItem} />
            <MoveList
              items={chessAdapter.getItems()}
              currentIndex={chessEngine.currentIndex}
              onSelectMove={chessEngine.goToStep}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
