# Directus Extension Starter

Build custom Directus extensions with a full local dev environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (for running Directus)
- [Node.js 22+](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation) (`npm install -g pnpm`)

## Quick Start

```bash
# 1. Clone and install
git clone <repo-url>
cd extension-starter
pnpm install

# 2. Start Directus
docker compose up -d

# 3. Start extension dev mode
pnpm dev

# 4. Open Directus
# http://localhost:8055
# Login: admin@example.com / d1r3ctu5
```

## Using Claude Code (Optional)

[Claude Code](https://claude.com/claude-code) is an AI coding assistant that understands this project. It can help you build extensions, debug issues, and navigate the codebase.

```bash
# Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash

# Start in this project
cd extension-starter
claude
```

The `.claude/CLAUDE.md` file provides Claude with context about Directus extension development.

## Project Structure

```
extensions/
  my-interface/              # Example interface extension
    src/
      my-interface/
        index.ts             # Extension definition
        interface.vue        # Vue component
    package.json
    tsconfig.json
docs/
  extensions/                # Detailed extension documentation
```

## Adding Extension Types

Add more extension types to your bundle:

```bash
cd extensions/my-interface
pnpm dlx create-directus-extension@latest add
```

This prompts you to select an extension type and adds it to your bundle.

## Extension Types

| Type      | Description            |
| --------- | ---------------------- |
| interface | Custom field input     |
| display   | Custom field display   |
| layout    | Custom collection view |
| module    | Custom sidebar page    |
| panel     | Dashboard widget       |
| operation | Flow operation         |
| endpoint  | Custom API route       |
| hook      | Event listener         |

## Resources

- [Extension SDK Docs](https://directus.io/docs/guides/extensions/quickstart)
- [API Reference](https://directus.io/docs/api)
- [UI Components](https://components.directus.io/)
-
## Tips

- Extensions auto-reload when files change
- Check browser console for errors
- Use Vue DevTools for debugging
- Run `pnpm build` before deploying
