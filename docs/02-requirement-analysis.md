# Requirement Analysis

This document converts the problem definition into functional requirements, non-functional requirements, and acceptance criteria.

---

## Functional Requirements

- FR1. The system shall create a rectangular grid using width and height.
- FR2. The system shall store contamination state using a 2D array.
- FR3. The system shall accept multiple carriers with starting positions.
- FR4. The system shall process a sequence of movement commands.
- FR5. The system shall support wraparound movement at grid boundaries.
- FR6. The system shall mark carriers as infected when they enter contaminated cells.
- FR7. The system shall immediately infect carriers that start on contaminated cells.
- FR8. The system shall return final carrier positions, infected carriers, and contaminated cells.

---

## Non-Functional Requirements

- NFR1. The simulation must be deterministic.
- NFR2. Core logic must be testable without console input.
- NFR3. Input validation errors must be explicit.
- NFR4. The engine should be separated from parsing and output formatting.
- NFR5. The code should be readable with minimal but meaningful comments.

---

## Acceptance Criteria

The implementation is considered complete when:

- A grid can be created with valid width and height.
- Initial contaminated positions can be applied to the grid.
- Carriers can be placed on valid grid positions.
- Movement commands are processed in order.
- Boundary wrapping works in all four directions.
- A carrier starting on a contaminated cell is infected before movement.
- An infected carrier contaminates each cell it visits.
- Final carrier positions, infected carrier ids, and contaminated positions are returned.
- Invalid input is rejected with clear errors.
- Core simulation logic can be tested without console input.
