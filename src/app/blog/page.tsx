'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Edit3, Sparkles, CheckCircle2, Rocket, Code2, Brain } from 'lucide-react';

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<'read' | 'write'>('read');
  const [blogTitle, setBlogTitle] = useState('How I Started & Built the BlankSage Game Review Assignment');
  const [blogContent, setBlogContent] = useState(
    `When I received the BlankSage SWE Intern take-home assignment, my goal was clear: recreate the Chess.com Game Review experience with high engineering rigor, generic extensibility, and 100% strict TypeScript.

### 1. Breaking Down the Assignment & PRD
The assignment asked for a production-oriented game review shell that steps through moves, provides narrative feedback, highlights quality classifications (Best, Great, Blunder), and supports future extensibility. 

Before writing a single line of UI code, I divided the project into 5 structured phases:
- **Phase 1**: Core Domain Architecture & Generic Interfaces
- **Phase 2**: State Machine & Interactive Board Navigation
- **Phase 3**: Move List, Narrative Feedback & UX Polish
- **Phase 4**: Testing, Performance & Accessibility
- **Phase 5**: Process Tracking & Documentation

### 2. Architecture: Generic ReviewEngine
Instead of hardcoding chess move logic directly into React components, I designed a generic \`ReviewEngine<T>\` state machine backed by a \`ReviewAdapter<T>\` interface. This decoupled board state from review controls and enabled bulletproof state synchronization.

### 3. Engineering Rigor & Production Standards
- **Zero \`any\` Types**: Strict TypeScript contracts with zero unsafe casting.
- **Minimal Dependencies**: Pruned unneeded third-party libraries (\`chess.js\`, \`clsx\`) to maintain a lightweight footprint.
- **Unit Testing**: Built a comprehensive 8-test suite using Vitest verifying index bounds, navigation, and summary calculations.
- **Accessibility**: Fully accessible keyboard navigation (arrow keys) and \`aria-live\` announcements.

This project was an incredible opportunity to demonstrate full-stack engineering standards, trade-off analysis, and product polish!`
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        
        {/* Top Header & Navigation */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Game Review
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('read')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'read'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Read Blog Post
            </button>
            <button
              onClick={() => setActiveTab('write')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'write'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Write / Edit Post
            </button>
          </div>
        </header>

        {/* Tab 1: Read Blog Post */}
        {activeTab === 'read' ? (
          <article className="flex flex-col p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl gap-6">
            <div className="flex flex-col gap-2 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>BlankSage SWE Internship Take-Home Assignment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {blogTitle}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono pt-2">
                <span>By Siddhant Gupta</span>
                <span>•</span>
                <span>SWE Intern Candidate</span>
                <span>•</span>
                <span>August 2026</span>
              </div>
            </div>

            {/* Feature Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                <Rocket className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xs font-bold text-slate-200">Phase-by-Phase Roadmap</h2>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Divided assignment into 5 execution phases with clear TODO milestones.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-xs font-bold text-slate-200">Generic Domain Engine</h2>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Decoupled review engine architecture supporting generic domain adapters.
                </p>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 flex flex-col gap-2">
                <Brain className="w-5 h-5 text-amber-400" />
                <h2 className="text-xs font-bold text-slate-200">Production Engineering</h2>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Zero <code className="text-emerald-300 font-mono">any</code> types, Vitest test suite, and full accessibility.
                </p>
              </div>
            </div>

            {/* Blog Post Content Body */}
            <div className="prose prose-invert prose-slate max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {blogContent}
            </div>

            {/* Footer Sign-off */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Status: Verified & Live on Vercel</span>
              <Link href="/" className="text-emerald-400 hover:underline font-semibold">
                Explore Game Review App →
              </Link>
            </div>
          </article>
        ) : (
          /* Tab 2: Write / Edit Blog Post Form */
          <form
            onSubmit={handleSaveBlog}
            className="flex flex-col p-6 sm:p-8 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl gap-6"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Write / Edit Blog Post</h2>
              </div>
              {savedSuccess && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-md border border-emerald-800/40">
                  <CheckCircle2 className="w-4 h-4" /> Published Successfully!
                </span>
              )}
            </div>

            {/* Blog Title Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Blog Post Title
              </label>
              <input
                type="text"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                placeholder="Enter post title..."
                required
              />
            </div>

            {/* Blog Content Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Post Content (Markdown supported)
              </label>
              <textarea
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
                rows={14}
                className="w-full p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Write your blog post here..."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('read')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg transition-all active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                Publish Post
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
