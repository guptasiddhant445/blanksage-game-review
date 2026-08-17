/**
 * Sample BlankSage Student Assessment Dataset
 * Demonstrates domain extensibility (Section 4.3 of PRD)
 */

import { ReviewItem, ReviewSummary } from '../domain/types';

export interface QuizQuestionPayload {
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  selectedOptionId: string;
  correctOptionId: string;
  topic: string;
  timeSpentSeconds: number;
}

export type QuizReviewItem = ReviewItem<QuizQuestionPayload>;

export const QUIZ_SUMMARY: ReviewSummary = {
  id: 'quiz-react-fe-2026',
  title: 'BlankSage Assessment Review: React & State Architecture',
  subtitle: 'Midterm Engineering Evaluation • 5 Questions',
  accuracyPercentage: 80.0,
  keyTakeaway: 'Great grasp of component composition, but review state mutation rules and useEffect cleanup functions.',
  signalCounts: {
    best: 3,
    great: 1,
    good: 0,
    book: 0,
    inaccuracy: 0,
    mistake: 1,
    blunder: 0,
  },
};

export const QUIZ_REVIEW_ITEMS: QuizReviewItem[] = [
  {
    id: 'q-1',
    stepIndex: 1,
    title: 'Q1: React State Immutability',
    subtitle: 'State Management',
    signal: 'best',
    score: 100,
    explanation: 'Correct! You used functional state updates with spread operator to avoid direct state mutation.',
    payload: {
      questionText: 'Which approach is correct when updating an array state in React?',
      options: [
        { id: 'a', text: 'items.push(newItem); setItems(items);', isCorrect: false },
        { id: 'b', text: 'setItems(prev => [...prev, newItem]);', isCorrect: true },
        { id: 'c', text: 'items[items.length] = newItem;', isCorrect: false },
      ],
      selectedOptionId: 'b',
      correctOptionId: 'b',
      topic: 'React State',
      timeSpentSeconds: 24,
    },
  },
  {
    id: 'q-2',
    stepIndex: 2,
    title: 'Q2: useEffect Dependencies',
    subtitle: 'React Hooks',
    signal: 'mistake',
    score: 0,
    explanation: 'Mistake: Omitting `fetchData` from dependency array can cause stale closures during re-renders.',
    bestAlternative: 'Option C: Wrap `fetchData` in `useCallback` and include it in the dependency array.',
    payload: {
      questionText: 'What happens if a custom function referenced in `useEffect` is omitted from the dependency array?',
      options: [
        { id: 'a', text: 'React automatically tracks all outer variables.', isCorrect: false },
        { id: 'b', text: 'It may cause stale closures and capture outdated props/state values.', isCorrect: true },
        { id: 'c', text: 'React throws a fatal runtime error.', isCorrect: false },
      ],
      selectedOptionId: 'a',
      correctOptionId: 'b',
      topic: 'Hooks & Effects',
      timeSpentSeconds: 45,
    },
  },
  {
    id: 'q-3',
    stepIndex: 3,
    title: 'Q3: Custom Hooks Separation',
    subtitle: 'Architecture',
    signal: 'best',
    score: 100,
    explanation: 'Excellent! Extracting domain state into custom hooks keeps UI components presentation-only.',
    payload: {
      questionText: 'What is the primary benefit of custom hooks in React architecture?',
      options: [
        { id: 'a', text: 'To render UI elements faster.', isCorrect: false },
        { id: 'b', text: 'To encapsulate reusable stateful logic separately from presentation.', isCorrect: true },
        { id: 'c', text: 'To replace global context providers.', isCorrect: false },
      ],
      selectedOptionId: 'b',
      correctOptionId: 'b',
      topic: 'Architecture',
      timeSpentSeconds: 18,
    },
  },
  {
    id: 'q-4',
    stepIndex: 4,
    title: 'Q4: TypeScript Generics',
    subtitle: 'TypeScript',
    signal: 'great',
    score: 100,
    explanation: 'Well reasoned! Generic constraints ensure type safety without forcing unsafe type assertions (`any`).',
    payload: {
      questionText: 'How should generic parameters be constrained when working with review items?',
      options: [
        { id: 'a', text: 'Use `ReviewItem<unknown>` everywhere.', isCorrect: false },
        { id: 'b', text: 'Use type parameter `ReviewItem<T = unknown>` with explicit domain payload interfaces.', isCorrect: true },
        { id: 'c', text: 'Cast all payloads using `as unknown as TargetType`.', isCorrect: false },
      ],
      selectedOptionId: 'b',
      correctOptionId: 'b',
      topic: 'TypeScript',
      timeSpentSeconds: 30,
    },
  },
];
