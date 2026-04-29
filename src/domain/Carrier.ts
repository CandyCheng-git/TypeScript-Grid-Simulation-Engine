import { Position } from "./Position";

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