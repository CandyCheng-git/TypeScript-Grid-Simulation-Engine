# AI Usage and Prompt History

This project was developed with AI assistance, but the final implementation, design decisions, testing, and validation were completed and reviewed by me.

AI was used as a support tool for brainstorming, review, and documentation clarity. It was not used as a replacement for understanding or validating the solution.

## Summary of AI Usage

AI tools were used to assist with:

- brainstorming possible project structure
- identifying edge cases and ambiguous requirements
- reviewing design separation between domain models, grid logic, simulation logic, parsing, and formatting
- suggesting test scenarios
- improving clarity of README wording

I made the final decisions, implemented the code, ran the tests, reviewed failures, fixed issues, and validated the final behaviour myself.

---

## Prompt 1 — Requirement and Edge Case Review

**Prompt used:**

> I am building a grid-based infection simulation. Before coding, help me identify ambiguous requirements, assumptions, and edge cases that should be handled or documented.

**Purpose:**

I used this to avoid jumping into implementation too early and to identify cases that needed explicit decisions.

**Outcome:**

This helped me review edge cases such as:

- a host starting on the initial carrier position
- duplicate host positions
- empty host list
- invalid movement commands
- grid boundary wrapping
- repeated visits to the same cell

**My final decision:**

I chose to handle initial host/carrier overlap explicitly and reject duplicate host positions during validation.

---

## Prompt 2 — Project Structure Review

**Prompt used:**

> Review this TypeScript project structure for a grid simulation engine. Is the responsibility split clear between domain models, grid movement, simulation engine, parser, and output formatter?

**Purpose:**

I used this to check whether the project structure was understandable and testable.

**Outcome:**

The review suggested keeping `Position` as a simple value object and placing wraparound movement inside the grid class because wrapping depends on grid size.

**My final decision:**

I kept coordinate data in `Position`, movement and boundary rules in `ContaminationGrid`, and simulation flow in `SimulationEngine`.

---

## Prompt 3 — Assumptions and Design Decisions

**Prompt used:**

> Help me write concise assumptions and design decisions for a grid-based simulation project. Keep the wording clear and not overly polished.

**Purpose:**

I used this to make sure the README explained the important decisions without becoming too long.

**Outcome:**

This helped me document decisions such as:

- coordinates are zero-indexed
- movement wraps around grid boundaries
- hosts do not move
- duplicate host positions are rejected
- newly converted carriers move after earlier carriers complete their movement sequence

**My final decision:**

I edited the wording and kept only the assumptions that affect implementation or testing.

---

## Prompt 4 — Test Strategy Review

**Prompt used:**

> Suggest test cases for this grid simulation engine, especially edge cases that a reviewer would expect to see.

**Purpose:**

I used this to review whether my test plan covered important behaviour.

**Outcome:**

This helped me include tests for:

- four-direction wraparound
- host on initial carrier position
- duplicate host validation
- no hosts
- repeated visits
- conversion order

**My final decision:**

I split tests by responsibility rather than putting all simulation tests into one large file.

---

## Prompt 5 — README Review

**Prompt used:**

> Review this README for clarity. Make it concise, technical, and focused on how to run, test, assumptions, design decisions, and AI usage.

**Purpose:**

I used this to improve readability and remove unnecessary explanation.

**Outcome:**

The README was shortened and focused on:

- overview
- how to run
- how to test
- project structure
- assumptions
- design decisions
- AI usage

**My final decision:**

I removed overly detailed wording and kept the README practical for a technical reviewer.

---

## Prompt 6 — Code Review Support

**Prompt used:**

> Review this TypeScript function for readability, responsibility boundaries, and possible edge cases. Do not rewrite the whole solution; only point out risks.

**Purpose:**

I used this as a review aid after writing the implementation myself.

**Outcome:**

The review helped me check for possible issues around validation, movement ownership, and repeated infection handling.

**My final decision:**

I applied only the changes that matched the project requirements and verified them through tests.

---

## What I Did Myself

I personally completed the following:

- interpreted the task requirements
- selected the TypeScript project structure
- made the final assumptions and design decisions
- implemented the source code
- wrote and organised the tests
- ran the test suite
- fixed test failures
- reviewed final output manually
- prepared the final submission package

AI was used as a support and review tool, not as an automatic solution generator.