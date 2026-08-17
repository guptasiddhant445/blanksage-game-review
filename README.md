# BlankSage Game Review Recreation

A polished, maintainable, and production-oriented recreation of the **Chess.com Game Review** experience, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **`react-chessboard`**.

Designed for the **BlankSage SWE Intern Take-Home Assignment**.

## 🌐 Live Demo & Submission Links
- **Live Deployed App**: **[https://blanksage-game-review.vercel.app](https://blanksage-game-review.vercel.app)**
- **GitHub Repository**: **[https://github.com/guptasiddhant445/blanksage-game-review](https://github.com/guptasiddhant445/blanksage-game-review)**
- **Process Documentation**: [`/docs/process`](file:///C:/Users/Siddhant/.gemini/antigravity/scratch/blanksage-game-review/docs/process/INDEX.md)


---

## 🌟 Key Features

1. **Interactive Chessboard & Move Stepping**:
   - High-performance board rendering powered by `react-chessboard`.
   - Highlighted move squares (`from` and `to`) color-tinted according to move quality.
   - Floating move quality badge on the board.
   - Board orientation toggle (`🔄 Flip Board`) for White/Black perspectives.

2. **Synchronized Move List & Auto-Scroll**:
   - Paired move table (White & Black) with color-coded classification indicators.
   - Auto-scroll keeps the active move in view during step navigation.
   - Click any move in the history to jump directly to that position.

3. **Rich Review Feedback Panel**:
   - Move classification pill (`BEST MOVE`, `GREAT MOVE`, `BOOK`, `INACCURACY`, `MISTAKE`, `BLUNDER`).
   - Concise narrative explanation detailing tactical and positional context.
   - Engine evaluation score indicator (`+1.8`, `-2.5`, `Mate`).
   - Recommended engine alternative move for inaccuracies and blunders.

4. **Domain Extensibility (Section 4.3 Requirement)**:
   - Generic `ReviewEngine<T>` and `ReviewAdapter<T>` abstractions separate domain data from the presentation shell.
   - Includes a dynamic **Mode Switcher** allowing you to instantly switch between **Chess Game Review** and a **BlankSage Student Assessment Review** (`QuizReviewAdapter`) using the exact same UI shell.

5. **Keyboard & Accessibility Support**:
   - Step forward / backward using `←` / `→` arrow keys or `A` / `D`.
   - Jump to Start (`Home`) or End (`End`).
   - Accessible contrast, semantic controls, and visible focus states.

---

## 🏗️ Architecture & Folder Structure

```
blanksage-game-review/
├── docs/
│   └── process/
│       ├── ai_process.md       # AI prompts, transcript tracking & phase log
│       └── decision_log.md     # Architectural Decision Records (ADRs)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root Layout
│   │   ├── page.tsx            # Main Game Review Page Layout
│   │   └── globals.css         # Tailwind & theme styles
│   ├── domain/
│   │   ├── types.ts            # Generic ReviewItem, ReviewAdapter contracts
│   │   ├── ReviewEngine.ts     # Generic Review state machine
│   │   └── evaluationMeta.ts   # Move quality badges & color definitions
│   ├── chess/
│   │   ├── types.ts            # Chess move payload interfaces
│   │   ├── sampleGames.ts      # Annotated dataset (Morphy Opera Game 1858)
│   │   └── ChessReviewAdapter.ts # Chess ReviewAdapter implementation
│   ├── blanksage/
│   │   ├── sampleQuiz.ts       # Student assessment dataset
│   │   └── QuizReviewAdapter.ts  # BlankSage Quiz ReviewAdapter implementation
│   ├── components/
│   │   ├── ChessboardView.tsx  # Board component with square highlights
│   │   ├── NavigationBar.tsx   # Step navigation bar & keyboard shortcuts
│   │   ├── MoveList.tsx        # Interactive move list table
│   │   ├── ReviewFeedbackCard.tsx # Narrative review card
│   │   ├── GameHeader.tsx      # Header & accuracy summary bar
│   │   └── QuizReviewView.tsx  # Student assessment view
│   ├── hooks/
│   │   └── useReviewEngine.ts  # Custom React hook for review engine state
│   └── __tests__/
│       └── ReviewEngine.test.ts # Vitest domain unit test suite
├── RETROSPECTIVE.md            # Submission retrospective & engineering trade-offs
├── package.json
└── tsconfig.json
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Launch

```bash
# 1. Clone repository
git clone <repository-url>
cd blanksage-game-review

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Automated Tests

```bash
# Execute domain unit test suite
npm run test
```

### Building for Production

```bash
# Build optimized Next.js bundle
npm run build

# Start production server
npm run start
```

---

## 📝 Process Documentation & Submission Artifacts

Per Section 6 of the assignment PRD, all planning, AI prompt history, decision records, and trade-off rationales are preserved under:
- [`/docs/process/INDEX.md`](file:///C:/Users/Siddhant/.gemini/antigravity/scratch/blanksage-game-review/docs/process/INDEX.md)
- [`/docs/process/ai_process.md`](file:///C:/Users/Siddhant/.gemini/antigravity/scratch/blanksage-game-review/docs/process/ai_process.md)
- [`/docs/process/decision_log.md`](file:///C:/Users/Siddhant/.gemini/antigravity/scratch/blanksage-game-review/docs/process/decision_log.md)
- [`RETROSPECTIVE.md`](file:///C:/Users/Siddhant/.gemini/antigravity/scratch/blanksage-game-review/RETROSPECTIVE.md)
