# Pathogen Grid Simulation Engine
## Problem Definition

This project simulates how contamination spreads across a 2D grid.

A group of carriers move through the grid based on movement commands. When a carrier enters a contaminated cell, the carrier becomes infected. Once infected, every cell visited by the carrier becomes contaminated.

The engine tracks:

- final contaminated cells
- infected carriers
- final carrier positions

## Core rules
```
1. Grid uses zero-based coordinates.
   Example: top-left is (0, 0).

2. Grid is stored as a 2D array:
   grid[y][x]

3. x means column.
   y means row.

4. Movement commands:
   U = y - 1
   D = y + 1
   L = x - 1
   R = x + 1

5. Grid wraps around.
   If x < 0, it becomes width - 1.
   If x >= width, it becomes 0.
   If y < 0, it becomes height - 1.
   If y >= height, it becomes 0.

6. A carrier becomes infected if it lands on a contaminated cell.

7. If a carrier starts on a contaminated cell, it is infected immediately.

8. Once infected, every new cell visited by that carrier becomes contaminated.

9. Multiple carriers can exist on the same cell.

10. Duplicate contaminated cells should still only appear once in the final output.
```