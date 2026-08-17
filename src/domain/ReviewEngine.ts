/**
 * Generic Review Engine State Machine
 * Encapsulates navigation, bounds checking, and review item access
 */

import { NavigationState, ReviewAdapter, ReviewItem, ReviewSummary } from './types';

export class ReviewEngine<T = unknown> {
  private adapter: ReviewAdapter<T>;
  private currentIndex: number = 0;

  constructor(adapter: ReviewAdapter<T>, initialIndex: number = 0) {
    this.adapter = adapter;
    this.currentIndex = Math.max(0, Math.min(initialIndex, this.getTotalSteps() - 1));
  }

  public getSummary(): ReviewSummary {
    return this.adapter.getSummary();
  }

  public getItems(): ReviewItem<T>[] {
    return this.adapter.getItems();
  }

  public getCurrentItem(): ReviewItem<T> | undefined {
    return this.adapter.getItemAt(this.currentIndex);
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getTotalSteps(): number {
    return this.adapter.getItems().length;
  }

  public getNavigationState(): NavigationState {
    const total = this.getTotalSteps();
    return {
      currentIndex: this.currentIndex,
      totalSteps: total,
      hasNext: this.currentIndex < total - 1,
      hasPrevious: this.currentIndex > 0,
      isFirst: this.currentIndex === 0,
      isLast: this.currentIndex === total - 1,
    };
  }

  public goToStep(index: number): ReviewItem<T> | undefined {
    const target = Math.max(0, Math.min(index, this.getTotalSteps() - 1));
    this.currentIndex = target;
    return this.getCurrentItem();
  }

  public nextStep(): ReviewItem<T> | undefined {
    if (this.currentIndex < this.getTotalSteps() - 1) {
      this.currentIndex++;
    }
    return this.getCurrentItem();
  }

  public previousStep(): ReviewItem<T> | undefined {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    return this.getCurrentItem();
  }

  public firstStep(): ReviewItem<T> | undefined {
    this.currentIndex = 0;
    return this.getCurrentItem();
  }

  public lastStep(): ReviewItem<T> | undefined {
    this.currentIndex = Math.max(0, this.getTotalSteps() - 1);
    return this.getCurrentItem();
  }
}
