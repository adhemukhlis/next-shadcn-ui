---
description: Generate the Vercel deploy config (vercel.json) for the requested package manager (npm, pnpm, bun).
---

# Vercel Workflow

Command-driven helper. Invoke it with a manager, e.g. `vercel pnpm`, and execute exactly that. Do not detect or second-guess the manager.

| Action   | Manager | Meaning                         |
| -------- | ------- | ------------------------------- |
| `vercel` | `npm`   | Generate `vercel.json` for npm  |
| `vercel` | `pnpm`  | Generate `vercel.json` for pnpm |
| `vercel` | `bun`   | Generate `vercel.json` for bun  |

> [!IMPORTANT] Run only the requested `vercel <manager>`. The manager is chosen by the caller — never infer, detect, or switch managers on your own. The project must already be set up with that package manager (run `package-manager.md setup <manager>` first if it is not).

## `vercel npm`

1. Copy `vercel/npm/vercel.json` to the project root as `vercel.json`.

## `vercel pnpm`

1. Copy `vercel/pnpm/vercel.json` to the project root as `vercel.json`.

## `vercel bun`

1. Copy `vercel/bun/vercel.json` to the project root as `vercel.json`.

## Finish

State which manager's config was applied, then conclude your response exactly with:

`🥳 DONE`
