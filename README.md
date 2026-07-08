# Sanity Visual Editing Demo

A stripped-back Sanity playground for testing **constraint-driven visual editing** — inspired by the patterns in [Theo's video](https://youtu.be/e9aTmEoBKzI).

## What this demo proves

- **Design-system-as-editor**: Themes, alignment, measure, spacing, and section order are all controlled with a narrow set of approved options — not free-text fields editors will break.
- **Constrained section builder**: Only two section types (Hero/CTA and Content), with guardrails on which props appear in which contexts.
- **Presentation Tool**: Click-to-edit on the frontend. Drag sections to reorder. Live preview.
- **Button grouping**: An array of buttons with auto-styling — the first is primary, the second is secondary, but editors can override.

## Try it now (no setup needed)

The demo works in static mode without any Sanity project. It renders pre-seeded content using the same React components the CMS drives.

```bash
cd sanity-visual-demo/frontend
cp .env.local.example .env.local  # already done — uses demo project for read-only
npm run dev
```

Open `http://localhost:3000`. You'll see three demo sections with a notice that Sanity isn't connected.

## Connect to a real Sanity project

### 1. Create a Sanity project

```bash
cd sanity-visual-demo
npx sanity login
npx sanity init --bare --project-name "Visual Editing Demo" --dataset production
```

### 2. Update environment variables

Edit `frontend/.env.local` with your project ID and dataset:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

For live preview and draft mode, also set:

```env
SANITY_API_READ_TOKEN="sk..."  # Create in sanity.io/manage → API → Tokens
```

### 3. Start both servers

```bash
# Terminal 1 — Studio (CMS editing)
cd studio && npm run dev

# Terminal 2 — Frontend (visual preview)
cd frontend && npm run dev
```

Open:
- **`http://localhost:3333`** — Sanity Studio (create a Page with slug "home")
- **`http://localhost:3000`** — Frontend with Presentation Tool (click to edit)

### 4. Create a home page

In the Studio, create a new Page with slug `home`. Add some sections and test:
- **Drag sections** to reorder
- **Click fields** from the Presentation preview to edit inline
- **Switch themes** and watch the preview update
- **Add/remove buttons** — the auto-styling handles primary/secondary
- **Flip visual modes** (none → inline → background) on the CTA section

## Schema highlights

### Hero/CTA Section (`callToAction`)
- Content, Buttons, Visuals, Layout groups
- `visualMode`: none | inline | background (fields hide conditionally)
- `contentWidth`: compact | comfortable | wide (enforced presets)
- `buttons`: array, max 2, auto-styling or manual override
- `theme`: light | dark | accent
- `overlayStrength`: slider (only when using background mode)

### Content Section (`infoSection`)
- `theme`: light | tint | ink
- `measure`: compact | comfortable | wide | auto (reading width presets)
- `showDivider`: toggle
- Top/bottom spacing from a shared preset list

### Buttons
- `style`: auto (first=primary, second=secondary) | primary | secondary | ghost
- Links use the shared link object with conditional field visibility

## Structure

```
sanity-visual-demo/
├── studio/             # Sanity Studio (schema, structure, presentation tool)
│   ├── sanity.config.ts
│   └── src/
│       ├── schemaTypes/
│       │   ├── documents/page.ts
│       │   ├── objects/callToAction.ts, infoSection.ts, button.ts, link.ts
│       │   └── singletons/settings.tsx
│       ├── structure/
│       └── lib/initialValues.ts
├── frontend/           # Next.js app (barebones preview)
│   ├── app/
│   │   ├── page.tsx           # Root → renders home page or static demo
│   │   ├── demo-data.ts       # Static fallback content
│   │   └── components/
│   │       ├── Cta.tsx, InfoSection.tsx, BlockRenderer.tsx
│   │       ├── DemoPageBuilder.tsx
│   │       └── PageBuilder.tsx  # Live-preview version with useOptimistic
│   └── sanity/lib/
│       ├── queries.ts
│       └── types.ts
└── README.md
```
