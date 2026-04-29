import { Carrier } from "./Carrier";
import { Position } from "./Position";

/**
 * Defines the structured output produced by the simulation engine.
 *
 * The result keeps final carrier state, contaminated grid positions, and
 * infected carrier ids separate so output formatting can stay outside the
 * simulation engine.
 */
export interface SimulationResult {
  readonly carriers: Carrier[];
  readonly contaminatedPositions: Position[];
  readonly infectedCarrierIds: number[];
}