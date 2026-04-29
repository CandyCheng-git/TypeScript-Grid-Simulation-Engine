import { describe, expect, it } from "vitest";
import { Position } from "../../src/domain/Position";
import { ContaminationGrid } from "../../src/grid/ContaminationGrid";

describe("ContaminationGrid", () => {
  it("should create a clean grid", () => {
    const grid = new ContaminationGrid(4, 4);

    expect(grid.isContaminated(new Position(0, 0))).toBe(false);
    expect(grid.getContaminatedPositions()).toEqual([]);
  });

  it("should contaminate a position", () => {
    const grid = new ContaminationGrid(4, 4);

    grid.contaminate(new Position(1, 2));

    expect(grid.isContaminated(new Position(1, 2))).toBe(true);
  });

  it("should not duplicate a contaminated position", () => {
    const grid = new ContaminationGrid(4, 4);

    grid.contaminate(new Position(1, 2));
    grid.contaminate(new Position(1, 2));

    const contaminatedPositions = grid.getContaminatedPositions();

    expect(contaminatedPositions.map((position) => [position.x, position.y])).toEqual([
      [1, 2]
    ]);
  });

  it("should return contaminated positions in row-major order", () => {
    const grid = new ContaminationGrid(4, 4);

    grid.contaminate(new Position(2, 1));
    grid.contaminate(new Position(0, 0));
    grid.contaminate(new Position(1, 1));

    const contaminatedPositions = grid.getContaminatedPositions();

    expect(contaminatedPositions.map((position) => [position.x, position.y])).toEqual([
      [0, 0],
      [1, 1],
      [2, 1]
    ]);
  });

  it("should reject non-positive grid size", () => {
    expect(() => new ContaminationGrid(0, 4)).toThrow(
      "Grid width and height must be positive."
    );

    expect(() => new ContaminationGrid(4, -1)).toThrow(
      "Grid width and height must be positive."
    );
  });

  it("should reject non-integer grid size", () => {
    expect(() => new ContaminationGrid(4.5, 4)).toThrow(
      "Grid width and height must be integers."
    );

    expect(() => new ContaminationGrid(4, 3.5)).toThrow(
      "Grid width and height must be integers."
    );
  });

  it("should reject positions outside the grid", () => {
    const grid = new ContaminationGrid(4, 4);

    expect(() => grid.contaminate(new Position(-1, 0))).toThrow(
      "Position is outside the grid"
    );

    expect(() => grid.isContaminated(new Position(4, 0))).toThrow(
      "Position is outside the grid"
    );
  });

  it("should reject non-integer positions", () => {
    const grid = new ContaminationGrid(4, 4);

    expect(() => grid.contaminate(new Position(1.5, 0))).toThrow(
      "Position must use integer coordinates"
    );

    expect(() => grid.isContaminated(new Position(1, 2.5))).toThrow(
      "Position must use integer coordinates"
    );
  });

  it("should move up", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 1), "U");

    expect(nextPosition.equals(new Position(1, 0))).toBe(true);
  });

  it("should move down", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 1), "D");

    expect(nextPosition.equals(new Position(1, 2))).toBe(true);
  });

  it("should move left", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 1), "L");

    expect(nextPosition.equals(new Position(0, 1))).toBe(true);
  });

  it("should move right", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 1), "R");

    expect(nextPosition.equals(new Position(2, 1))).toBe(true);
  });

  it("should wrap from left edge to right edge", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(0, 1), "L");

    expect(nextPosition.equals(new Position(3, 1))).toBe(true);
  });

  it("should wrap from right edge to left edge", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(3, 1), "R");

    expect(nextPosition.equals(new Position(0, 1))).toBe(true);
  });

  it("should wrap from top edge to bottom edge", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 0), "U");

    expect(nextPosition.equals(new Position(1, 3))).toBe(true);
  });

  it("should wrap from bottom edge to top edge", () => {
    const grid = new ContaminationGrid(4, 4);

    const nextPosition = grid.move(new Position(1, 3), "D");

    expect(nextPosition.equals(new Position(1, 0))).toBe(true);
  });

  it("should support rectangular grids", () => {
    const grid = new ContaminationGrid(3, 2);

    const wrappedRight = grid.move(new Position(2, 0), "R");
    const wrappedDown = grid.move(new Position(1, 1), "D");

    expect(wrappedRight.equals(new Position(0, 0))).toBe(true);
    expect(wrappedDown.equals(new Position(1, 0))).toBe(true);
  });
});