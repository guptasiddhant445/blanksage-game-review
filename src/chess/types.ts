/**
 * Chess-Specific Domain Types
 */

import { ReviewItem, ReviewSummary } from '../domain/types';

export interface ChessMovePayload {
  san: string;            // e.g. "Nf3", "e4", "Bxd5+"
  fen: string;            // Board position after move
  previousFen: string;    // Board position before move
  moveNumber: number;     // 1, 2, 3...
  color: 'w' | 'b';       // 'w' or 'b'
  piece: string;          // 'p', 'n', 'b', 'r', 'q', 'k'
  from: string;           // 'e2'
  to: string;             // 'e4'
  captured?: string;      // 'p', etc.
  promotion?: string;
  isCheck?: boolean;
  isCheckmate?: boolean;
  evalScore: number;      // Pawn evaluation (+0.5, -1.2)
  engineBestMove?: string; // e.g. "d4"
}

export type ChessReviewItem = ReviewItem<ChessMovePayload>;

export interface ChessGameSummary extends ReviewSummary {
  pgn: string;
  event: string;
  site: string;
  date: string;
  round: string;
  whitePlayer: { name: string; rating: number; accuracy: number };
  blackPlayer: { name: string; rating: number; accuracy: number };
  result: '1-0' | '0-1' | '1/2-1/2';
}
