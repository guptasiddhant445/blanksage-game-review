import { useCallback, useEffect, useMemo, useState } from 'react';
import { ReviewAdapter, ReviewItem, ReviewSummary, NavigationState } from '../domain/types';
import { ReviewEngine } from '../domain/ReviewEngine';

export interface UseReviewEngineResult<T = unknown> {
  currentItem: ReviewItem<T> | undefined;
  navigationState: NavigationState;
  summary: ReviewSummary;
  currentIndex: number;
  totalSteps: number;
  goToStep: (index: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  firstStep: () => void;
  lastStep: () => void;
  switchAdapter: (newAdapter: ReviewAdapter<T>) => void;
  adapter: ReviewAdapter<T>;
}

export function useReviewEngine<T = unknown>(
  initialAdapter: ReviewAdapter<T>,
  initialIndex: number = 0
): UseReviewEngineResult<T> {
  const [adapter, setAdapter] = useState<ReviewAdapter<T>>(initialAdapter);
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  // Sync adapter state and reset step index when initialAdapter changes
  useEffect(() => {
    setAdapter(initialAdapter);
    setCurrentIndex(0);
  }, [initialAdapter]);

  const engine = useMemo(() => {
    return new ReviewEngine<T>(adapter, currentIndex);
  }, [adapter, currentIndex]);

  const currentItem = useMemo(() => {
    return engine.getCurrentItem();
  }, [engine]);

  const navigationState = useMemo(() => {
    return engine.getNavigationState();
  }, [engine]);

  const summary = useMemo(() => {
    return engine.getSummary();
  }, [engine]);

  const goToStep = useCallback((index: number) => {
    const target = Math.max(0, Math.min(index, adapter.getItems().length - 1));
    setCurrentIndex(target);
  }, [adapter]);

  const nextStep = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, adapter.getItems().length - 1));
  }, [adapter]);

  const previousStep = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const firstStep = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const lastStep = useCallback(() => {
    setCurrentIndex(adapter.getItems().length - 1);
  }, [adapter]);

  const switchAdapter = useCallback((newAdapter: ReviewAdapter<T>) => {
    setAdapter(newAdapter);
    setCurrentIndex(0);
  }, []);

  return {
    currentItem,
    navigationState,
    summary,
    currentIndex,
    totalSteps: adapter.getItems().length,
    goToStep,
    nextStep,
    previousStep,
    firstStep,
    lastStep,
    switchAdapter,
    adapter,
  };
}
