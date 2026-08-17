'use client';

import React from 'react';
import { AlertTriangle, BookOpen, Check, CheckCircle2, HelpCircle, Sparkles, XCircle } from 'lucide-react';
import { EVALUATION_SIGNALS } from '../domain/evaluationMeta';
import { ReviewItem } from '../domain/types';

interface ReviewFeedbackCardProps {
  item?: ReviewItem;
}

export const ReviewFeedbackCard: React.FC<ReviewFeedbackCardProps> = ({ item }) => {
  if (!item) {
    return (
      <div className="flex items-center justify-center p-6 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-500 text-xs">
        Select a move to view review feedback
      </div>
    );
  }

  const signalMeta = EVALUATION_SIGNALS[item.signal] || EVALUATION_SIGNALS.good;

  const renderIcon = () => {
    switch (item.signal) {
      case 'best':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />;
      case 'great':
        return <Sparkles className="w-5 h-5 text-blue-400" aria-hidden="true" />;
      case 'book':
        return <BookOpen className="w-5 h-5 text-amber-400" aria-hidden="true" />;
      case 'inaccuracy':
        return <HelpCircle className="w-5 h-5 text-yellow-400" aria-hidden="true" />;
      case 'mistake':
        return <AlertTriangle className="w-5 h-5 text-orange-400" aria-hidden="true" />;
      case 'blunder':
        return <XCircle className="w-5 h-5 text-red-400" aria-hidden="true" />;
      default:
        return <Check className="w-5 h-5 text-emerald-300" aria-hidden="true" />;
    }
  };

  // Format pawn score evaluation (+1.4, -2.5, +M1)
  const formattedScore = item.score !== undefined
    ? item.score >= 90
      ? 'Mate'
      : item.score > 0
      ? `+${item.score.toFixed(1)}`
      : item.score.toFixed(1)
    : null;

  return (
    <article
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Review feedback for ${item.title}`}
      className="flex flex-col p-5 bg-slate-900/90 rounded-xl border border-slate-800 shadow-xl gap-3 transition-all"
    >
      {/* Top Bar: Move title, classification pill & eval score */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          {renderIcon()}
          <div>
            <h2 className="text-sm font-bold text-white block">
              {item.title}
            </h2>
            {item.subtitle && (
              <span className="text-[11px] text-slate-400 font-mono">
                {item.subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Classification Pill */}
        <div
          aria-label={`Classification: ${signalMeta.label}`}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${signalMeta.badgeBg}`}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: signalMeta.color }}
            aria-hidden="true"
          />
          <span className={`text-xs font-semibold uppercase tracking-wider ${signalMeta.badgeText}`}>
            {signalMeta.label}
          </span>
        </div>
      </div>

      {/* Narrative Explanation Message */}
      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
        {item.explanation}
      </p>

      {/* Engine Best Move Recommendation (if applicable) */}
      {item.bestAlternative && (
        <div className="mt-2 p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-xs">
          <span className="text-emerald-400 font-bold font-mono shrink-0">💡 Recommendation:</span>
          <span className="text-slate-300">
            Engine prefers <strong className="text-emerald-300 font-mono px-1 bg-emerald-950/60 rounded border border-emerald-800/40">{item.bestAlternative}</strong>
          </span>
        </div>
      )}

      {/* Evaluation Score indicator */}
      {formattedScore && (
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400 font-mono">
          <span>Engine Evaluation:</span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">
            {formattedScore}
          </span>
        </div>
      )}
    </article>
  );
};
