import { describe, expect, it } from "vitest";
import { Carrier } from "../../src/domain/Carrier";
import { Position } from "../../src/domain/Position";
import { SimulationInput } from "../../src/domain/SimulationInput";
import { SimulationEngine } from "../../src/engine/SimulationEngine";

const toCoordinatePairs = (positions: Position[]): number[][] =>
    positions.map((position) => [position.x, position.y]);

describe("SimulationEngine basic behaviour", () => {
    it("should return clean carriers when there is no contamination", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [],
            carriers: [new Carrier(1, new Position(0, 0))],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers).toHaveLength(1);
        expect(result.carriers[0]!.id).toBe(1);
        expect(result.carriers[0]!.position.equals(new Position(1, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(false);
        expect(result.infectedCarrierIds).toEqual([]);
        expect(result.contaminatedPositions).toEqual([]);
    });

    it("should move multiple clean carriers independently", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [],
            carriers: [
                new Carrier(1, new Position(0, 0)),
                new Carrier(2, new Position(2, 2))
            ],
            moves: ["R", "D"]
        };

        const result = engine.run(input);

        expect(result.carriers).toHaveLength(2);
        expect(result.carriers[0]!.position.equals(new Position(1, 1))).toBe(true);
        expect(result.carriers[1]!.position.equals(new Position(3, 3))).toBe(true);
        expect(result.carriers.every((carrier) => !carrier.isInfected)).toBe(true);
        expect(result.infectedCarrierIds).toEqual([]);
        expect(result.contaminatedPositions).toEqual([]);
    });

    it("should handle an empty carrier list", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 1)],
            carriers: [],
            moves: ["R", "D"]
        };

        const result = engine.run(input);

        expect(result.carriers).toEqual([]);
        expect(result.infectedCarrierIds).toEqual([]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[1, 1]]);
    });

    it("should handle an empty movement sequence", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [],
            carriers: [new Carrier(1, new Position(2, 2))],
            moves: []
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(2, 2))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(false);
        expect(result.infectedCarrierIds).toEqual([]);
        expect(result.contaminatedPositions).toEqual([]);
    });

    it("should move carriers with grid wraparound", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [],
            carriers: [new Carrier(1, new Position(3, 0))],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(0, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(false);
        expect(result.infectedCarrierIds).toEqual([]);
    });
});