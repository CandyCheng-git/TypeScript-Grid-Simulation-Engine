# Phase Plan

This document explains how the TypeScript Grid Simulation Engine is planned, designed, implemented, tested, and prepared for review.

The goal is not only to solve a grid simulation problem, but to show a clear engineering process: problem framing, requirement analysis, design decisions, test planning, implementation, refactoring, and packaging.

---

## Phase 0 — Project Setup

### Goal

Create a clean TypeScript project foundation before implementing the simulation logic.

### Activities

- Initialise the TypeScript project.
- Configure TypeScript, Vitest, Docker, and Git.
- Create the initial folder structure.
- Add a minimal entry point.
- Add the first domain model and test.

### Deliverables

- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vitest.config.ts`
- `.gitignore`
- `Dockerfile`
- `docker-compose.yml`
- `README.md`
- `src/index.ts`
- `src/domain/Position.ts`
- `tests/domain/Position.test.ts`

### Exit Criteria

- The project can run with Docker.
- TypeScript compilation works.
- Vitest runs successfully.
- The first test passes.
- The initial project structure is committed to Git.

---

## Phase 1 — Problem Framing

### Goal

Reframe the original grid infection idea into a neutral pathogen-grid simulation that can be safely presented as a public portfolio project.

### Activities

- Define the project in original wording.
- Avoid copying the original challenge text.
- Identify the main entities in the problem:
  - grid
  - contaminated cells
  - carriers
  - movement commands
  - simulation result
- Define the core simulation rules at a high level.

### Deliverables

- `docs/01-problem-definition.md`

### Exit Criteria

- The problem can be understood without seeing the original challenge.
- The project has a neutral domain context.
- The core rules are clear enough to start requirement analysis.

---

## Phase 2 — Requirement Analysis

### Goal

Convert the problem definition into clear functional and non-functional requirements before writing core logic.

### Activities

- Define what the system must do.
- Define what the system must avoid doing.
- Identify ambiguous cases.
- Define validation rules.
- Separate functional requirements from non-functional requirements.

### Deliverables

- `docs/02-requirement-analysis.md`
- `docs/03-assumptions-and-edge-cases.md`

### Exit Criteria

- Functional requirements are listed clearly.
- Non-functional requirements are listed clearly.
- Edge cases are documented before implementation.
- Ambiguous behaviours have explicit decisions.

---

## Phase 3 — Design

### Goal

Design the project structure and separate responsibilities before implementing the simulation engine.

### Activities

- Define domain models.
- Decide where grid boundary logic belongs.
- Decide how the 2D array is accessed.
- Separate parsing, simulation, grid state, and output formatting.
- Keep moving entities separate from grid cell state.

### Deliverables

- `docs/04-design-notes.md`
- Initial `src/` folder structure:

```text
src/
├── domain/
├── grid/
├── engine/
├── parser/
├── output/
└── index.ts
```

### Exit Criteria

- `Position` only represents coordinates.
- `ContaminationGrid` owns the 2D array and boundary behaviour.
- `SimulationEngine` owns the simulation flow.
- `InputParser` owns input transformation and validation.
- `ResultFormatter` owns output formatting.

---

## Phase 4 — Test Planning

### Goal

Define the test strategy before completing the full implementation.

### Activities

- Identify unit test areas.
- Identify integration-style simulation tests.
- Define edge-case tests.
- Ensure previously missed cases are covered explicitly.

### Deliverables

- `docs/05-test-strategy.md`
- Planned test structure:

```text
tests/
├── domain/
├── grid/
├── engine/
├── parser/
└── output/
```

### Exit Criteria

- Grid movement tests cover all four wraparound directions.
- Simulation tests cover initial contamination overlap.
- Parser tests cover invalid input.
- Output tests cover readable result formatting.
- Test names describe behaviour clearly.

---

## Phase 5 — Implementation

### Goal

Build the simulation engine incrementally with small, testable parts.

### Activities

Implement the project in this order:

1. Domain models
2. Contamination grid
3. Parser and validation
4. Simulation engine
5. Result formatter
6. CLI or export entry point

### Deliverables

- Working TypeScript source code
- Passing test suite
- Example input and output files

### Exit Criteria

- The simulation runs successfully.
- The engine works without console input.
- Core logic is covered by tests.
- Input parsing and output formatting are separated from simulation logic.

---

## Phase 6 — Refactor and Review

### Goal

Improve clarity, naming, and maintainability without over-engineering.

### Activities

- Remove weak or obvious comments.
- Rename unclear files, functions, and tests.
- Check responsibility boundaries.
- Confirm every design decision can be explained.
- Check that the README is concise and not over-polished.

### Deliverables

- Clean source code
- Clear test names
- Updated documentation
- Review-ready repository

### Exit Criteria

- Comments explain intent, not obvious syntax.
- No core logic is hidden inside `index.ts`.
- No parsing or formatting logic exists inside `SimulationEngine`.
- No grid boundary logic exists inside `Position`.
- Documentation is short, readable, and useful.

---

## Phase 7 — Packaging

### Goal

Prepare the repository for portfolio review or technical submission.

### Activities

- Remove generated files and temporary files.
- Check `.gitignore`.
- Confirm run and test commands work.
- Confirm examples match actual output.
- Ensure the repository does not include original challenge files or unrelated artifacts.

### Deliverables

- Final GitHub repository
- Optional ZIP package
- Clean README
- Working examples

### Exit Criteria

- Repository contains only source code, tests, examples, and concise documentation.
- `npm test` passes.
- `npm run build` passes.
- README explains how to run and test the project.
- The project can be reviewed without extra explanation.
