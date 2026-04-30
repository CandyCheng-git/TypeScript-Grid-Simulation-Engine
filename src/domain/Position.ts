// Value object only; grid boundary rules belong to ContaminationGrid.
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