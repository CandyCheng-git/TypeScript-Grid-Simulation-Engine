/**
 * Defines the supported movement commands for the grid simulation.
 *
 * The runtime guard helps validate raw input before invalid movement values
 * reach the simulation engine.
 */
export type Direction = "U" | "D" | "L" | "R";

export const VALID_DIRECTIONS: Direction[] = ["U", "D", "L", "R"];

export function isDirection(value: string): value is Direction {
  return VALID_DIRECTIONS.includes(value as Direction);
}