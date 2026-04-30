import { describe, expect, it } from "vitest";
import { InputParser } from "../../src/parser/InputParser";
import { ValidationError } from "../../src/parser/ValidationError";

describe("InputParser", () => {
  it("should parse valid input", () => {
    const parser = new InputParser();

    const result = parser.parse({
      grid: {
        width: 4,
        height: 4
      },
      initialContaminatedPositions: [[1, 1]],
      carriers: [
        { id: 1, position: [0, 0] },
        { id: 2, position: [2, 2] }
      ],
      moves: "RDLU"
    });

    expect(result.width).toBe(4);
    expect(result.height).toBe(4);
    expect(result.initialContaminatedPositions).toHaveLength(1);
    expect(result.initialContaminatedPositions[0]!.x).toBe(1);
    expect(result.initialContaminatedPositions[0]!.y).toBe(1);
    expect(result.carriers).toHaveLength(2);
    expect(result.carriers[0]!.id).toBe(1);
    expect(result.carriers[0]!.position.x).toBe(0);
    expect(result.carriers[0]!.position.y).toBe(0);
    expect(result.moves).toEqual(["R", "D", "L", "U"]);
  });

  it("should parse valid JSON string input", () => {
    const parser = new InputParser();

    const result = parser.parse(
      JSON.stringify({
        grid: {
          width: 3,
          height: 3
        },
        initialContaminatedPositions: [[1, 1]],
        carriers: [{ id: 1, position: [0, 0] }],
        moves: "RD"
      })
    );

    expect(result.width).toBe(3);
    expect(result.height).toBe(3);
    expect(result.moves).toEqual(["R", "D"]);
  });

  it("should reject invalid JSON string input", () => {
    const parser = new InputParser();

    expect(() => parser.parse("{ invalid json")).toThrow(ValidationError);
    expect(() => parser.parse("{ invalid json")).toThrow("Input must be valid JSON.");
  });

  it("should reject non-object input", () => {
    const parser = new InputParser();

    expect(() => parser.parse(123)).toThrow(ValidationError);
    expect(() => parser.parse(123)).toThrow("Input must be an object or JSON string.");
  });

  it("should reject missing grid field", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        initialContaminatedPositions: [],
        carriers: [],
        moves: ""
      })
    ).toThrow("grid.width must be an integer.");
  });

  it("should reject invalid grid size", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 0,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [],
        moves: ""
      })
    ).toThrow("grid.width must be positive.");
  });

  it("should reject non-integer grid size", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4.5,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [],
        moves: ""
      })
    ).toThrow("grid.width must be an integer.");

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 3.5
        },
        initialContaminatedPositions: [],
        carriers: [],
        moves: ""
      })
    ).toThrow("grid.height must be an integer.");
  });

  it("should reject missing initial contaminated positions field", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        carriers: [],
        moves: ""
      })
    ).toThrow("initialContaminatedPositions must be an array.");
  });

  it("should reject invalid coordinate format", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [[1]],
        carriers: [],
        moves: ""
      })
    ).toThrow("initialContaminatedPositions[0] must be a position tuple [x, y].");
  });

  it("should reject non-integer coordinates", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [[1.5, 1]],
        carriers: [],
        moves: ""
      })
    ).toThrow("initialContaminatedPositions[0] must contain integer coordinates.");
  });

  it("should reject coordinates outside the grid", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [[4, 0]],
        carriers: [],
        moves: ""
      })
    ).toThrow("initialContaminatedPositions[0] is outside the grid: (4, 0)");
  });

  it("should reject missing carriers field", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        moves: ""
      })
    ).toThrow("carriers must be an array.");
  });

  it("should reject invalid carrier shape", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [[1, 0, 0]],
        moves: ""
      })
    ).toThrow("carriers[0] must be an object.");
  });

  it("should reject invalid carrier id", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [{ id: "1", position: [0, 0] }],
        moves: ""
      })
    ).toThrow("carriers[0].id must be an integer.");
  });

  it("should reject invalid carrier position", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [{ id: 1, position: [-1, 0] }],
        moves: ""
      })
    ).toThrow("carriers[0].position is outside the grid: (-1, 0)");
  });

  it("should reject duplicate carrier ids", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [
          { id: 1, position: [0, 0] },
          { id: 1, position: [2, 2] }
        ],
        moves: ""
      })
    ).toThrow("carrier id must be unique: 1");
  });

  it("should reject missing moves field", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: []
      })
    ).toThrow("moves must be a string.");
  });

  it("should reject invalid movement command", () => {
    const parser = new InputParser();

    expect(() =>
      parser.parse({
        grid: {
          width: 4,
          height: 4
        },
        initialContaminatedPositions: [],
        carriers: [],
        moves: "RDX"
      })
    ).toThrow("moves[2] must be one of U, D, L, R.");
  });
});