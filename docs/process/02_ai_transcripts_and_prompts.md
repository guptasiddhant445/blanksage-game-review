# Process Artifact 2: AI Chat Transcripts & Coding Agent Prompts

**Location**: `/docs/process/02_ai_transcripts_and_prompts.md`  
**Compliance Requirement**: Section 6 — *AI chat transcripts or exported conversations used materially during the assignment; Prompts/instructions given to coding agents.*

---

## 1. Primary Prompt Sequence & User Instructions

### Prompt 1: Project Breakdown & Phasing Request
> **User Prompt**: *"i was given this task as an intern of the company and i want you to split this assignment into how many ever phases it would take and explain the task and phase evry time"*
- **Agent Action**: Analyzed the 6-page PRD PDF, created `implementation_plan.md`, and divided the project into 5 structured phases (Domain Setup $\rightarrow$ Core Engine $\rightarrow$ UI & Feedback $\rightarrow$ Extensibility & Testing $\rightarrow$ Documentation & Delivery).

### Prompt 2: Phase 1 Execution Trigger
> **User Prompt**: *"start phase 1"*
- **Agent Action**: Provisioned Next.js 14 + TypeScript workspace, configured `docs/process/`, designed `ReviewItem<T>` & `ReviewAdapter<T>` generic contracts, built Morphy 1858 Opera Game annotated dataset, built `QuizReviewAdapter`, and wrote Vitest unit tests.

### Prompt 3: Phase 2 Execution Trigger
> **User Prompt**: *"yes" (proceed to Phase 2)*
- **Agent Action**: Created `useReviewEngine` custom React hook, built `ChessboardView` component with square tint highlights, built `NavigationBar` with keyboard shortcut listeners (`←` / `→`), and executed Vitest test suite (`4/4 passed`).

### Prompt 4: Phase 3 & 4 Execution Trigger
> **User Prompt**: *"yes"*
- **Agent Action**: Built `MoveList` with auto-scrolling, `ReviewFeedbackCard`, `GameHeader` with accuracy meters, `QuizReviewView`, assembled `src/app/page.tsx`, and ran Next.js production build (`npm run build`).

### Prompt 5: Debugging Prompt (Runtime TypeError Fix)
> **User Prompt**: *"it shows this error when i switch to quiz mode"* (attached screenshot of `TypeError: Cannot read properties of undefined (reading 'map')` in `QuizReviewView.tsx`).
- **Agent Action**: Diagnosed state synchronization issue where toggling `domainType` left `currentIndex` at out-of-bounds move index 25 (valid for 33-move chess game, but invalid for 4-item quiz). Added `useEffect` in `useReviewEngine` to reset step index to 0 on adapter change, and added defensive array checks in `QuizReviewView`.

### Prompt 6: Code Feedback — Zero `any` & Discriminated Unions Refactor
> **User Prompt**: *"is it possible to make this change"* (attached code review feedback regarding `any` types and `as ChessReviewItem` casting).
- **Agent Action**: Replaced `T = any` defaults with `T = unknown` across `types.ts`, `ReviewEngine.ts`, and `useReviewEngine.ts`. Refactored `page.tsx` with strongly typed domain hooks (`useReviewEngine<ChessMovePayload>` & `useReviewEngine<QuizQuestionPayload>`), completely eliminating all `any` types and type assertions in codebase logic.

### Prompt 7: Code Feedback — Git History in ZIP Archive
> **User Prompt**: *"does the zip code have a .git? if not then add a git history"*
- **Agent Action**: Created `make_zip.ps1` script to package the repository including `.git` folder (while excluding `node_modules` and `.next`), verifying `Test-Path ...\.git` evaluates to `True`.

### Prompt 8: Code Feedback — Pruning Unused Dependencies
> **User Prompt**: *(Attached screenshot pointing out unused dependency `chess.js`)*
- **Agent Action**: Inspected `package.json` and pruned unused packages (`chess.js`, `clsx`, `tailwind-merge`). Updated lockfile via `npm install` (`removed 3 packages`), and updated PRD Section 4.1 dependency justifications in `README.md` and `RETROSPECTIVE.md`.

### Prompt 9: Code Feedback — 8 Unit Tests, Non-Zero Index Test, Fresh Clone, & Accessibility
> **User Prompt**: *(Attached screenshot with 4 items: Add 3-5 tests, test non-zero index domain switch, check fresh clone build, final a11y pass)*
- **Agent Action**: Expanded Vitest suite from 4 to 8 tests including non-zero index domain switching verification. Verified fresh-clone checkout installation and static build in clean workspace. Added `aria-live="polite"`, `role="toolbar"`, `role="list"`, `aria-label`, and focus rings across UI components.

---

## 2. Agent System Instructions & Guidelines Applied

During development, the coding agent adhered to the following strict guidelines:
- **100% Strict TypeScript Safety**: Zero `any` or unsafe type assertions (`as ...`).
- **Minimal Dependency Footprint**: Every package in `package.json` is strictly used and explicitly justified.
- **Empirical Log Diagnostics**: Inspecting exact error tracebacks before making code edits.
- **Verification Commands**: Every feature change was verified by running `npm test` and `npm run build`.
