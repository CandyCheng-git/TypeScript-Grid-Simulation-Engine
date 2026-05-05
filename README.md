# TypeScript Grid Simulation Engine

A type-safe 2D grid simulation engine built with TypeScript.

This project simulates how contamination spreads across a rectangular grid. Carriers move through the grid using direction commands. When a carrier enters a contaminated cell, the carrier becomes infected. Once infected, every cell visited by that carrier becomes contaminated.

The project focuses on clear responsibility separation, 2D array handling, deterministic simulation logic, edge-case coverage, and automated testing.

---

## Tech Stack

- TypeScript
- Node.js
- Vitest
- Docker
- Prettier

---

## Quick Start

### Install dependencies

```bash
npm install
```

### Run the sample simulation

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Run TypeScript build check

```bash
npm run build
```

### Check formatting

```bash
npm run format:check
```

### Format files

```bash
npm run format
```

---

## Run with Docker

### Install dependencies

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm install
```

### Run the sample simulation

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run dev
```

### Run tests

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm test
```

### Run build check

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run build
```

### Check formatting

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run format:check
```

If using WSL or Git Bash, `$(pwd)` may be more reliable:

```bash
docker run --rm -v "$(pwd)":/app -w /app node:22-alpine npm test
```

---

## Example Input

The sample input is stored in:

```text
examples/sample-input.json
```

Example:

```json
{
  "grid": {
    "width": 4,
    "height": 4
  },
  "initialContaminatedPositions": [
    [1, 1]
  ],
  "carriers": [
    {
      "id": 1,
      "position": [0, 1]
    },
    {
      "id": 2,
      "position": [3, 3]
    }
  ],
  "moves": "RDR"
}
```

---

## Example Output

The expected sample output is stored in:

```text
examples/sample-output.txt
```

Example:

```text
Infected carriers: 1
Contaminated positions: (1,1), (1,2), (2,2)
Final carrier positions:
- Carrier 1: (2,2), infected
- Carrier 2: (1,0), clean
```

---

## Project Structure

```text
TypeScript-Grid-Simulation-Engine/
├── README.md
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── Dockerfile
├── docker-compose.yml
├── .gitignore
├── .prettierrc.json
├── .prettierignore
│
├── docs/
│   ├── 00-phase-plan.md
│   ├── 01-problem-definition.md
│   ├── 02-requirement-analysis.md
│   ├── 03-assumptions-and-edge-cases.md
│   ├── 04-design-notes.md
│   ├── 05-test-strategy.md
│   ├── 06-development-setup.md
│   └── ai-usage.md
│
├── examples/
│   ├── sample-input.json
│   └── sample-output.txt
│
├── src/
│   ├── domain/
│   │   ├── Position.ts
│   │   ├── Direction.ts
│   │   ├── CellState.ts
│   │   ├── Carrier.ts
│   │   ├── SimulationInput.ts
│   │   └── SimulationResult.ts
│   │
│   ├── grid/
│   │   └── ContaminationGrid.ts
│   │
│   ├── parser/
│   │   ├── InputParser.ts
│   │   └── ValidationError.ts
│   │
│   ├── engine/
│   │   └── SimulationEngine.ts
│   │
│   ├── output/
│   │   └── ResultFormatter.ts
│   │
│   └── index.ts
│
└── tests/
    ├── domain/
    ├── grid/
    ├── parser/
    ├── engine/
    └── output/
```

---

## Core Rules

- Coordinates use zero-based indexing.
- The top-left cell is `(0, 0)`.
- The grid is stored internally as `grid[y][x]`.
- `x` represents the column.
- `y` represents the row.
- Movement commands are:
  - `U`: move up
  - `D`: move down
  - `L`: move left
  - `R`: move right
- Movement wraps around grid boundaries.
- A carrier becomes infected when it enters a contaminated cell.
- A carrier that starts on a contaminated cell is infected before movement.
- Once infected, every cell visited by that carrier becomes contaminated.
- Duplicate contaminated cells appear only once in the final output.

---

## Key Design Decisions

### 1. The grid owns boundary and wraparound logic

Wrapping depends on grid width and height, so this logic belongs to `ContaminationGrid`, not `Position`.

`Position` only stores coordinates.

### 2. The grid stores contamination state only

The 2D array stores whether a cell is clean or contaminated.

Carriers are stored separately because they are moving entities with their own identity, position, and infection status.

### 3. The simulation engine does not parse or format data

`SimulationEngine` receives structured input and returns structured output.

It does not read files, parse JSON, or print console output.

### 4. Parser and formatter are separate input/output concerns

`InputParser` converts raw JSON or objects into `SimulationInput`.

`ResultFormatter` converts `SimulationResult` into readable text output.

### 5. Tests are grouped by responsibility

Tests are organised by domain, grid, parser, engine, and output behaviour instead of being placed in one large test file.

---

## Assumptions

- The grid must have positive integer width and height.
- Coordinates must be integers.
- Coordinates must be inside the grid before simulation starts.
- Movement commands must be one of `U`, `D`, `L`, or `R`.
- Multiple carriers may occupy the same cell.
- Duplicate contaminated positions are treated as one contaminated cell.
- Once a carrier becomes infected, it remains infected.
- Empty carrier lists and empty movement sequences are valid inputs.

---

## Test Coverage

The test suite covers:

- position equality
- direction validation
- carrier movement and infection status
- 2D grid creation
- contamination checks
- invalid grid positions
- wraparound movement in all four directions
- parser validation
- initial contaminated-cell infection
- infected carriers contaminating visited cells
- multiple carrier behaviour
- output formatting

Run:

```bash
npm test
```

---

## Development Checklist

Before committing changes, run:

```bash
npm run format:check
npm test
npm run build
npm run dev
```

With Docker:

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run format:check
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm test
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run build
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run dev
```

---

## Documentation

Detailed engineering notes are stored in the `docs/` folder:

- `00-phase-plan.md`
- `01-problem-definition.md`
- `02-requirement-analysis.md`
- `03-assumptions-and-edge-cases.md`
- `04-design-notes.md`
- `05-test-strategy.md`
- `06-development-setup.md`
- `ai-usage.md`

The README is kept concise so reviewers can quickly understand how to run, test, and evaluate the project.

---

## AI Usage

AI tools were used to assist with:

- brainstorming project structure
- identifying possible edge cases
- reviewing responsibility separation
- suggesting test scenarios
- improving documentation clarity

The final design decisions, implementation, testing, debugging, and validation were completed and reviewed by me.

A more detailed AI usage summary is available in:

```text
docs/ai-usage.md
```

---

## Future Improvements

- Add CLI support for custom input file paths.
- Add JSON output for easier automated verification.
- Add a small visual grid renderer for demonstration purposes.
