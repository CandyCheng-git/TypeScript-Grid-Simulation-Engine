# TypeScript Grid Simulation Engine

A type-safe 2D grid simulation engine built with TypeScript.

This project simulates how contamination spreads across a 2D grid. A group of carriers move through the grid based on movement commands. When a carrier enters a contaminated cell, the carrier becomes infected. Once infected, every cell visited by that carrier becomes contaminated.

The project is designed to demonstrate problem framing, requirement analysis, clean responsibility separation, 2D array handling, edge-case ownership, and automated testing.

---

## Tech Stack

- TypeScript
- Node.js
- Vitest
- Docker

---

## Project Structure

```text
TypeScript-Grid-Simulation-Engine/
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── .gitignore
│
├── docs/
│   ├── 00-phase-plan.md
│   ├── 01-problem-definition.md
│   ├── 02-requirement-analysis.md
│   ├── 03-assumptions-and-edge-cases.md
│   ├── 04-design-notes.md
│   ├── 05-test-strategy.md
│   └── 06-development-setup.md
│
├── src/
│   ├── domain/
│   ├── grid/
│   ├── engine/
│   ├── parser/
│   ├── output/
│   └── index.ts
│
├── tests/
│   ├── domain/
│   ├── grid/
│   ├── engine/
│   ├── parser/
│   └── output/
│
└── examples/
    ├── sample-input.json
    └── sample-output.txt
```

---

## Run the Project

```bash
docker compose up --build
```

---

## Run Tests

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm test
```

---

## Run TypeScript Build Check

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run build
```

---

## Key Design Decisions

### 1. The grid uses a 2D array

The contamination state is stored as:

```ts
grid[y][x]
```

`x` represents the column.  
`y` represents the row.

This keeps the grid representation direct and readable.

### 2. Carriers are stored separately from the grid

The 2D array stores contamination state only.

Carriers are moving entities with identity, position, and infection status, so they are stored separately in an array.

### 3. Position does not handle wrapping

`Position` only represents coordinates.

Boundary and wraparound behaviour depends on grid size, so that logic belongs to `ContaminationGrid`.

### 4. SimulationEngine does not parse or format data

`SimulationEngine` receives structured input and returns structured output.

Parsing and formatting are handled by separate components so the core logic remains testable without console input.

---

## Assumptions

- Coordinates use zero-based indexing.
- The grid is stored internally as `grid[y][x]`.
- Movement wraps around grid boundaries.
- Multiple carriers may occupy the same cell.
- Duplicate contaminated positions are treated as a single contaminated cell.
- A carrier that starts on a contaminated cell becomes infected immediately.
- Once a carrier becomes infected, it remains infected.

---

## Documentation

- [Phase Plan](docs/00-phase-plan.md)
- [Problem Definition](docs/01-problem-definition.md)
- [Requirement Analysis](docs/02-requirement-analysis.md)
- [Assumptions and Edge Cases](docs/03-assumptions-and-edge-cases.md)
- [Design Notes](docs/04-design-notes.md)
- [Test Strategy](docs/05-test-strategy.md)
- [Development Setup](docs/06-development-setup.md)

---

## AI Usage

AI tools were used to support the development process, mainly for:

- brainstorming project structure
- identifying edge cases and ambiguous requirements
- reviewing whether assumptions and design decisions were clearly documented
- tightening README wording

I made the final design decisions, implemented the code, wrote and ran the tests, reviewed the output, and validated the final behaviour myself.

AI was not used to blindly generate and submit the final solution.

- [AI Usage and Prompt History](docs/ai-usage.md)

---

## Future Improvements

- Add a visual grid renderer.
- Add JSON output for automated verification.
- Add a CLI argument for loading custom input files.
