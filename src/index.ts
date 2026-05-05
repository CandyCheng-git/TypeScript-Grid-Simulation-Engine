import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SimulationEngine } from "./engine/SimulationEngine";
import { ResultFormatter } from "./output/ResultFormatter";
import { InputParser } from "./parser/InputParser";

function main(): void {
    try {
        const rawInput = loadSampleInput();

        const parser = new InputParser();
        const engine = new SimulationEngine();
        const formatter = new ResultFormatter();

        const input = parser.parse(rawInput);
        const result = engine.run(input);
        const output = formatter.format(result);

        console.log(output);
    } catch (error) {
        console.error(formatError(error));
        process.exitCode = 1;
    }
}

function loadSampleInput(): string {
    const inputPath = join(process.cwd(), "examples", "sample-input.json");

    return readFileSync(inputPath, "utf-8");
}

function formatError(error: unknown): string {
    if (error instanceof Error) {
        return `${error.name}: ${error.message}`;
    }

    return `Unknown error: ${String(error)}`;
}

main();
