# Process Artifact 4: Trade-Off Notes & Debugging Decisions

**Location**: `/docs/process/04_tradeoffs_and_debugging_decisions.md`  
**Compliance Requirement**: Section 6 — *Notes showing important trade-offs, rejected approaches, or debugging decisions.*

---

## 1. Important Trade-Offs Made

### Trade-Off 1: Precomputed & Annotated Dataset vs. Heavy Stockfish WASM Engine
- **Rejected Approach**: Integrating Stockfish via WebAssembly to calculate engine evaluations live in the browser.
- **Why Rejected**: Section 7 of the PRD explicitly advises: *"A polished, reliable review experience backed by sensible mock/precomputed data is preferable to an unfinished engine-heavy implementation."* Stockfish WASM introduces multi-megabyte downloads, web worker threading overhead, and high battery/CPU usage.
- **Chosen Approach**: Built a precomputed, human-annotated dataset for Morphy's 1858 Opera Game with rich narrative explanations, quality classifications, and engine recommendations. Used `react-chessboard` for high-performance board rendering and custom square highlighting.

### Trade-Off 2: Generic `ReviewItem<T>` Domain Abstraction vs. Hardcoded Chess UI
- **Rejected Approach**: Tightly coupling React components (`MoveList`, `ReviewFeedbackCard`) directly to chess move objects (`ChessMovePayload`).
- **Why Rejected**: Section 4.3 of the PRD requires the architecture to support replacing chess moves with BlankSage student assessment questions without a rewrite.
- **Chosen Approach**: Created `ReviewItem<T>` and `ReviewAdapter<T>` abstractions, allowing the exact same review shell to render both Chess Review and BlankSage Student Quiz Review.

### Trade-Off 3: Discriminated Unions & Strongly Typed Hooks vs. Mixed `ReviewAdapter<any>`
- **Rejected Approach**: Passing a loosely typed `ReviewAdapter<any>` union into `useReviewEngine<any>` and casting items via `as ChessReviewItem`.
- **Why Rejected**: Compromised TypeScript credibility and type safety.
- **Chosen Approach**: Refactored `page.tsx` to instantiate strongly typed domain engine hooks (`useReviewEngine<ChessMovePayload>` and `useReviewEngine<QuizQuestionPayload>`), ensuring 100% type safety with zero `any` types and zero type assertions.

### Trade-Off 4: Minimal Dependency Stack vs. Package Bloat
- **Rejected Approach**: Keeping unused libraries like `chess.js`, `clsx`, and `tailwind-merge` in `package.json`.
- **Why Rejected**: PRD Section 4.1 requires understanding and justifying important dependencies, while PRD Section 4.2 mandates removing unused code and dependencies.
- **Chosen Approach**: Pruned `chess.js`, `clsx`, and `tailwind-merge` from `package.json`. Retained only 5 runtime dependencies (`next`, `react`, `react-dom`, `react-chessboard`, `lucide-react`), each with explicit justification.

---

## 2. Key Debugging Decisions & Root Cause Analysis

### Debugging Decision 1: Domain Switcher Runtime TypeError & Non-Zero Index Clamping
- **Symptom**: User received runtime error `TypeError: Cannot read properties of undefined (reading 'map')` in `QuizReviewView.tsx (36:28)` when clicking "Mode: Switch to Quiz Demo" while on move index 25 in the 33-move Chess game.
- **Root Cause Analysis**:
  1. The user was on move index 25 in the 33-move Morphy Chess Game.
  2. Clicking the mode switcher toggled `domainType` to `'blanksage-quiz'` (which only has 4 questions).
  3. `useReviewEngine`'s internal `adapter` state was not updated when `initialAdapter` parameter changed, OR `currentIndex` stayed at 25.
  4. `quizAdapter.getItemAt(25)` returned `undefined`, causing `item.payload.options` to be `undefined`, throwing a `TypeError` when calling `.map()`.
- **Fix Implemented**:
  1. Added `useEffect` in `useReviewEngine.ts` to reset `currentIndex` to `0` and update `adapter` state whenever `initialAdapter` changes.
  2. Added index bounds clamping in `ReviewEngine` constructor (`Math.min(initialIndex, totalSteps - 1)`).
  3. Added defensive array checks in `QuizReviewView.tsx` (`if (!item || !item.payload || !Array.isArray(item.payload.options))`) to prevent crashes during state transitions.
  4. Added dedicated Vitest unit test verifying non-zero index domain switching safety.

---

## 3. Verification & Compliance Matrix

| Requirement / Test Case | Verification Tool | Result |
| :--- | :--- | :--- |
| Zero `any` Types | Codebase Scan | Passed (0 `any` in logic) |
| Zero Unused Packages | `npm install` audit | Passed (Removed 3 unused packages) |
| Unit Test Suite (8 tests) | `vitest run` | Passed (8/8 tests green) |
| Non-Zero Index Domain Switching | Vitest Unit Test #5 | Passed (Clamps index safely) |
| Fresh Clone Build | `npm run build` in temp dir | Passed (4/4 static pages) |
| Accessibility (a11y) | ARIA & Focus Audit | Passed (aria-live, toolbar, focus-ring) |
