# Test Strategy

This document defines how the simulation engine will be tested.

The goal is to test behaviour, edge cases, and responsibility boundaries without relying on manual console output.

---

## Test Groups

### 1. Domain Tests

Target files:

- `Position.ts`

Test focus:

- equal positions
- different positions
- coordinate value storage

---

### 2. Grid Tests

Target files:

- `ContaminationGrid.ts`

Test focus:

- create clean grid
- contaminate a position
- check contaminated position
- reject invalid position
- wrap from left edge to right edge
- wrap from right edge to left edge
- wrap from top edge to bottom edge
- wrap from bottom edge to top edge

---

### 3. Simulation Engine Tests

Target files:

- `SimulationEngine.ts`

Test focus:

- carrier starts on contaminated cell
- carrier becomes infected after entering contaminated cell
- carrier remains infected after becoming infected once
- infected carrier contaminates visited cells
- multiple carriers are handled independently
- multiple carriers can share the same position
- empty movement sequence is handled
- empty carrier list is handled
- duplicate contaminated cells are not repeated in output

---

### 4. Parser Tests

Target files:

- `InputParser.ts`
- `ValidationError.ts`

Test focus:

- valid input is parsed correctly
- invalid grid size is rejected
- invalid coordinate is rejected
- invalid movement command is rejected
- missing required fields are rejected

---

### 5. Output Tests

Target files:

- `ResultFormatter.ts`

Test focus:

- infected carriers are formatted clearly
- contaminated positions are formatted clearly
- empty results are formatted clearly

---

## Test Naming Rule

Test names should describe behaviour clearly.

Good:

```ts
it("infects a carrier that starts on a contaminated cell", () => {});
```

Bad:

```ts
it("test case 1", () => {});
```

---

## Minimum Completion Criteria

The test suite is acceptable when:

- all grid boundary directions are covered
- starting-cell contamination is covered
- multiple carrier behaviour is covered
- parser validation is covered
- output formatting is covered
- all tests pass with `npm test`
