# TypeScript Grid Simulation Engine
A type-safe 2D grid simulation engine built with TypeScript.
## Overview
### Project Goal

This project demonstrates:

- requirement analysis
- clean domain modelling
- 2D array grid handling
- deterministic simulation logic
- edge case ownership
- automated testing with Vitest
- Docker-based development setup

### Tech Stack

- TypeScript
- Node.js
- Vitest
- Docker

## Example scenario
## How to run
```bash
docker compose up --build
```
## How to test
```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine sh -c "npm install && npm test"
```
## Project structure
## Key design decisions
- The grid uses `grid[y][x]`.
- `Position` only represents coordinates.
- Grid boundary logic does not belong inside `Position`.
- Core simulation logic will be separated from input parsing and output formatting.

## Assumptions
## AI usage