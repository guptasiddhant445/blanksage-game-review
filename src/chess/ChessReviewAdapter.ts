/**
 * Chess Review Adapter
 * Wraps chess game summary and annotated review items for the generic ReviewEngine
 */

import { ReviewAdapter, ReviewSummary } from '../domain/types';
import { OPERA_GAME_REVIEW_ITEMS, OPERA_GAME_SUMMARY } from './sampleGames';
import { ChessGameSummary, ChessMovePayload, ChessReviewItem } from './types';

export class ChessReviewAdapter implements ReviewAdapter<ChessMovePayload> {
  public id: string;
  public name: string;
  public domainType: 'chess' = 'chess';
  private summary: ChessGameSummary;
  private items: ChessReviewItem[];

  constructor(
    summary: ChessGameSummary = OPERA_GAME_SUMMARY,
    items: ChessReviewItem[] = OPERA_GAME_REVIEW_ITEMS
  ) {
    this.summary = summary;
    this.items = items;
    this.id = summary.id;
    this.name = summary.title;
  }

  public getSummary(): ReviewSummary {
    return this.summary;
  }

  public getItems(): ChessReviewItem[] {
    return this.items;
  }

  public getItemAt(index: number): ChessReviewItem | undefined {
    return this.items[index];
  }
}
