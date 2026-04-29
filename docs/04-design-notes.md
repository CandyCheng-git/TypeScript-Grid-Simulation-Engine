# Design Notes

## Key Design Decisions

- Position only represents x and y.
- Position does not handle grid wrapping.
- Boundary and wrapping logic belongs to the grid.
- SimulationEngine will handle simulation flow.
- Parser will handle raw input transformation.
- Formatter will handle output display.

## 2D Array Convention

The grid is stored as:

```ts
grid[y][x]
```