---
description: Generate and build the Dockerfile for the requested package manager (npm, pnpm, bun).
---

# Dockerize Workflow

Command-driven helper. Invoke it with a manager, e.g. `dockerize pnpm`, and execute exactly that. Do not detect or second-guess the manager.

| Action      | Manager | Meaning                         |
| ----------- | ------- | ------------------------------- |
| `dockerize` | `npm`   | Dockerize the project with npm  |
| `dockerize` | `pnpm`  | Dockerize the project with pnpm |
| `dockerize` | `bun`   | Dockerize the project with bun  |

> [!IMPORTANT] Run only the requested `dockerize <manager>`. The manager is chosen by the caller — never infer, detect, or switch managers on your own. The project must already be set up with that package manager (run `package-manager.md setup <manager>` first if it is not).

## `dockerize pnpm`

1. Copy `dockerize/.dockerignore` to the project root as `.dockerignore`.
2. Copy `dockerize/pnpm/Dockerfile` to the project root as `Dockerfile`.

## `dockerize bun`

1. Copy `dockerize/.dockerignore` to the project root as `.dockerignore`.
2. Copy `dockerize/bun/Dockerfile` to the project root as `Dockerfile`.

## `dockerize npm`

1. Copy `dockerize/.dockerignore` to the project root as `.dockerignore`.
2. Copy `dockerize/npm/Dockerfile` to the project root as `Dockerfile`.

## Finish

State which manager was dockerized, then conclude your response exactly with:

`🥳 DONE`
