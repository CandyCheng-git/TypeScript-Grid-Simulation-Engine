import { describe, expect, it } from "vitest";
import { Position } from "../../src/domain/Position";

describe("Position", () => {
  it("should identify equal positions", () => {
    const first = new Position(1, 2);
    const second = new Position(1, 2);

    expect(first.equals(second)).toBe(true);
  });

  it("should identify different positions", () => {
    const first = new Position(1, 2);
    const second = new Position(2, 1);

    expect(first.equals(second)).toBe(false);
  });
});