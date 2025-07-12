# Adding V0.dev Components to FridgeChef

## What is V0.dev?
V0.dev is a UI component generator by Vercel that creates beautiful, accessible components using shadcn/ui.

## How to Add V0.dev Components

### Step 1: Get Your Component Code
1. Go to your v0.dev URL
2. Copy the component code
3. Note which shadcn components it uses

### Step 2: Install Required Dependencies
If the v0.dev component uses shadcn components you don't have, install them:

```bash
npx shadcn@latest add [component-name]
```

Common components you might need:
- `button`, `card`, `input`, `textarea`
- `select`, `badge`, `dialog`, `form`
- `label`, `separator`, `avatar`

### Step 3: Create Your Component File
1. Create a new file in `/components/` (e.g., `MyV0Component.tsx`)
2. Paste your v0.dev component code
3. Update imports to use the correct paths

### Step 4: Use Your Component
Import and use your component in your pages:

```tsx
import { MyV0Component } from '@/components/MyV0Component'

export default function Page() {
  return (
    <div>
      <MyV0Component />
    </div>
  )
}
```

## Example: Adding a Recipe Card Component

If you have a v0.dev recipe card component:

1. **Install dependencies:**
```bash
npx shadcn@latest add card badge button
```

2. **Create the component:**
```tsx
// components/RecipeCardV0.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function RecipeCardV0({ recipe }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{recipe.name}</CardTitle>
        <Badge>{recipe.culture}</Badge>
      </CardHeader>
      <CardContent>
        <p>{recipe.description}</p>
        <Button>View Recipe</Button>
      </CardContent>
    </Card>
  )
}
```

3. **Use in your app:**
```tsx
import { RecipeCardV0 } from '@/components/RecipeCardV0'
```

## Troubleshooting

### Import Errors
- Make sure you've installed the required shadcn components
- Check that import paths are correct (use `@/components/ui/`)

### Styling Issues
- V0.dev components use Tailwind CSS classes
- Make sure your `tailwind.config.ts` includes all necessary paths

### TypeScript Errors
- Add proper TypeScript interfaces for your component props
- Use the `@/lib/utils` import for the `cn` utility function

## Available Shadcn Components

You can install any of these components:
- `accordion`, `alert`, `alert-dialog`
- `avatar`, `badge`, `button`
- `calendar`, `card`, `checkbox`
- `collapsible`, `command`, `context-menu`
- `dialog`, `drawer`, `dropdown-menu`
- `form`, `hover-card`, `input`
- `label`, `menubar`, `navigation-menu`
- `popover`, `progress`, `radio-group`
- `scroll-area`, `select`, `separator`
- `sheet`, `skeleton`, `slider`
- `switch`, `table`, `tabs`
- `textarea`, `toast`, `toggle`
- `tooltip`

## Your V0.dev URL
If you want to share the specific component from your v0.dev URL, you can:
1. Copy the component code
2. Create a new component file
3. I can help you integrate it properly

The URL you provided: `https://v0.dev/chat/b/b_d0P4WEWDdkg?token=...`
contains a specific component that you'd like to add to your FridgeChef app. 