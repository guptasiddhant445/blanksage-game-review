/**
 * Comprehensive domain unit test suite for ReviewEngine state machine
 */

import { describe, expect, it } from 'vitest';
import { QuizReviewAdapter } from '../blanksage/QuizReviewAdapter';
import { ChessReviewAdapter } from '../chess/ChessReviewAdapter';
import { ReviewEngine } from '../domain/ReviewEngine';

describe('ReviewEngine Generic State Machine', () => {
  it('should initialize at index 0 by default', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);

    expect(engine.getCurrentIndex()).toBe(0);
    expect(engine.getNavigationState().isFirst).toBe(true);
    expect(engine.getNavigationState().hasPrevious).toBe(false);
    expect(engine.getNavigationState().hasNext).toBe(true);
  });

  it('should step forward and backward within valid bounds', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);

    const firstItem = engine.getCurrentItem();
    expect(firstItem?.stepIndex).toBe(1);

    const nextItem = engine.nextStep();
    expect(engine.getCurrentIndex()).toBe(1);
    expect(nextItem?.stepIndex).toBe(2);

    const prevItem = engine.previousStep();
    expect(engine.getCurrentIndex()).toBe(0);
    expect(prevItem?.stepIndex).toBe(1);
  });

  it('should not navigate out of bounds below 0 or past max items', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);

    engine.previousStep();
    expect(engine.getCurrentIndex()).toBe(0);

    engine.lastStep();
    const maxIndex = engine.getTotalSteps() - 1;
    expect(engine.getCurrentIndex()).toBe(maxIndex);

    engine.nextStep();
    expect(engine.getCurrentIndex()).toBe(maxIndex);
  });

  it('should seamlessly handle a BlankSage Quiz Review Adapter using generic engine contracts', () => {
    const quizAdapter = new QuizReviewAdapter();
    const engine = new ReviewEngine(quizAdapter);

    expect(engine.getSummary().id).toBe('quiz-react-fe-2026');
    expect(engine.getTotalSteps()).toBe(4);

    const item1 = engine.getCurrentItem();
    expect(item1?.signal).toBe('best');
    expect(item1?.payload.questionText).toContain('array state in React');

    engine.nextStep();
    const item2 = engine.getCurrentItem();
    expect(item2?.signal).toBe('mistake');
    expect(item2?.bestAlternative).toBeDefined();
  });

  it('should safely handle domain switching starting from a non-zero chess index (Item 6 requirement)', () => {
    // Start on chess game on move index 25 (out of 33 moves)
    const chessAdapter = new ChessReviewAdapter();
    const chessEngine = new ReviewEngine(chessAdapter, 25);
    expect(chessEngine.getCurrentIndex()).toBe(25);
    expect(chessEngine.getCurrentItem()?.payload.san).toBe('Rxd7');

    // Switch to Quiz adapter (which only has 4 items)
    const quizAdapter = new QuizReviewAdapter();
    // Engine automatically clamps initialIndex 25 to max index 3 (totalSteps - 1)
    const clampedQuizEngine = new ReviewEngine(quizAdapter, 25);
    expect(clampedQuizEngine.getCurrentIndex()).toBe(3);
    expect(clampedQuizEngine.getCurrentItem()?.id).toBe('q-4');
    expect(clampedQuizEngine.getCurrentItem()?.payload.questionText).toBeDefined();

    // Resetting to step 0 returns first quiz item safely
    clampedQuizEngine.firstStep();
    expect(clampedQuizEngine.getCurrentIndex()).toBe(0);
    expect(clampedQuizEngine.getCurrentItem()?.id).toBe('q-1');
  });

  it('should correctly expose summary metrics and accuracy breakdown', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);
    const summary = engine.getSummary();

    expect(summary.accuracyPercentage).toBe(94.2);
    expect(summary.whitePlayer?.name).toBe('Paul Morphy');
    expect(summary.blackPlayer?.accuracy).toBe(68.5);
    expect(summary.signalCounts.best).toBe(11);
    expect(summary.signalCounts.blunder).toBe(2);
  });

  it('should jump directly to any step via goToStep', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);

    // Jump to move 12 (Queenside castling O-O-O) at index 22
    const targetItem = engine.goToStep(22);
    expect(engine.getCurrentIndex()).toBe(22);
    expect(targetItem?.payload.san).toBe('O-O-O');
    expect(engine.getNavigationState().isFirst).toBe(false);
    expect(engine.getNavigationState().isLast).toBe(false);
  });

  it('should jump to firstStep and lastStep correctly', () => {
    const adapter = new ChessReviewAdapter();
    const engine = new ReviewEngine(adapter);

    engine.lastStep();
    expect(engine.getCurrentIndex()).toBe(32);
    expect(engine.getCurrentItem()?.payload.san).toBe('Rd8#');
    expect(engine.getNavigationState().isLast).toBe(true);

    engine.firstStep();
    expect(engine.getCurrentIndex()).toBe(0);
    expect(engine.getCurrentItem()?.payload.san).toBe('e4');
    expect(engine.getNavigationState().isFirst).toBe(true);
  });
});
