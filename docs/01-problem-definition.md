# Problem Definition

## Pathogen Grid Simulation Engine

This project simulates how contamination spreads across a 2D grid.

A group of carriers move through the grid based on movement commands. When a carrier enters a contaminated cell, the carrier becomes infected. Once infected, every cell visited by the carrier becomes contaminated.

The engine tracks:

- final contaminated cells
- infected carriers
- final carrier positions

---

## Core Rules

1. Grid uses zero-based coordinates.
   - Example: the top-left position is `(0, 0)`.

2. The grid is stored internally as a 2D array:
   - `grid[y][x]`

3. `x` represents the column.

4. `y` represents the row.

5. Movement commands are:
   - `U`: move up, `y - 1`
   - `D`: move down, `y + 1`
   - `L`: move left, `x - 1`
   - `R`: move right, `x + 1`

6. Grid movement wraps around boundaries.
   - If `x < 0`, it becomes `width - 1`.
   - If `x >= width`, it becomes `0`.
   - If `y < 0`, it becomes `height - 1`.
   - If `y >= height`, it becomes `0`.

7. A carrier becomes infected if it lands on a contaminated cell.

8. If a carrier starts on a contaminated cell, it is infected immediately.

9. Once infected, every new cell visited by that carrier becomes contaminated.

10. Multiple carriers can exist on the same cell.

11. Duplicate contaminated cells should only appear once in the final output.

---

## What This Project Is Not

This project is not intended to copy the wording of the original coding challenge.

The domain has been reframed as a pathogen-grid simulation so that the repository can focus on engineering decisions, data structures, edge cases, and testability.
