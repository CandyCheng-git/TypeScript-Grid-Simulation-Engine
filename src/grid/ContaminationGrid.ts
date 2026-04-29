import { CellState } from "../domain/CellState";
import { Direction } from "../domain/Direction";
import { Position } from "../domain/Position";

/**
 * Manages contamination state and movement rules for a rectangular 2D grid.
 *
 * The grid stores cell state as `cells[y][x]`, validates coordinates, and owns
 * wraparound movement because boundary behaviour depends on grid dimensions.
 * Moving carriers are stored separately from the grid.
 */
export class ContaminationGrid {
  private readonly cells: CellState[][];

  constructor(
    public readonly width: number,
    public readonly height: number
  ) {
    this.validateGridSize(width, height);

    this.cells = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => CellState.Clean)
    );
  }

  contaminate(position: Position): void {
    this.validatePosition(position);
    this.cells[position.y]![position.x] = CellState.Contaminated;
  }

  isContaminated(position: Position): boolean {
    this.validatePosition(position);
    return this.cells[position.y]![position.x] === CellState.Contaminated;
  }

  move(position: Position, direction: Direction): Position {
    this.validatePosition(position);

    let nextX = position.x;
    let nextY = position.y;

    switch (direction) {
      case "U":
        nextY -= 1;
        break;
      case "D":
        nextY += 1;
        break;
      case "L":
        nextX -= 1;
        break;
      case "R":
        nextX += 1;
        break;
      default:
        throw new Error(`Invalid direction: ${direction}`);
    }

    return new Position(
      this.wrap(nextX, this.width),
      this.wrap(nextY, this.height)
    );
  }

  getContaminatedPositions(): Position[] {
    const contaminatedPositions: Position[] = [];

    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        if (this.cells[y]![x] === CellState.Contaminated) {
          contaminatedPositions.push(new Position(x, y));
        }
      }
    }

    return contaminatedPositions;
  }

  private validateGridSize(width: number, height: number): void {
    if (!Number.isInteger(width) || !Number.isInteger(height)) {
      throw new Error("Grid width and height must be integers.");
    }

    if (width <= 0 || height <= 0) {
      throw new Error("Grid width and height must be positive.");
    }
  }

  private validatePosition(position: Position): void {
    if (!Number.isInteger(position.x) || !Number.isInteger(position.y)) {
      throw new Error(
        `Position must use integer coordinates: (${position.x}, ${position.y})`
      );
    }

    if (
      position.x < 0 ||
      position.x >= this.width ||
      position.y < 0 ||
      position.y >= this.height
    ) {
      throw new Error(`Position is outside the grid: (${position.x}, ${position.y})`);
    }
  }

  private wrap(value: number, limit: number): number {
    return (value + limit) % limit;
  }
}