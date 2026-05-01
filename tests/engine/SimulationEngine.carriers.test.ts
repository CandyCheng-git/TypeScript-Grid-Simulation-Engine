import { describe, expect, it } from "vitest";
import { Carrier } from "../../src/domain/Carrier";
import { Position } from "../../src/domain/Position";
import { SimulationInput } from "../../src/domain/SimulationInput";
import { SimulationEngine } from "../../src/engine/SimulationEngine";

const toCoordinatePairs = (positions: Position[]): number[][] =>
    positions.map((position) => [position.x, position.y]);

describe("SimulationEngine multiple carrier behaviour", () => {
    it("should handle multiple carriers independently", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 0)],
            carriers: [
                new Carrier(1, new Position(0, 0)),
                new Carrier(2, new Position(3, 3))
            ],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(1, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);

        expect(result.carriers[1]!.position.equals(new Position(0, 3))).toBe(true);
        expect(result.carriers[1]!.isInfected).toBe(false);

        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[1, 0]]);
    });

    it("should allow multiple carriers to share the same position", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 1)],
            carriers: [
                new Carrier(1, new Position(1, 1)),
                new Carrier(2, new Position(1, 1))
            ],
            moves: []
        };

        const result = engine.run(input);

        expect(result.carriers).toHaveLength(2);
        expect(result.carriers[0]!.position.equals(new Position(1, 1))).toBe(true);
        expect(result.carriers[1]!.position.equals(new Position(1, 1))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.carriers[1]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1, 2]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[1, 1]]);
    });

    it("should keep contamination created by earlier carriers", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(0, 0)],
            carriers: [
                new Carrier(1, new Position(0, 0)),
                new Carrier(2, new Position(1, 0))
            ],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(1, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);

        expect(result.carriers[1]!.position.equals(new Position(2, 0))).toBe(true);
        expect(result.carriers[1]!.isInfected).toBe(false);

        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([
            [0, 0],
            [1, 0]
        ]);
    });
});