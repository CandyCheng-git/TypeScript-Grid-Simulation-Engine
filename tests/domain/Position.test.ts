import { describe, expect, it } from "vitest";
import { Position } from "../../src/domain/Position";

// Tests the Position value object used by the grid simulation domain.
describe("Position", () => {
  it("should store x and y coordinates", () => {
    const position = new Position(1, 2);

    expect(position.x).toBe(1);
    expect(position.y).toBe(2);
  });

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

  it("should convert position to a unique key", () => {
    const position = new Position(1, 2);

    expect(position.toKey()).toBe("1,2");
  });
  });