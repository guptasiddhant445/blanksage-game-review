# Retrospective - BlankSage SWE Intern Take-Home Assignment

## 1. What Was Prioritized

1. **Product Hierarchy & Interaction Quality**:
   - The user immediately understands the board state, move quality signal, narrative feedback, and move list position without UI clutter.
   - Smooth navigation controls (buttons + keyboard arrow listeners) with responsive active move auto-scrolling.

2. **Domain Architecture & Maintainability (Section 4.3)**:
   - Rather than coupling chess move objects directly to UI React components, we designed a generic `ReviewItem<T>` domain model and `ReviewAdapter<T>` contract.
   - To prove this extensibility, we implemented both `ChessReviewAdapter` and `QuizReviewAdapter` (BlankSage Student Assessment Review) accessible via a live runtime toggle.

3. **Production Engineering Rigor & Live Deployment**:
   - Live Deployed Production URL: **[https://blanksage-game-review.vercel.app](https://blanksage-game-review.vercel.app)**
   - 100% strict TypeScript typing across all components, domain models, hooks, and adapters. Zero `any` types and zero type assertions (`as ...`).
   - Discriminated union patterns for domain switching (`'chess'` vs `'blanksage-quiz'`), guaranteeing complete compile-time type safety.
   - Automated unit tests covering state bounds, navigation step logic, and adapter switching.
   - Production build verification (`npm run build` static compilation passing with zero warnings).

---

## 2. Most Important Engineering & Product Trade-Offs

### Precomputed & Annotated Dataset vs WebAssembly Engine Stockfish Integration
- **Trade-off**: Integrating Stockfish in WebAssembly provides real-time local engine analysis for any arbitrary PGN file, but introduces multi-megabyte WASM downloads, background web-worker latency, and engine calculation spikes.
- **Rationale**: PRD Section 7 explicitly advises that *"a polished, reliable review experience backed by sensible mock/precomputed data is preferable to an unfinished engine-heavy implementation."* We prioritized delivering an instantaneous, beautifully formatted review experience with human-written narrative move explanations for Morphy's 1858 Opera Game over an engine-heavy prototype.

### Generic Review Shell Abstraction vs Rapid Hardcoding
- **Trade-off**: Decoupling the review engine into generic contracts required additional typing upfront.
- **Rationale**: Demonstrates how BlankSage can reuse this exact Game Review interaction pattern for student assessment review experiences without rewriting UI components.

### Production Dependency Justification (PRD Section 4.1)
- **`next` / `react` / `react-dom`**: Core SSR/SPA framework & component engine.
- **`react-chessboard`**: High-performance 2D board rendering.
- **`lucide-react`**: Vector icons for review signals and navigation controls.
- **`tailwindcss`**: Utility CSS styling engine.
- **`vitest`**: Lightweight unit testing framework.
- **Removed Unused Packages**: Unused packages (`chess.js`, `clsx`, `tailwind-merge`) were pruned from `package.json` to keep bundle size minimal, speed up installation, and adhere to PRD instructions against bloat.

---

## 3. What Would Be Improved With More Time

1. **Custom PGN File Drag-and-Drop Uploader**:
   - Adding a client-side PGN parser to allow users to upload any PGN file and analyze custom games dynamically.
2. **Engine Evaluation Graph Bar**:
   - Adding a vertical eval bar beside the chessboard showing advantage swings over time (e.g. +1.4 to -2.3).
3. **Sound Effects**:
   - Subtle piece placement and move capture sound effects during move navigation.
