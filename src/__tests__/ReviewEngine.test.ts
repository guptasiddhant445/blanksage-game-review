/**
 * Comprehensive domain unit test suite for ReviewEngine state machine
 */

import { describe, expect, it } from 'vitest';
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

  it('should safely clamp initial non-zero index to valid upper bounds', () => {
    const adapter = new ChessReviewAdapter();
    // Engine automatically clamps initialIndex 999 to max index 32 (totalSteps - 1)
    const clampedEngine = new ReviewEngine(adapter, 999);
    expect(clampedEngine.getCurrentIndex()).toBe(32);
    expect(clampedEngine.getCurrentItem()?.payload.san).toBe('Rd8#');

    clampedEngine.firstStep();
    expect(clampedEngine.getCurrentIndex()).toBe(0);
    expect(clampedEngine.getCurrentItem()?.payload.san).toBe('e4');
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
