import { Carrier } from "../domain/Carrier";
import { Position } from "../domain/Position";
import { SimulationResult } from "../domain/SimulationResult";

/**
 * Converts a structured simulation result into a readable text summary.
 *
 * The formatter only handles presentation. It does not change simulation state,
 * recalculate infection results, or apply grid rules.
 */
export class ResultFormatter {
    format(result: SimulationResult): string {
        return [
            this.formatInfectedCarriers(result.infectedCarrierIds),
            this.formatContaminatedPositions(result.contaminatedPositions),
            this.formatCarrierPositions(result.carriers)
        ].join("\n");
    }

    private formatInfectedCarriers(infectedCarrierIds: number[]): string {
        if (infectedCarrierIds.length === 0) {
            return "Infected carriers: none";
        }

        return `Infected carriers: ${infectedCarrierIds.join(", ")}`;
    }

    private formatContaminatedPositions(positions: Position[]): string {
        if (positions.length === 0) {
            return "Contaminated positions: none";
        }

        const formattedPositions = positions
            .map((position) => this.formatPosition(position))
            .join(", ");

        return `Contaminated positions: ${formattedPositions}`;
    }

    private formatCarrierPositions(carriers: Carrier[]): string {
        if (carriers.length === 0) {
            return "Final carrier positions: none";
        }

        const formattedCarriers = carriers
            .map((carrier) => this.formatCarrier(carrier))
            .join("\n");

        return `Final carrier positions:\n${formattedCarriers}`;
    }

    private formatCarrier(carrier: Carrier): string {
        const infectionStatus = carrier.isInfected ? "infected" : "clean";

        return `- Carrier ${carrier.id}: ${this.formatPosition(
            carrier.position
        )}, ${infectionStatus}`;
    }

    private formatPosition(position: Position): string {
        return `(${position.x},${position.y})`;
    }
}