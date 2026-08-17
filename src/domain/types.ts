/**
 * Core Domain Types for Generic Review Engine
 * Designed for BlankSage Evaluation Systems
 */

export type EvaluationSignal = 
  | 'best' 
  | 'great' 
  | 'good' 
  | 'inaccuracy' 
  | 'mistake' 
  | 'blunder' 
  | 'book';

export interface EvaluationSignalMeta {
  signal: EvaluationSignal;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  severity: number; // 0 = best, 5 = blunder
}

export interface ReviewItem<T = unknown> {
  id: string;
  stepIndex: number;
  title: string;          // e.g. "Move 14. Nf3" or "Question 4: React State"
  subtitle?: string;       // e.g. "White to move" or "Multiple Choice"
  payload: T;             // Domain-specific data (e.g. FEN, SAN, moves or quiz options)
  signal: EvaluationSignal;
  score?: number;         // Centipawns, win %, or points
  scoreDelta?: number;    // Change in evaluation/score
  explanation: string;    // Concise feedback / review message
  bestAlternative?: string; // Suggested better move/answer
  tags?: string[];        // e.g. ["Fork", "Tactic", "Opening"]
}

export interface NavigationState {
  currentIndex: number;
  totalSteps: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export interface ReviewSummary {
  id: string;
  title: string;
  subtitle: string;
  accuracyPercentage: number;
  opponentAccuracyPercentage?: number;
  playerColor?: 'white' | 'black';
  whitePlayer?: { name: string; rating: number; accuracy: number };
  blackPlayer?: { name: string; rating: number; accuracy: number };
  signalCounts: Record<EvaluationSignal, number>;
  keyTakeaway: string;
}

export interface ReviewAdapter<T = unknown> {
  id: string;
  name: string;
  domainType: 'chess' | 'blanksage-quiz';
  getSummary: () => ReviewSummary;
  getItems: () => ReviewItem<T>[];
  getItemAt: (index: number) => ReviewItem<T> | undefined;
}
