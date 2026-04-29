# Assumptions and Edge Cases

## Assumptions

- Coordinates use zero-based indexing.
- The grid is stored as grid[y][x].
- x represents column.
- y represents row.
- Movement wraps around grid boundaries.
- Multiple carriers can exist on the same cell.
- A carrier that starts on a contaminated cell becomes infected immediately.

## Edge Cases

- Carrier starts on a contaminated cell.
- Multiple carriers start on the same cell.
- Empty carrier list.
- Empty movement sequence.
- Duplicate contaminated positions.
- Invalid grid size.
- Invalid coordinates.
- Invalid movement command.