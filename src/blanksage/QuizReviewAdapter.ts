/**
 * BlankSage Student Quiz Review Adapter
 * Demonstrates domain extensibility (Section 4.3 of PRD)
 */

import { ReviewAdapter, ReviewSummary } from '../domain/types';
import { QUIZ_REVIEW_ITEMS, QUIZ_SUMMARY, QuizQuestionPayload, QuizReviewItem } from './sampleQuiz';

export class QuizReviewAdapter implements ReviewAdapter<QuizQuestionPayload> {
  public id: string;
  public name: string;
  public domainType: 'blanksage-quiz' = 'blanksage-quiz';
  private summary: ReviewSummary;
  private items: QuizReviewItem[];

  constructor(
    summary: ReviewSummary = QUIZ_SUMMARY,
    items: QuizReviewItem[] = QUIZ_REVIEW_ITEMS
  ) {
    this.summary = summary;
    this.items = items;
    this.id = summary.id;
    this.name = summary.title;
  }

  public getSummary(): ReviewSummary {
    return this.summary;
  }

  public getItems(): QuizReviewItem[] {
    return this.items;
  }

  public getItemAt(index: number): QuizReviewItem | undefined {
    return this.items[index];
  }
}
