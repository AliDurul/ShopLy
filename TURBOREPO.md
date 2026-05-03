# Turborepo Monorepo Guide

This guide covers common workflows for managing the Next.js monorepo using **pnpm** and **Turborepo**.

## Table of Contents

- [Quick Start](#quick-start)
- [Development](#development)
- [Building](#building)
- [Package Management](#package-management)
- [Creating New Packages](#creating-new-packages)
- [Turborepo Specifics](#turborepo-specifics)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### 1. Install Dependencies

Install all dependencies across the entire monorepo:

```bash
pnpm install
```

This command:
- Installs dependencies in the root `package.json`
- Installs dependencies for all apps and packages
- Creates symlinks for `workspace:*` dependencies
- Uses the pnpm lock file to ensure consistency

### 2. Start Development

Run all apps in development mode:

```bash
pnpm dev
```

This starts:
- `apps/api` — Express API server
- `apps/store-front` — Next.js frontend

Press `Ctrl+C` to stop all development servers.

### 3. Build Everything

Build all packages and apps:

```bash
pnpm build
```

Outputs are:
- `apps/api/dist/` — Compiled JavaScript
- `apps/store-front/.next/` — Next.js build
- `packages/ui/dist/` — UI components build

---

## Development

### Start a Single App in Dev Mode

Start only the API:

```bash
pnpm dev --filter api
```

Start only the store-front:

```bash
pnpm dev --filter store-front
```

Start API and its dependencies (if any):

```bash
pnpm dev --filter api --filter=...^api
```

### Run Scripts in a Specific Workspace

Run the type-check script in the API app:

```bash
pnpm -F api check-types
```

Alternative syntax:

```bash
pnpm --filter api check-types
```

Run lint only in the UI package:

```bash
pnpm -F @workspace/ui lint
```

### Available Scripts in Apps

#### api (`apps/api`)
- `pnpm -F api dev` — Start development server with nodemon
- `pnpm -F api build` — Compile TypeScript to JavaScript
- `pnpm -F api start` — Run the compiled server
- `pnpm -F api check-types` — Type-check without compiling

#### store-front (`apps/store-front`)
- `pnpm -F store-front dev` — Start Next.js dev server
- `pnpm -F store-front build` — Build Next.js for production
- `pnpm -F store-front start` — Start production server

### Understanding Filter Syntax

```bash
# Run in a single workspace
pnpm --filter <workspace-name> <script>

# Run in multiple workspaces
pnpm --filter api --filter store-front <script>

# Run in dependencies (^ = dependencies)
pnpm --filter=^api lint  # Lint all dependencies of api

# Run in dependents (workspaces that depend on this)
pnpm --filter=api... lint  # Lint api and all dependents
```

---

## Building

### Build All Apps and Packages

```bash
pnpm build
```

This runs the `build` script in every workspace that has one. Turborepo caches results—subsequent builds only recompile changed workspaces.

### Build a Specific App

Build only the API:

```bash
pnpm build --filter api
```

Build only store-front:

```bash
pnpm build --filter store-front
```

### Build Specific Package

Build only the UI package:

```bash
pnpm build --filter @workspace/ui
```

### Force Rebuild (Skip Cache)

Ignore Turborepo's cache and rebuild everything:

```bash
pnpm build --force
```

### View Build Outputs

After running `pnpm build`:

- **API output:** `apps/api/dist/`
  - Contains compiled JavaScript files
  - Run with: `node dist/index.js`

- **Store-front output:** `apps/store-front/.next/`
  - Next.js optimized production build
  - Run with: `pnpm -F store-front start`

- **UI package output:** `packages/ui/dist/`
  - Compiled components and utilities
  - Consumed by other packages via workspace imports

---

## Package Management

### Add a Dependency to an App/Package

Add Express to the API app:

```bash
pnpm add express --filter api
```

Add TypeScript as dev dependency:

```bash
pnpm add -D typescript --filter api
```

### Add a Workspace Dependency

Link another workspace as a dependency. Add the UI package to store-front:

```bash
pnpm add @workspace/ui --filter store-front
```

This creates a symlink and updates the workspace dependency reference.

### Add a Dependency to Multiple Workspaces

Add React to both apps:

```bash
pnpm add react --filter api --filter store-front
```

### Add a Dev Dependency to Root

Add Turborepo to the root (shared across all workspaces):

```bash
pnpm add -D turbo
```

### Update All Dependencies

Update all packages in the monorepo:

```bash
pnpm update --recursive
```

Update only in a specific workspace:

```bash
pnpm update --filter api
```

### View Workspace Dependencies

See what's installed in the API:

```bash
pnpm -F api ls
```

List only production dependencies:

```bash
pnpm -F api ls --prod
```

### Link Local Packages

Packages are automatically linked via `workspace:*` in `package.json`. For example:

```json
{
  "dependencies": {
    "@workspace/ui": "workspace:*"
  }
}
```

This tells pnpm to use the local version from `packages/ui/` instead of npm.

---

## Creating New Packages

### Step 1: Create the Package Directory

Create a new shared utility package:

```bash
mkdir -p packages/utils
cd packages/utils
```

### Step 2: Initialize package.json

Create `packages/utils/package.json`:

```json
{
  "name": "@workspace/utils",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "lint": "eslint src",
    "format": "prettier --write \"src/**/*.ts\"",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@workspace/eslint-config": "workspace:*",
    "@workspace/typescript-config": "workspace:*",
    "eslint": "^9.39.0",
    "prettier": "^3.8.1",
    "typescript": "5.9.3"
  }
}
```

### Step 3: Create TypeScript Configuration

Create `packages/utils/tsconfig.json`:

```json
{
  "extends": "@workspace/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

### Step 4: Create Source Directory

```bash
mkdir -p packages/utils/src
```

Create `packages/utils/src/index.ts`:

```typescript
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

### Step 5: Create ESLint Configuration

Create `packages/utils/eslint.config.js`:

```javascript
const reactInternal = require("@workspace/eslint-config/react-internal");

module.exports = [...reactInternal];
```

### Step 6: Install Dependencies

The package is automatically included in the workspace. Install dependencies:

```bash
pnpm install
```

### Step 7: Use in Other Apps

Add the package to an app (e.g., API):

```bash
pnpm add @workspace/utils --filter api
```

Import and use it:

```typescript
// apps/api/src/index.ts
import { greet } from "@workspace/utils";

console.log(greet("World"));
```

### Step 8: Build and Test

Build the new package:

```bash
pnpm build --filter @workspace/utils
```

Test it's available:

```bash
pnpm ls --filter api
```

---

## Turborepo Specifics

### Monorepo Structure

```
next-monorepo/
├── apps/                    # Applications
│   ├── api/                # Express API
│   └── store-front/        # Next.js frontend
├── packages/               # Shared packages
│   ├── eslint-config/     # ESLint presets
│   ├── typescript-config/ # TypeScript configs
│   └── ui/                # Shared UI components
├── turbo.json             # Turborepo configuration
├── pnpm-workspace.yaml    # pnpm workspace config
└── package.json           # Root package config
```

### Workspace Configuration

**pnpm-workspace.yaml** defines which folders are packages:

```yaml
packages:
  - "apps/*"      # All folders in apps/
  - "packages/*"  # All folders in packages/
```

### Turborepo Configuration

**turbo.json** defines tasks and dependencies:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],  // Depends on dependencies' build
      "outputs": [".next/**"]
    },
    "dev": {
      "cache": false,           // Never cache dev
      "persistent": true        // Keep running
    }
  }
}
```

### Running Scripts Across the Monorepo

Run a script in all workspaces:

```bash
pnpm lint
```

This runs the `lint` script in all workspaces that have one.

### Caching

Turborepo caches task outputs by default. To:

- **Clear cache:** Delete `.turbo/` directory
- **Disable cache for a task:** Add `"cache": false` in `turbo.json`
- **Force rebuild:** Use `--force` flag

### Task Dependencies

Tasks can depend on other tasks:

```json
{
  "build": {
    "dependsOn": ["^build"]  // build depends on dependencies' build
  }
}
```

The `^` symbol means "run in dependency graph order."

---

## Troubleshooting

### "Command not found" errors

**Problem:** Running `pnpm dev` fails with command not found.

**Solution:** Ensure you're in the monorepo root:

```bash
cd d:/githup-reps/per-projects/next-monorepo
pnpm dev
```

### Dependencies not found

**Problem:** Import errors like `Cannot find module '@workspace/ui'`.

**Solution:** Reinstall dependencies:

```bash
pnpm install
```

Verify the package is listed in `package.json` as a workspace dependency.

### Filtered command not working

**Problem:** `pnpm dev --filter api` doesn't start the API.

**Solution:** Use the correct workspace name:

```bash
pnpm dev --filter=api
```

Or use the package name:

```bash
pnpm dev --filter=@workspace/api
```

List all workspaces:

```bash
pnpm ls --depth=0
```

### Build outputs missing

**Problem:** `apps/api/dist/` doesn't exist after `pnpm build`.

**Solution:**
1. Verify the build script exists in `apps/api/package.json`
2. Check for build errors: `pnpm build --filter api`
3. Ensure TypeScript is configured correctly in `apps/api/tsconfig.json`

### Git hooks failing

**Problem:** Pre-commit hooks fail due to staged files.

**Solution:** Stage files in all workspaces:

```bash
git add .
```

Then run linting:

```bash
pnpm lint
pnpm format
```

### Port conflicts

**Problem:** Dev server fails to start because a port is already in use.

**Solution:**
- Kill the existing process
- Or change the port in the app's configuration
- For API (Express): Check `apps/api/src/server.ts`
- For store-front: Use `pnpm dev -p 3001` (Next.js)

### TypeScript compilation errors

**Problem:** Type errors when building.

**Solution:**
1. Check tsconfig inheritance is correct
2. Verify workspace dependencies are listed in package.json
3. Run type check: `pnpm typecheck`
4. Clear cache: `rm -rf node_modules/.turbo`

### pnpm lock file conflicts

**Problem:** Merge conflicts in `pnpm-lock.yaml`.

**Solution:**
1. Don't edit `pnpm-lock.yaml` manually
2. Resolve conflicts by keeping both versions:
   ```bash
   git checkout --theirs pnpm-lock.yaml
   # or
   git checkout --ours pnpm-lock.yaml
   ```
3. Reinstall to regenerate lock file:
   ```bash
   pnpm install
   ```

---

## Quick Reference

| Task | Command |
|------|---------|
| Install all deps | `pnpm install` |
| Start dev (all) | `pnpm dev` |
| Start dev (API only) | `pnpm dev --filter api` |
| Build all | `pnpm build` |
| Build API only | `pnpm build --filter api` |
| Lint all | `pnpm lint` |
| Lint API only | `pnpm lint --filter api` |
| Format code | `pnpm format` |
| Type check | `pnpm typecheck` |
| Add pkg to API | `pnpm add <pkg> --filter api` |
| Add dev pkg to API | `pnpm add -D <pkg> --filter api` |
| Add workspace pkg | `pnpm add @workspace/ui --filter store-front` |
| List deps (API) | `pnpm -F api ls` |
| Run API script | `pnpm -F api <script-name>` |

---

## Related Documentation

- [Turborepo Docs](https://turbo.build/)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [TypeScript Configuration](packages/typescript-config/)
- [ESLint Configuration](packages/eslint-config/)
