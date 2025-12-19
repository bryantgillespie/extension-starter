# Directus Extension Starter

Build custom Directus extensions with a full local dev environment.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (for running Directus)
- [Node.js 18+](https://nodejs.org/)
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

## Documentation

This repo includes detailed extension docs in `docs/extensions/`:

- `0.overview.md` - Extension types summary
- `1.quickstart.md` - First extension tutorial
- `2.api-extensions/` - Hooks, endpoints, operations
- `3.app-extensions/` - Interfaces, layouts, panels, modules

## Resources

- [Extension SDK Docs](https://directus.io/docs/guides/extensions/quickstart)
- [API Reference](https://directus.io/docs/api)
- [UI Components](https://components.directus.io/) (this is not comprehensive)
-
## Tips

- Extensions auto-reload when files change
- Check browser console for errors
- Use Vue DevTools for debugging
- Run `pnpm build` before deploying

## Vue Components Best Practices
- Name files consistently using PascalCase (UserProfile.vue)
- ALWAYS use PascalCase for component names in source code
- Compose names from the most general to the most specific: SearchButtonClear.vue not ClearSearchButton.vue
- ALWAYS define props with defineProps<{ propOne: number }>() and TypeScript types, WITHOUT const props =
- Use const props = ONLY if props are used in the script block
- Use withDefaults to declare default values
- ALWAYS define emits with const emit = defineEmits<{ eventName: [argOne: type]; otherEvent: [] }>() for type safety
- ALWAYS use camelCase in JS for props and emits, even if they are kebab-case in templates
- ALWAYS use kebab-case in templates for props and emits
ALWAYS use the prop shorthand if possible: <MyComponent :count /> instead of <MyComponent :count="count" /> (value has the - same name as the prop)
- ALWAYS Use the shorthand for slots: <template #default> instead of <template v-slot:default>
- ALWAYS use explicit <template> tags for ALL used slots
ALWAYS use defineModel<type>({ required, get, set, default }) to define allowed v-model bindings in components. This avoids - defining modelValue prop and update:modelValue event manually
