import { execSync } from "node:child_process";
import { describe, expect, it } from "vitest";

describe("CLI entry point", () => {
  it("should run the sample simulation and print formatted output", () => {
    const output = execSync("./node_modules/.bin/tsx src/index.ts", {
      encoding: "utf-8"
    });

    expect(output).toContain("Infected carriers:");
    expect(output).toContain("Contaminated positions:");
    expect(output).toContain("Final carrier positions:");
  }, 15000);
});
