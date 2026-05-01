import { Carrier } from "../domain/Carrier";
import { Direction } from "../domain/Direction";
import { SimulationInput } from "../domain/SimulationInput";
import { SimulationResult } from "../domain/SimulationResult";
import { ContaminationGrid } from "../grid/ContaminationGrid";

/**
 * Runs the contamination simulation using validated domain input.
 *
 * The engine coordinates the simulation flow only: it builds the grid, applies
 * initial contamination, moves carriers, updates infection state, and returns a
 * structured result. Raw input parsing and output formatting stay outside this class.
 */
export class SimulationEngine {
    run(input: SimulationInput): SimulationResult {
        const grid = this.createGrid(input);

        let carriers = input.carriers.map((carrier) =>
            this.applyInitialContamination(carrier, grid)
        );

        for (const direction of input.moves) {
            carriers = carriers.map((carrier) =>
                this.moveCarrier(carrier, direction, grid)
            );
        }

        return {
            carriers,
            contaminatedPositions: grid.getContaminatedPositions(),
            infectedCarrierIds: carriers
                .filter((carrier) => carrier.isInfected)
                .map((carrier) => carrier.id)
        };
    }

    private createGrid(input: SimulationInput): ContaminationGrid {
        const grid = new ContaminationGrid(input.width, input.height);

        for (const position of input.initialContaminatedPositions) {
            grid.contaminate(position);
        }

        return grid;
    }

    private applyInitialContamination(
        carrier: Carrier,
        grid: ContaminationGrid
    ): Carrier {
        if (grid.isContaminated(carrier.position)) {
            return carrier.infect();
        }

        return carrier;
    }

    private moveCarrier(
        carrier: Carrier,
        direction: Direction,
        grid: ContaminationGrid
    ): Carrier {
        const nextPosition = grid.move(carrier.position, direction);
        let nextCarrier = carrier.moveTo(nextPosition);

        if (grid.isContaminated(nextPosition)) {
            nextCarrier = nextCarrier.infect();
        }

        if (nextCarrier.isInfected) {
            grid.contaminate(nextPosition);
        }

        return nextCarrier;
    }
}