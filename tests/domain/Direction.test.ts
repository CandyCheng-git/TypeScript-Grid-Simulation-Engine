import { describe, expect, it } from "vitest";
import { Direction, isDirection } from "../../src/domain/Direction";

describe("Direction", () => {
  it("should accept valid directions", () => {
    const validDirections: Direction[] = ["U", "D", "L", "R"];

    for (const direction of validDirections) {
      expect(isDirection(direction)).toBe(true);
    }
  });

  it("should reject invalid directions", () => {
    const invalidDirections = ["X", "", "UP", "DOWN", "1"];

    for (const direction of invalidDirections) {
      expect(isDirection(direction)).toBe(false);
    }
  });
});