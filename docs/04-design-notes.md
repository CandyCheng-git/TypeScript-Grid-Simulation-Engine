# Design Notes

This document explains the main design decisions and responsibility boundaries.

---

## Responsibility Boundaries

| Component | Responsibility | Should Not Do |
|---|---|---|
| `Position` | Store `x` and `y` coordinates | Handle wrapping, validation, or infection |
| `Carrier` | Store carrier identity, position, and infection status | Access grid cells directly |
| `ContaminationGrid` | Own the 2D array, contamination state, validation, and wraparound movement | Run the full simulation |
| `SimulationEngine` | Coordinate the simulation flow and infection rules | Parse input or format output |
| `InputParser` | Convert raw input into `SimulationInput` | Run simulation logic |
| `ResultFormatter` | Convert `SimulationResult` into readable output | Change simulation state |

---

## 2D Array Convention

The grid is stored internally as:

```ts
grid[y][x]
```

`x` represents the column.  
`y` represents the row.

This follows row-major access and avoids mixing coordinate notation with array indexing.

---

## Key Design Decisions

### 1. Position does not know about grid boundaries

`Position` is a value object. It only stores coordinates.

Wrapping depends on grid size, so boundary logic belongs to `ContaminationGrid`.

### 2. The grid stores contamination state only

The 2D array stores whether a cell is clean or contaminated.

Carriers are stored separately because they are moving entities with identity and infection status.

### 3. SimulationEngine does not handle input or output

The engine receives structured input and returns structured output.

This keeps the core logic testable without console input or file access.

### 4. Parser and formatter are kept separate

Parsing and formatting are input/output concerns.

They should not affect simulation rules.
