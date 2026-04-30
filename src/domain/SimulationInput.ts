import { Carrier } from "./Carrier";
import { Direction } from "./Direction";
import { Position } from "./Position";

/**
 * Defines the structured input required to run a simulation.
 *
 * This keeps parser output and simulation engine input aligned, instead of
 * passing loose values such as width, height, carriers, and moves separately.
 */
export interface SimulationInput {
    readonly width: number;
    readonly height: number;
    readonly initialContaminatedPositions: Position[];
    readonly carriers: Carrier[];
    readonly moves: Direction[];
}