/**
 * Represents an immutable coordinate in the 2D simulation grid.
 *
 * This value object only stores position data and comparison helpers.
 * Grid validation, boundary checks, and wraparound movement are handled by
 * ContaminationGrid because those rules depend on grid dimensions.
 */
export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) {}

  equals(other: Position): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toKey(): string {
    return `${this.x},${this.y}`;
  }
}