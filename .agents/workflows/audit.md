---
description: Run linter, safely fix confident errors, and report risky issues.
---

# Audit Workflow

Follow these steps to run the linter and handle the reported errors safely and effectively.

> [!IMPORTANT] Run `pnpm fix` immediately at the very beginning. Avoid performing any codebase analysis or formulating speculative conclusions before this command has been executed.

## Step 1: Execute Linter Fix

Run the linter fix command in the terminal:

```bash
pnpm fix
```

## Step 2: Execute Linter

Run the linting command in the terminal:

```bash
pnpm lint
```

## Step 3: Evaluate and Resolve Errors

Review the linter output. Handle each error based on your confidence level.

### ✅ Optimistic (Auto-Fix)

If you are confident the error is straightforward and safe to fix (e.g., formatting, missing docstrings, unused variables, simple typos), **fix it automatically**.

### ⚠️ Pessimistic (Do Not Fix - Report Instead)

If you are hesitant to fix the error due to any of the following factors, **stop and do not fix it**:

1. **Side Effects**: The fix might alter the application's runtime behavior.
2. **Environment**: The fix depends on or alters specific environment configurations.
3. **Deprecated**: The issue involves deprecated code requiring a larger refactoring strategy.
4. **Breaking Changes**: The fix alters public APIs, interfaces, or contracts.

## Step 3: Reporting Format

If you encountered "Pessimistic" errors, provide a report to the user using this exact structure:

- **Situation**: Describe the specific error and its location in the code.
- **Speculation**: Explain why fixing it is risky based on the 5 factors above.
- **Suggestion**: Provide actionable recommendations or ask for user guidance on how to proceed.

## Step 4: Finish

If all safe errors are successfully resolved and any risky errors are reported, conclude your response exactly with:

`🥳 DONE`
