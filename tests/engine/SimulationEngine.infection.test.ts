import { describe, expect, it } from "vitest";
import { Carrier } from "../../src/domain/Carrier";
import { Position } from "../../src/domain/Position";
import { SimulationInput } from "../../src/domain/SimulationInput";
import { SimulationEngine } from "../../src/engine/SimulationEngine";

const toCoordinatePairs = (positions: Position[]): number[][] =>
    positions.map((position) => [position.x, position.y]);

describe("SimulationEngine infection rules", () => {
    it("should infect a carrier that starts on a contaminated cell", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 1)],
            carriers: [new Carrier(1, new Position(1, 1))],
            moves: []
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(1, 1))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[1, 1]]);
    });

    it("should infect a carrier when it moves onto a contaminated cell", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 0)],
            carriers: [new Carrier(1, new Position(0, 0))],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(1, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[1, 0]]);
    });

    it("should contaminate cells visited by an infected carrier", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(0, 0)],
            carriers: [new Carrier(1, new Position(0, 0))],
            moves: ["R", "D"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(1, 1))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([
            [0, 0],
            [1, 0],
            [1, 1]
        ]);
    });

    it("should keep a carrier infected after becoming infected once", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(1, 0)],
            carriers: [new Carrier(1, new Position(0, 0))],
            moves: ["R", "R"]
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.position.equals(new Position(2, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([
            [1, 0],
            [2, 0]
        ]);
    });

    it("should avoid duplicate contaminated positions in the result", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(0, 0), new Position(0, 0)],
            carriers: [new Carrier(1, new Position(0, 0))],
            moves: []
        };

        const result = engine.run(input);

        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([[0, 0]]);
    });

    it("should handle multiple infected carriers independently", () => {
        const engine = new SimulationEngine();

        const input: SimulationInput = {
            width: 4,
            height: 4,
            initialContaminatedPositions: [new Position(0, 0), new Position(2, 2)],
            carriers: [
                new Carrier(1, new Position(0, 0)),
                new Carrier(2, new Position(2, 2))
            ],
            moves: ["R"]
        };

        const result = engine.run(input);

        expect(result.carriers).toHaveLength(2);
        expect(result.carriers[0]!.position.equals(new Position(1, 0))).toBe(true);
        expect(result.carriers[0]!.isInfected).toBe(true);
        expect(result.carriers[1]!.position.equals(new Position(3, 2))).toBe(true);
        expect(result.carriers[1]!.isInfected).toBe(true);
        expect(result.infectedCarrierIds).toEqual([1, 2]);
        expect(toCoordinatePairs(result.contaminatedPositions)).toEqual([
            [0, 0],
            [1, 0],
            [2, 2],
            [3, 2]
        ]);
    });
});