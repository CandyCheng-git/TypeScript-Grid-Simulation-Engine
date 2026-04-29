import { Position } from "./Position";

/**
 * Represents a moving carrier in the grid simulation.
 *
 * A carrier has its own identity, position, and infection status.
 * Movement and infection return new Carrier instances so the simulation flow
 * can update state explicitly without mutating existing objects.
 */
export class Carrier {
  constructor(
    public readonly id: number,
    public readonly position: Position,
    public readonly isInfected: boolean = false
  ) {}

  moveTo(position: Position): Carrier {
    return new Carrier(this.id, position, this.isInfected);
  }

  infect(): Carrier {
    return new Carrier(this.id, this.position, true);
  }
}