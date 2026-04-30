/**
 * Represents an input validation failure.
 *
 * This separates invalid user/input data from simulation or programming errors,
 * making parser failures easier to test and handle explicitly.
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}