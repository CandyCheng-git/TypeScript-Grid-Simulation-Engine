/**
 * Represents the contamination state of a single grid cell.
 *
 * Using named states keeps the 2D grid more readable than raw booleans,
 * especially when checking or updating contamination during simulation.
 */
export enum CellState {
    Clean = "CLEAN",
    Contaminated = "CONTAMINATED"
}