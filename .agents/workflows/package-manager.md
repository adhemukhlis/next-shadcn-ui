---
description: Set up the project to use the requested package manager (npm, pnpm, bun).
---

# Package Manager Workflow

Command-driven helper. Invoke it with an action and a manager, e.g. `setup pnpm`, and execute exactly that. Do not detect or second-guess the manager.

| Action  | Manager | Meaning                             |
| ------- | ------- | ----------------------------------- |
| `setup` | `npm`   | Set up / switch the project to npm  |
| `setup` | `pnpm`  | Set up / switch the project to pnpm |
| `setup` | `bun`   | Set up / switch the project to bun  |

> [!NOTE] `server.js` in this project is Bun-specific (uses `Bun.env`, `Bun.argv`, `Bun.spawn`). Setups below rewrite it to the matching runtime.

> [!IMPORTANT] Run only the requested `setup <manager>`. The manager is chosen by the caller — never infer, detect, or switch managers on your own.

## `setup pnpm`

1. Remove foreign lockfiles: `rm -f package-lock.json bun.lock bun.lockb`.
2. Write `pnpm-workspace.yaml` from `package-manager/pnpm/pnpm-workspace.yaml`.
3. Write `server.js` from `package-manager/pnpm/server.js` (Node version: `process.env`/`process.argv`/`child_process.spawn`).
4. Update `package.json`:
   - rewrite any `bun`-specific scripts (`bun run`, `bunx`) as `pnpm run`/`pnpm dlx`;
   - change `dev`/`start` to `node server.js dev` / `node server.js start`.
5. Install: `rm -rf node_modules && pnpm install`.

## `setup bun`

1. Remove foreign lockfiles: `rm -f package-lock.json pnpm-lock.yaml`.
2. Write `bunfig.toml` from `package-manager/bun/bunfig.toml`.
3. Write `server.js` from `package-manager/bun/server.js` (Bun version: `Bun.env`/`Bun.argv`/`Bun.spawn`).
4. Update `package.json` scripts that hardcode `npm`/`pnpm` to use `bun` (`bun run`, `bunx`).
5. Install: `rm -rf node_modules && bun install`.

## `setup npm`

1. Remove foreign lockfiles: `rm -f bun.lock bun.lockb pnpm-lock.yaml`.
2. Remove `pnpm-workspace.yaml` and `bunfig.toml`, then write `.npmrc` from `package-manager/npm/.npmrc`.
3. Write `server.js` from `package-manager/npm/server.js` (Node version: `process.env`/`process.argv`/`child_process.spawn`).
4. Update `package.json`:
   - rewrite scripts to use `npm run` / `npx`;
   - change `dev`/`start` to `node server.js dev` / `node server.js start`;
   - drop the `packageManager` field.
5. Install: `rm -rf node_modules && npm install`.

## Finish

State which manager was set up, then conclude your response exactly with:

`🥳 DONE`
