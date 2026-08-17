'use client';

import React, { useMemo, useState } from 'react';
import { QuizReviewAdapter } from '../blanksage/QuizReviewAdapter';
import { QuizQuestionPayload } from '../blanksage/sampleQuiz';
import { ChessReviewAdapter } from '../chess/ChessReviewAdapter';
import { ChessMovePayload } from '../chess/types';
import { ChessboardView } from '../components/ChessboardView';
import { GameHeader } from '../components/GameHeader';
import { MoveList } from '../components/MoveList';
import { NavigationBar } from '../components/NavigationBar';
import { QuizReviewView } from '../components/QuizReviewView';
import { ReviewFeedbackCard } from '../components/ReviewFeedbackCard';
import { useReviewEngine } from '../hooks/useReviewEngine';

export default function GameReviewPage() {
  const chessAdapter = useMemo(() => new ChessReviewAdapter(), []);
  const quizAdapter = useMemo(() => new QuizReviewAdapter(), []);

  const [domainType, setDomainType] = useState<'chess' | 'blanksage-quiz'>('chess');
  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');

  // Strongly typed review engines for each domain (Zero 'any', zero type casting)
  const chessEngine = useReviewEngine<ChessMovePayload>(chessAdapter);
  const quizEngine = useReviewEngine<QuizQuestionPayload>(quizAdapter);

  const handleToggleDomain = () => {
    setDomainType((prev) => (prev === 'chess' ? 'blanksage-quiz' : 'chess'));
  };

  const handleFlipBoard = () => {
    setBoardOrientation((prev) => (prev === 'white' ? 'black' : 'white'));
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* Game Header */}
        <GameHeader
          summary={domainType === 'chess' ? chessEngine.summary : quizEngine.summary}
          domainType={domainType}
          onToggleDomain={handleToggleDomain}
        />

        {/* Main Review Section */}
        {domainType === 'chess' ? (
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
        ) : (
          /* BlankSage Student Quiz Review View */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col items-center gap-4 w-full">
              <QuizReviewView item={quizEngine.currentItem} />
              <NavigationBar
                navigationState={quizEngine.navigationState}
                onFirst={quizEngine.firstStep}
                onPrevious={quizEngine.previousStep}
                onNext={quizEngine.nextStep}
                onLast={quizEngine.lastStep}
              />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4 w-full">
              <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-300">
                <h3 className="font-bold text-slate-100 mb-2">Quiz Questions</h3>
                <div className="space-y-1">
                  {quizAdapter.getItems().map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => quizEngine.goToStep(idx)}
                      className={`w-full text-left p-2 rounded transition-all flex items-center justify-between ${
                        idx === quizEngine.currentIndex
                          ? 'bg-slate-700 text-white font-bold'
                          : 'hover:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <span>{item.title}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {item.signal}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
