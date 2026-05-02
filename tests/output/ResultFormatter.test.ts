import { describe, expect, it } from "vitest";
import { Carrier } from "../../src/domain/Carrier";
import { Position } from "../../src/domain/Position";
import { SimulationResult } from "../../src/domain/SimulationResult";
import { ResultFormatter } from "../../src/output/ResultFormatter";

describe("ResultFormatter", () => {
    it("should format infected carriers, contaminated positions, and carrier positions", () => {
        const formatter = new ResultFormatter();

        const result: SimulationResult = {
            carriers: [
                new Carrier(1, new Position(1, 0), true),
                new Carrier(2, new Position(3, 3), false)
            ],
            contaminatedPositions: [new Position(0, 0), new Position(1, 0)],
            infectedCarrierIds: [1]
        };

        const output = formatter.format(result);

        expect(output).toBe(
            [
                "Infected carriers: 1",
                "Contaminated positions: (0,0), (1,0)",
                "Final carrier positions:",
                "- Carrier 1: (1,0), infected",
                "- Carrier 2: (3,3), clean"
            ].join("\n")
        );
    });

    it("should format no infected carriers", () => {
        const formatter = new ResultFormatter();

        const result: SimulationResult = {
            carriers: [new Carrier(1, new Position(0, 0), false)],
            contaminatedPositions: [],
            infectedCarrierIds: []
        };

        const output = formatter.format(result);

        expect(output).toBe(
            [
                "Infected carriers: none",
                "Contaminated positions: none",
                "Final carrier positions:",
                "- Carrier 1: (0,0), clean"
            ].join("\n")
        );
    });

    it("should format an empty carrier list", () => {
        const formatter = new ResultFormatter();

        const result: SimulationResult = {
            carriers: [],
            contaminatedPositions: [new Position(1, 1)],
            infectedCarrierIds: []
        };

        const output = formatter.format(result);

        expect(output).toBe(
            [
                "Infected carriers: none",
                "Contaminated positions: (1,1)",
                "Final carrier positions: none"
            ].join("\n")
        );
    });

    it("should format multiple infected carriers", () => {
        const formatter = new ResultFormatter();

        const result: SimulationResult = {
            carriers: [
                new Carrier(1, new Position(1, 1), true),
                new Carrier(2, new Position(2, 2), true)
            ],
            contaminatedPositions: [new Position(1, 1), new Position(2, 2)],
            infectedCarrierIds: [1, 2]
        };

        const output = formatter.format(result);

        expect(output).toBe(
            [
                "Infected carriers: 1, 2",
                "Contaminated positions: (1,1), (2,2)",
                "Final carrier positions:",
                "- Carrier 1: (1,1), infected",
                "- Carrier 2: (2,2), infected"
            ].join("\n")
        );
    });

    it("should format a fully empty result", () => {
        const formatter = new ResultFormatter();

        const result: SimulationResult = {
            carriers: [],
            contaminatedPositions: [],
            infectedCarrierIds: []
        };

        const output = formatter.format(result);

        expect(output).toBe(
            [
                "Infected carriers: none",
                "Contaminated positions: none",
                "Final carrier positions: none"
            ].join("\n")
        );
    });
});