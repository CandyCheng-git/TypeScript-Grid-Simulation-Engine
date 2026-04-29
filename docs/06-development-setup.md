# Development Setup

This document explains how to run the project in a Docker-based development environment.

---

## Prerequisites

- Docker Desktop
- Git
- VS Code or another code editor

This project uses the official Node.js 22 Alpine Docker image, so Node.js does not need to be installed directly on the host machine.

---

## Install Dependencies

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm install
```

---

## Run the Project

```bash
docker compose up --build
```

Expected output:

```text
TypeScript Grid Simulation Engine started.
```

---

## Run Tests

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm test
```

---

## Run TypeScript Build Check

```bash
docker run --rm -v ${PWD}:/app -w /app node:22-alpine npm run build
```

---

## Notes

- `node_modules/` is excluded from Git.
- The project is designed to run through Docker for a consistent development environment.
- Core logic should be testable without console input.
