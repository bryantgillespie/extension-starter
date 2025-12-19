# Directus Extension Development

- In all interactions and commit messages, be extremely concise and sacrifice grammar for the sake of concision.

## Plans

- At the end of each plan, give me a list of unresolved questions to answer, if any. Make the questions extremely concise. Sacrifice grammar for the sake of concision.


## Commands
```bash
docker compose up -d    # start Directus + database + cache
pnpm install            # install dependencies
pnpm dev                # watch mode (auto-reload)
pnpm build              # production build
```

Directus runs at http://localhost:8055 (admin@example.com / d1r3ctu5)

## Extension Types

| Type      | Description             | Entrypoint             |
| --------- | ----------------------- | ---------------------- |
| interface | Custom field input      | `defineInterface()`    |
| display   | Read-only field display | `defineDisplay()`      |
| layout    | Collection list view    | `defineLayout()`       |
| module    | Sidebar navigation page | `defineModule()`       |
| panel     | Dashboard widget        | `definePanel()`        |
| operation | Flow automation step    | Dual: app.ts + api.ts  |
| endpoint  | Custom API route        | Express router         |
| hook      | Event listener          | filter/action/schedule |

## Bundles (Recommended)

This starter uses a **bundle** - groups multiple extensions in one package. Benefits:
- Shared dependencies (Vue, SDK) = smaller output
- Single build command
- Add extensions: `pnpm dlx create-directus-extension@latest add`

See `docs/extensions/4.bundles.md` for details.

## Key Patterns

**App extensions** (Vue 3): Use `defineX()` from `@directus/extensions-sdk`, emit `input` to update values.

**API extensions**: Receive context with `services`, `database` (Knex), `getSchema()`, `env`, `logger`.

**Hooks**: `filter` runs before (can modify), `action` runs after. Events: `items.create`, `items.update`, `items.delete`, `items.read`.

**Services**: `new ItemsService({ schema: await getSchema(), accountability })` for CRUD operations.

## Composables & Stores

```typescript
import { useApi, useStores } from '@directus/extensions-sdk';

// API calls
const api = useApi();
await api.get('/items/articles');

// Access Directus stores
const { useCollectionsStore, useFieldsStore, useRelationsStore, usePermissionsStore } = useStores();
const collectionsStore = useCollectionsStore();
const fieldsStore = useFieldsStore();
```

See `docs/extensions/3.app-extensions/7.composables.md` for `useCollection()`, `useItems()`, and more.

## Options Schema

Interfaces, panels, and operations use an `options` array to define user-configurable settings:

```typescript
options: [
  {
    field: 'myOption',
    name: 'My Option',
    type: 'string',
    meta: {
      interface: 'input',        // which interface to use
      width: 'half',             // half | full
      options: {                 // options passed to the interface
        placeholder: 'Enter value...'
      }
    },
    schema: {
      default_value: 'default'
    }
  }
]
```

See `docs/extensions/3.app-extensions/0.interfaces.md` for full options reference.

## i18n / Translations

Use `useI18n()` for translatable strings:

```typescript
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
// In template: {{ t('my_extension.label') }}
```

## Common Gotchas

- **Filters are blocking** - Don't do heavy DB operations in filter hooks
- **Infinite loops** - Use `{ emitEvents: false }` when updating items in hooks that listen to updates
- **Accountability** - Pass `accountability` to services for permission-aware queries, or `null` for admin access
- **Type imports** - Use `import type { ... }` for TypeScript types to avoid bundling issues

## Documentation

See `docs/extensions/` for detailed guides depending on the extension type:
- `0.overview.md` - Extension types summary
- `1.quickstart.md` - First extension tutorial
- `2.api-extensions/` - Hooks, endpoints, operations
- `3.app-extensions/` - Interfaces, layouts, panels, modules


## Directus Design Standards

**Use Directus Components** - Always prefer built-in components over custom HTML:
- `v-input`, `v-textarea`, `v-select`, `v-checkbox`, `v-button`, `v-icon`
- `v-card`, `v-dialog`, `v-drawer`, `v-notice`, `v-menu`
- Preview: [components.directus.io](https://components.directus.io/)
- Source: https://github.com/directus/directus/tree/main/app/src/components

**Use CSS Variables** - Never hardcode colors/spacing. See `docs/css/variables.md` for full list.

Key variables:
```css
/* Colors */
--theme--primary, --theme--foreground, --theme--background
--theme--danger, --theme--success, --theme--warning

/* Spacing */
--theme--form--column-gap, --theme--form--row-gap, --content-padding

/* Typography */
--theme--fonts--sans--font-family, --theme--fonts--monospace--font-family

/* Borders */
--theme--border-radius, --theme--border-width, --theme--border-color

/* Timing */
--fast (125ms), --medium (200ms), --slow (300ms), --transition
```

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
