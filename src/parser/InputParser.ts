import { Carrier } from "../domain/Carrier";
import { Direction, isDirection } from "../domain/Direction";
import { Position } from "../domain/Position";
import { SimulationInput } from "../domain/SimulationInput";
import { ValidationError } from "./ValidationError";

/**
 * Converts raw JSON-like input into a validated SimulationInput object.
 *
 * The parser owns input shape validation, coordinate validation, and movement
 * validation so the simulation engine can work with trusted domain objects
 * instead of checking raw user input.
 */
type RawCarrier = {
  id: unknown;
  position: unknown;
};

type RawSimulationInput = {
  grid?: {
    width?: unknown;
    height?: unknown;
  };
  initialContaminatedPositions?: unknown;
  carriers?: unknown;
  moves?: unknown;
};

export class InputParser {
    parse(rawInput: unknown): SimulationInput {
        const input = this.parseRawInput(rawInput);

        const width = this.parsePositiveInteger(input.grid?.width, "grid.width");
        const height = this.parsePositiveInteger(input.grid?.height, "grid.height");

        const initialContaminatedPositions = this.parsePositions(
        input.initialContaminatedPositions,
        "initialContaminatedPositions",
        width,
        height
        );

        const carriers = this.parseCarriers(input.carriers, width, height);
        this.validateUniqueCarrierIds(carriers);

        const moves = this.parseMoves(input.moves);

        return {
        width,
        height,
        initialContaminatedPositions,
        carriers,
        moves
        };
    }

    private parseRawInput(rawInput: unknown): RawSimulationInput {
        if (typeof rawInput === "string") {
        try {
            return JSON.parse(rawInput) as RawSimulationInput;
        } catch {
            throw new ValidationError("Input must be valid JSON.");
        }
        }

        if (!this.isRecord(rawInput)) {
        throw new ValidationError("Input must be an object or JSON string.");
        }

        return rawInput as RawSimulationInput;
    }

    private parsePositiveInteger(value: unknown, fieldName: string): number {
        if (!Number.isInteger(value)) {
        throw new ValidationError(`${fieldName} must be an integer.`);
        }

        if ((value as number) <= 0) {
        throw new ValidationError(`${fieldName} must be positive.`);
        }

        return value as number;
    }

    private parsePositions(
        value: unknown,
        fieldName: string,
        width: number,
        height: number
    ): Position[] {
        if (!Array.isArray(value)) {
        throw new ValidationError(`${fieldName} must be an array.`);
        }

        return value.map((rawPosition, index) =>
        this.parsePositionTuple(rawPosition, `${fieldName}[${index}]`, width, height)
        );
    }

    private parseCarriers(value: unknown, width: number, height: number): Carrier[] {
        if (!Array.isArray(value)) {
        throw new ValidationError("carriers must be an array.");
        }

        return value.map((rawCarrier, index) =>
        this.parseCarrier(rawCarrier, `carriers[${index}]`, width, height)
        );
    }

    private validateUniqueCarrierIds(carriers: Carrier[]): void {
        const seenIds = new Set<number>();

        for (const carrier of carriers) {
        if (seenIds.has(carrier.id)) {
            throw new ValidationError(`carrier id must be unique: ${carrier.id}`);
        }

        seenIds.add(carrier.id);
        }
    }

    private parseCarrier(
        value: unknown,
        fieldName: string,
        width: number,
        height: number
    ): Carrier {
        if (!this.isRecord(value)) {
        throw new ValidationError(`${fieldName} must be an object.`);
        }

        const rawCarrier = value as RawCarrier;

        if (!Number.isInteger(rawCarrier.id)) {
        throw new ValidationError(`${fieldName}.id must be an integer.`);
        }

        const position = this.parsePositionTuple(
        rawCarrier.position,
        `${fieldName}.position`,
        width,
        height
        );

        return new Carrier(rawCarrier.id as number, position);
    }

    private parsePositionTuple(
        value: unknown,
        fieldName: string,
        width: number,
        height: number
    ): Position {
        if (!Array.isArray(value) || value.length !== 2) {
        throw new ValidationError(`${fieldName} must be a position tuple [x, y].`);
        }

        const [x, y] = value;

        if (!Number.isInteger(x) || !Number.isInteger(y)) {
        throw new ValidationError(`${fieldName} must contain integer coordinates.`);
        }

        const position = new Position(x, y);
        this.validatePositionInsideGrid(position, fieldName, width, height);

        return position;
    }

    private parseMoves(value: unknown): Direction[] {
        if (typeof value !== "string") {
        throw new ValidationError("moves must be a string.");
        }

        return value.split("").map((move, index) => {
        if (!isDirection(move)) {
            throw new ValidationError(`moves[${index}] must be one of U, D, L, R.`);
        }

        return move;
        });
    }

    private validatePositionInsideGrid(
        position: Position,
        fieldName: string,
        width: number,
        height: number
    ): void {
        if (
        position.x < 0 ||
        position.x >= width ||
        position.y < 0 ||
        position.y >= height
        ) {
        throw new ValidationError(
            `${fieldName} is outside the grid: (${position.x}, ${position.y})`
        );
        }
    }

    private isRecord(value: unknown): value is Record<string, unknown> {
        return typeof value === "object" && value !== null && !Array.isArray(value);
    }
}