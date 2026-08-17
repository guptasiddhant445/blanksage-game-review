'use client';

import React from 'react';
import { Award, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { ReviewSummary } from '../domain/types';

interface GameHeaderProps {
  summary: ReviewSummary;
  domainType: 'chess' | 'blanksage-quiz';
  onToggleDomain: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  summary,
  domainType,
  onToggleDomain,
}) => {
  const whiteAcc = summary.whitePlayer?.accuracy || summary.accuracyPercentage;
  const blackAcc = summary.blackPlayer?.accuracy || summary.opponentAccuracyPercentage || 70.0;

  return (
    <header className="flex flex-col gap-4 w-full bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl">
      {/* Top Row: App Branding & Domain Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              BlankSage Review
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-normal">
                {domainType === 'chess' ? 'Chess Game Review' : 'Student Assessment Review'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              {summary.title}
            </p>
          </div>
        </div>

        {/* Domain Extensibility Switcher Toggle */}
        <button
          onClick={onToggleDomain}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 text-xs font-semibold transition-all shadow active:scale-95"
          title="Switch Domain Model (Chess vs BlankSage Quiz)"
        >
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>
            Mode: {domainType === 'chess' ? 'Switch to Quiz Demo' : 'Switch to Chess Review'}
          </span>
        </button>
      </div>

      {/* Accuracy & Player Summary Bar */}
      {domainType === 'chess' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* White Player */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-300 shadow-sm" />
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {summary.whitePlayer?.name || 'White'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Rating: {summary.whitePlayer?.rating || 2650}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400 font-mono">
                {whiteAcc}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Accuracy</div>
            </div>
          </div>

          {/* Black Player */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded bg-slate-900 border border-slate-600 shadow-sm" />
              <div>
                <div className="text-xs font-bold text-slate-200">
                  {summary.blackPlayer?.name || 'Black'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Rating: {summary.blackPlayer?.rating || 2100}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-blue-400 font-mono">
                {blackAcc}%
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Accuracy</div>
            </div>
          </div>
        </div>
      )}

      {/* Key Takeaway Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300">
        <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200">Key Takeaway: </span>
          <span className="text-slate-300 leading-relaxed">{summary.keyTakeaway}</span>
        </div>
      </div>
    </header>
  );
};
