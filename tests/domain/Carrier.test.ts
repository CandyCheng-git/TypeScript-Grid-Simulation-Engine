import { describe, expect, it } from "vitest";
import { Carrier } from "../../src/domain/Carrier";
import { Position } from "../../src/domain/Position";

describe("Carrier", () => {
  it("should move to a new position without changing infection status", () => {
    const carrier = new Carrier(1, new Position(0, 0), false);

    const movedCarrier = carrier.moveTo(new Position(1, 0));

    expect(movedCarrier.id).toBe(1);
    expect(movedCarrier.position.equals(new Position(1, 0))).toBe(true);
    expect(movedCarrier.isInfected).toBe(false);
  });

  it("should keep infected status when moving", () => {
    const carrier = new Carrier(1, new Position(0, 0), true);

    const movedCarrier = carrier.moveTo(new Position(1, 0));

    expect(movedCarrier.isInfected).toBe(true);
  });

  it("should return an infected carrier", () => {
    const carrier = new Carrier(1, new Position(0, 0), false);

    const infectedCarrier = carrier.infect();

    expect(infectedCarrier.id).toBe(1);
    expect(infectedCarrier.position.equals(new Position(0, 0))).toBe(true);
    expect(infectedCarrier.isInfected).toBe(true);
  });

  it("should not mutate the original carrier when moving", () => {
    const carrier = new Carrier(1, new Position(0, 0), false);

    carrier.moveTo(new Position(1, 0));

    expect(carrier.position.equals(new Position(0, 0))).toBe(true);
    expect(carrier.isInfected).toBe(false);
  });

  it("should not mutate the original carrier when infected", () => {
    const carrier = new Carrier(1, new Position(0, 0), false);

    carrier.infect();

    expect(carrier.isInfected).toBe(false);
  });
});