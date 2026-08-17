'use client';

import React from 'react';
import { QuizQuestionPayload } from '../blanksage/sampleQuiz';
import { ReviewItem } from '../domain/types';
import { ReviewFeedbackCard } from './ReviewFeedbackCard';

interface QuizReviewViewProps {
  item?: ReviewItem<QuizQuestionPayload>;
}

export const QuizReviewView: React.FC<QuizReviewViewProps> = ({ item }) => {
  if (!item || !item.payload || !Array.isArray(item.payload.options)) {
    return (
      <div className="flex items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-400 text-xs">
        Select a quiz question to view review feedback
      </div>
    );
  }

  const payload = item.payload;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Question Card */}
      <div className="p-6 bg-slate-900/90 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
            {payload.topic}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            ⏱️ {payload.timeSpentSeconds}s spent
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
          {payload.questionText}
        </h2>

        {/* Options List */}
        <div className="space-y-2 pt-2">
          {(payload.options || []).map((opt) => {
            const isSelected = opt.id === payload.selectedOptionId;
            const isCorrect = opt.isCorrect;

            let borderStyle = 'border-slate-800 bg-slate-950/60 text-slate-300';
            if (isSelected && isCorrect) {
              borderStyle = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200 font-semibold';
            } else if (isSelected && !isCorrect) {
              borderStyle = 'border-red-500/50 bg-red-950/30 text-red-200 font-semibold';
            } else if (isCorrect) {
              borderStyle = 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300 font-semibold';
            }

            return (
              <div
                key={opt.id}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-xs sm:text-sm transition-all ${borderStyle}`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center font-mono text-xs text-slate-400 uppercase font-bold shrink-0">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {isSelected && (
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${isCorrect ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}`}>
                    {isCorrect ? 'Selected (Correct)' : 'Selected (Incorrect)'}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Feedback Card */}
      <ReviewFeedbackCard item={item} />
    </div>
  );
};
