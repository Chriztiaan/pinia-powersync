# PowerSync + Supabase + Pinia + Vue Demo: Todo List (TypeScript)

## Overview

Demo app demonstrating use of the [PowerSync Vue](https://www.npmjs.com/package/@powersync/vue) together with Supabase.

A step-by-step guide through the Supabase<>PowerSync integration is available [here](https://docs.powersync.com/integration-guides/supabase).

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.

## Getting Started

In the repo directory, use [pnpm](https://pnpm.io/installation) to install dependencies:

```bash
pnpm install
pnpm build:packages
```

Then switch into the demo's directory:

```bash
cd demos/vue-supabase-todolist
```

Set up the Environment variables: Copy the `.env.local.template` file:

```bash
cp .env.local.template .env.local
```

And then edit `.env.local` to insert your credentials for Supabase and PowerSync.

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

Build the production codebase:

```bash
pnpm build
```

