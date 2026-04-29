# Assumptions and Edge Cases

This document records the assumptions and edge cases used to guide the implementation and test strategy.

---

## Assumptions

- Coordinates use zero-based indexing.
- The grid is stored as `grid[y][x]`.
- `x` represents the column.
- `y` represents the row.
- Movement wraps around grid boundaries.
- Multiple carriers can exist on the same cell.
- A carrier that starts on a contaminated cell becomes infected immediately.
- Duplicate contaminated positions are treated as a single contaminated cell.
- Once a carrier becomes infected, it remains infected.

---

## Edge Cases

- Carrier starts on a contaminated cell.
- Multiple carriers start on the same cell.
- Multiple carriers enter the same contaminated cell.
- Empty carrier list.
- Empty movement sequence.
- Duplicate initial contaminated positions.
- Invalid grid size.
- Invalid coordinates.
- Invalid movement command.
- Carrier revisits an already contaminated cell.
- Carrier remains infected after becoming infected once.

---

## Design Decision: Multiple Carriers on the Same Cell

Multiple carriers may occupy the same position.

This means carriers are stored separately from the 2D grid. The grid stores contamination state only, while carriers are stored in an array with their own id, position, and infection status.

This avoids losing carrier identity when two or more carriers share the same cell.
