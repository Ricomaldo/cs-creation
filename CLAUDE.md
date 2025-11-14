# CLAUDE.md - C&S Création Development Guide

## 🎨 Project Overview

**C&S Création** is an immersive art portfolio website for an onirologue artist, designed to create an emotional journey from dreamlike contemplation to professional gallery experience. This is not a standard e-commerce site, but a digital artistic springboard positioning the artist at the level of contemporary art galleries.

### Key Artistic Vision
- **Journey**: Dreamlike awakening → Contemplative experience → Professional gallery
- **Metaphor**: From pink dawn to museum white
- **Philosophy**: Create contact with the artist, not just a product gallery
- **Positioning**: Contemporary art galleries, collectors, curators

### Artistic Universe
- **Dreamlike & animal** - Dreamed creatures, organic forms
- **Forest folk** - Tales, fairies, natural magic
- **Celestial & ancestral works** - Cosmos/earth connection
- **Contemporary minimalism** - Refinement, revealed essence

---

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15.3.2 (App Router)
- **Runtime**: React 19.0.0
- **Styling**: SCSS with CSS Modules
- **Package Manager**: Yarn 4.9.1
- **Language**: JavaScript (ES6+)

### Key Dependencies
- `sass` (1.89.0) - SCSS compilation
- `critters` (0.0.24) - Critical CSS inlining
- Next.js built-in image optimization (WebP/AVIF)

### Dev Dependencies
- ESLint with Next.js config
- Jest + React Testing Library
- Jest Environment JSDOM

---

## 📁 Directory Structure

```
cs-creation/
├── public/                      # Static assets
│   └── assets/
│       ├── gallery/            # Gallery artwork images
│       └── onboarding/         # Onboarding rotation frames
│           ├── arbre/          # 72 frames of tree artwork
│           └── oeuf/           # 72 frames of egg artwork
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js          # Root layout with fonts
│   │   ├── page.js            # Home page (onboarding flow)
│   │   ├── portfolio/         # Portfolio page (ready)
│   │   ├── boutique/          # Shop page (stub)
│   │   ├── insights/          # Insights/blog page (stub)
│   │   ├── agenda/            # Events page (stub)
│   │   └── contact/           # Contact page (stub)
│   │
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── GalleryLayout/ # Main gallery layout wrapper
│   │   │   └── Navigation/    # Navigation component
│   │   │
│   │   ├── onboarding/        # Onboarding sequence components
│   │   │   ├── OnboardingSequence/  # Main sequence orchestrator
│   │   │   ├── RotatingArtwork/     # Scroll-based rotation
│   │   │   └── WelcomeTransition/   # Transition to gallery
│   │   │
│   │   └── ui/                # Reusable UI components
│   │       ├── Button/
│   │       ├── ArtworkCard/
│   │       ├── ArtworkGallery/
│   │       ├── ArtworkModal/
│   │       ├── CategoryFilter/
│   │       └── index.js       # Barrel export
│   │
│   ├── data/                  # Static JSON data
│   │   ├── gallery.json       # Artwork catalog
│   │   └── onboardingCitations.json  # Poetic quotes
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useRotationScroll.js  # Scroll-based frame rotation
│   │
│   └── styles/                # Global styles
│       ├── globals.scss       # Global CSS reset & utilities
│       ├── tokens.scss        # Design tokens (CRITICAL)
│       └── mixins.scss        # SCSS mixins (CRITICAL)
│
├── .vscode/
│   └── settings.json          # Cursor/Claude system prompt
│
├── jsconfig.json              # Path aliases (@/*)
├── next.config.js             # Next.js configuration
├── package.json               # Dependencies
├── BRIEFING_PROJET.md         # Full artistic briefing (READ THIS!)
└── README.md                  # Basic Next.js readme
```

---

## 🎨 Design System

### Design Tokens (`src/styles/tokens.scss`)

**CRITICAL RULE**: ALWAYS use design tokens. NEVER use hardcoded values in component styles.

#### Color Palette

**Onboarding Theme - Dawn/Ochre**
```scss
--ocre-intense: #D4A631     // Primary accent
--ocre-doux: #E6C55A        // Soft transitions
--ocre-whisper: #F4E6A8     // Light fades
--ocre-nacre: #FAF2D3       // Background
--rose-delicat: #E8B5C7     // Poetic accents
```

**Gallery Theme - Museum White**
```scss
--museal-blanc: #FFFFFF      // Pure white
--museal-soft: #FDFDFD       // Soft white
--museal-creme: #F8F8F8      // Cream background
--museal-separateur: #E8E8E8 // Separators
--museal-charcoal: #1A1A1A   // Text/sophistication
--museal-charcoal-soft: #2D2D2D
```

#### Spacing Scale
```scss
--space-xs: 0.5rem   // 8px
--space-sm: 1rem     // 16px
--space-md: 1.5rem   // 24px
--space-lg: 2rem     // 32px
--space-xl: 3rem     // 48px
--space-xxl: 4rem    // 64px
```

#### Typography Scale
```scss
--text-xs: 0.75rem   // 12px
--text-sm: 0.875rem  // 14px
--text-base: 1rem    // 16px
--text-lg: 1.125rem  // 18px
--text-xl: 1.25rem   // 20px
--text-2xl: 1.5rem   // 24px
--text-xxl: 2rem     // 32px
--text-3xl: 1.875rem // 30px
```

#### Font Families
```scss
--font-interface: var(--font-inter)  // Inter (300, 400, 600)
--font-poetry: var(--font-crimson)   // Crimson Text - ONLY for quotes
```

#### Transitions
```scss
--transition-fast: 0.15s ease
--transition-base: 0.3s ease
--transition-slow: 0.6s ease
```

#### Border Radius
```scss
--radius-sm: 0.25rem
--radius-md: 0.5rem
--radius-lg: 1rem
--radius-full: 9999px
```

### Theme System

Components can be themed using data attributes:
```html
<div data-theme="onboarding">  <!-- Dawn theme -->
<div data-theme="gallery">     <!-- Museum theme -->
```

Theme-aware CSS variables:
```scss
--bg-primary
--bg-secondary
--text-primary
--accent
--accent-soft
```

### SCSS Mixins (`src/styles/mixins.scss`)

**ALWAYS prefer mixins over writing custom styles:**

```scss
@use '@/styles/mixins';

// Smooth transitions
@include mixins.transition-smooth(all, 0.3s);

// Hover lift effect
@include mixins.hover-lift;

// Artwork overlay (for modals)
@include mixins.artwork-overlay;

// Ochre gradient
@include mixins.ocre-gradient(0.8);

// Responsive grid
@include mixins.responsive-grid(1, 2, 3); // mobile, tablet, desktop

// Center absolute positioning
@include mixins.center-absolute;

// Sticky centered positioning
@include mixins.sticky-center;
```

---

## 🏗️ Architecture Patterns

### Component Structure

Every component follows this pattern:
```
ComponentName/
├── ComponentName.jsx         # Component logic
├── ComponentName.module.scss # Scoped styles
└── ComponentName.test.js     # Tests (optional)
```

### Component Guidelines

1. **Naming**: PascalCase for components, camelCase for files
2. **Exports**: Named exports for components (easier to search)
3. **Props**: Destructure in function signature with defaults
4. **Client Components**: Use `'use client'` directive when needed (state, effects, events)
5. **Styles**: Always use CSS Modules with `.module.scss`
6. **Imports**: Use `@/` alias for absolute imports from `src/`

### Example Component Template

```jsx
'use client' // If needed

import { useState } from 'react'
import styles from './ComponentName.module.scss'

export const ComponentName = ({
  prop1,
  prop2 = 'default',
  onAction
}) => {
  const [state, setState] = useState(null)

  const handleEvent = () => {
    // logic
    onAction?.()
  }

  return (
    <div className={styles.wrapper}>
      {/* content */}
    </div>
  )
}
```

### State Management

Currently **no external state management** - using:
- React `useState` for local state
- Props for parent-child communication
- Context API for cross-component state (not yet implemented)

Future: May add Zustand or Context API for cart/user preferences.

### Data Flow

1. **Static Data**: JSON files in `src/data/`
2. **Phase Transitions**: Lifted state in `page.js` (onboarding → welcome → gallery)
3. **Component State**: Local useState for UI interactions

---

## 🎭 Key Features

### 1. Onboarding Sequence

**File**: `src/app/page.js`

Three-phase experience:
1. **Onboarding** (`OnboardingSequence`) - Dawn theme, rotating artworks, poetic quotes
2. **Welcome** (`WelcomeTransition`) - Misty transition with particles
3. **Gallery** (`GalleryLayout`) - Museum theme, professional layout

Phase management:
```jsx
const [currentPhase, setCurrentPhase] = useState('onboarding')
// Phases: 'onboarding' → 'welcome' → 'gallery'
```

### 2. Rotating Artwork

**File**: `src/components/onboarding/RotatingArtwork/RotatingArtwork.jsx`

- 72 frames per artwork (full 360° rotation)
- Scroll-based frame changes
- Uses custom hook `useRotationScroll`
- Frames stored in `public/assets/onboarding/{artwork}/`

Frame naming convention: `{artwork}-{index}.webp` (e.g., `arbre-0.webp` to `arbre-71.webp`)

### 3. Navigation

**File**: `src/components/layout/Navigation/Navigation.jsx`

Hierarchy (as per artistic vision):
1. Portfolio (creative essence)
2. Boutique (natural commercial transition)
3. Insights (studio intimacy)
4. Agenda (events, exhibitions)
5. Contact (personal engagement)

Responsive:
- Desktop: 240px fixed left sidebar
- Mobile: Drawer/hamburger menu

### 4. Gallery System

**Data**: `src/data/gallery.json`

Artwork schema:
```json
{
  "id": 1,
  "nom": "Artwork Name",
  "technique": "Technique description",
  "annee": 2024,
  "dimensions": "40 x 30 cm",
  "prix": 180,
  "description": "Poetic description",
  "disponible": true,
  "featured": false,
  "image": "assets/gallery/filename.webp",
  "category": "category-slug"
}
```

Categories:
- `paysages-oniriques` - Dreamlike landscapes
- `portraits-poetiques` - Poetic portraits
- `collages-intimes` - Intimate collages
- `sculptures-feériques` - Fairy sculptures

---

## 🎯 Development Workflows

### Starting Development

```bash
# Install dependencies (if needed)
yarn install

# Start dev server
yarn dev

# Open http://localhost:3000
```

**IMPORTANT**: The dev server is managed by Eric (the developer). Do not suggest starting/stopping it unless debugging is required.

### Building for Production

```bash
# Build optimized production bundle
yarn build

# Test production build locally
yarn start

# Run linter
yarn lint
```

### Path Aliases

Always use `@/` for imports from `src/`:

```jsx
// ✅ Good
import { Button } from '@/components/ui'
import styles from '@/styles/tokens.scss'

// ❌ Bad
import { Button } from '../../../components/ui'
```

### Adding New Components

1. Create component folder in appropriate category (ui/layout/onboarding)
2. Create `.jsx`, `.module.scss`, and optionally `.test.js`
3. Use design tokens and mixins
4. Export from `index.js` if in ui/
5. Write tests if component has complex logic

### Adding New Pages

1. Create folder in `src/app/{page-name}/`
2. Create `page.js` (and optionally `layout.js`)
3. Pages are automatically routed by Next.js
4. Use `'use client'` if interactive

---

## 🎨 Styling Best Practices

### ABSOLUTE RULES

1. **NEVER use hardcoded values** - Always use tokens
2. **NEVER skip mixins** - Reuse existing patterns
3. **NEVER use inline styles** - Use CSS Modules
4. **NEVER use global classes** - Scope with modules

### Good Styling Examples

```scss
// ✅ GOOD - Uses tokens and mixins
@use '@/styles/tokens';
@use '@/styles/mixins';

.card {
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);

  @include mixins.transition-smooth(transform);
  @include mixins.hover-lift;
}

// ❌ BAD - Hardcoded values
.card {
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
```

### Responsive Design

Use mobile-first approach:

```scss
.container {
  // Mobile (default)
  padding: var(--space-sm);

  // Tablet
  @media (min-width: 768px) {
    padding: var(--space-md);
  }

  // Desktop
  @media (min-width: 1024px) {
    padding: var(--space-lg);
  }
}
```

Or use the responsive-grid mixin:

```scss
.gallery {
  @include mixins.responsive-grid(1, 2, 3);
}
```

### Animation Philosophy

From BRIEFING_PROJET.md:

- **Floating particles** - Lightness, discreet magic
- **Pulsing halos** - Living breath of artworks
- **Fade transitions** - Never brutal breaks
- **Hover states** - Progressive metadata revelation
- **NO scroll hijacking** - Fluid rotation without forced scrolling
- **Depth effects** - drop-shadow over rigid borders
- **Progressive appearances** - opacity + subtle translateY
- **Luminous breathing** - organic keyframes

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run specific test file
yarn test Button.test.js
```

### Test Structure

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', () => {
    const mockHandler = jest.fn()
    render(<ComponentName onAction={mockHandler} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockHandler).toHaveBeenCalled()
  })
})
```

### Testing Guidelines

- Test user behavior, not implementation details
- Use accessible queries (getByRole, getByLabelText)
- Mock external dependencies
- Test error states and edge cases
- Keep tests simple and focused

---

## 🔀 Git Workflow

### Branch Naming

- Feature branches: `claude/claude-md-{session-id}`
- Must start with `claude/` and end with matching session ID
- Otherwise push will fail with 403 error

### Commit Messages

Follow repository style (see `git log`):

```bash
# Good commit messages
"Add artwork rotation feature with scroll-based frame changes"
"Fix navigation mobile drawer animation timing"
"Update gallery data schema with featured flag"

# Format: Imperative mood, clear summary
```

### Push with Retries

Network failures should retry up to 4 times with exponential backoff:

```bash
git push -u origin <branch-name>
# If failed: wait 2s, retry
# If failed: wait 4s, retry
# If failed: wait 8s, retry
# If failed: wait 16s, retry
```

### Pre-commit Checklist

- [ ] All tests passing
- [ ] Linter clean (`yarn lint`)
- [ ] No console.log statements
- [ ] Used design tokens (no hardcoded values)
- [ ] Mobile responsive tested
- [ ] Accessibility checked (keyboard nav, ARIA labels)

---

## ♿ Accessibility Guidelines

### ARIA & Semantic HTML

```jsx
// ✅ Good - Semantic + ARIA
<nav aria-label="Main navigation">
  <button
    aria-label="Close modal"
    aria-expanded={isOpen}
  >
</nav>

// ❌ Bad - Divs without roles
<div onClick={handleClick}>Click me</div>
```

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Focus states must be visible
- Logical tab order
- ESC to close modals/menus

### Touch Targets

Minimum touch target: **44px × 44px** (mobile)

```scss
.button {
  min-width: 44px;
  min-height: 44px;
  padding: var(--space-sm) var(--space-md);
}
```

### Color Contrast

- Text on backgrounds must meet WCAG AA standards
- Never rely on color alone for information
- Test with accessibility tools

---

## 🚀 Performance Optimization

### Image Optimization

Next.js automatically optimizes images:

```jsx
import Image from 'next/image'

<Image
  src="/assets/gallery/artwork.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"  // Default for images not in viewport
  priority        // For above-fold images
/>
```

### Configuration (next.config.js)

```js
{
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,  // 1 year
  },
  experimental: {
    optimizeCss: true,  // Critical CSS inlining
  }
}
```

### Best Practices

1. **Lazy load** images below the fold
2. **WebP format** for all photos
3. **Proper sizing** - don't serve 4K images for thumbnails
4. **Minimize JS bundles** - code splitting with dynamic imports
5. **SCSS compilation** - only import used mixins

---

## 🐛 Common Issues & Solutions

### Issue: Styles not applying

**Solution**: Check that you're:
1. Importing the `.module.scss` file correctly
2. Using `styles.className` syntax
3. Not using global class names

### Issue: Path alias not working

**Solution**:
1. Restart dev server after changing `jsconfig.json`
2. Ensure using `@/` not `@` alone
3. Check file exists at path

### Issue: Component not re-rendering

**Solution**:
1. Ensure state is updated correctly (useState)
2. Check if props are changing
3. Use React DevTools to debug state

### Issue: Build fails but dev works

**Solution**:
1. Check for dynamic imports without `'use client'`
2. Ensure no server-only code in client components
3. Run `yarn build` locally to debug

### Issue: Rotation frames not loading

**Solution**:
1. Check frame naming: `{artwork}-{index}.webp`
2. Ensure frames are in `public/assets/onboarding/{artwork}/`
3. Check totalFrames prop matches actual frame count
4. Verify file extensions are lowercase

---

## 📋 Common Tasks Reference

### Add a new artwork to gallery

1. Add image to `public/assets/gallery/`
2. Edit `src/data/gallery.json`:
```json
{
  "id": 6,
  "nom": "New Artwork",
  "technique": "Medium",
  "annee": 2024,
  "dimensions": "40 x 30 cm",
  "prix": 200,
  "description": "Description",
  "disponible": true,
  "featured": false,
  "image": "assets/gallery/new-artwork.webp",
  "category": "category-slug"
}
```

### Add a new onboarding citation

Edit `src/data/onboardingCitations.json`:
```json
{
  "id": "unique-id",
  "text": "Poetic quote text",
  "author": "C&S Création"
}
```

### Add a new page

```bash
# Create page directory
mkdir src/app/new-page

# Create page.js
echo "'use client'
export default function NewPage() {
  return <div>New Page</div>
}" > src/app/new-page/page.js

# Page now available at /new-page
```

### Create a new UI component

```bash
# Create component directory
mkdir -p src/components/ui/NewComponent

# Create files
touch src/components/ui/NewComponent/NewComponent.jsx
touch src/components/ui/NewComponent/NewComponent.module.scss
touch src/components/ui/NewComponent/NewComponent.test.js

# Export from ui/index.js
echo "export { NewComponent } from './NewComponent/NewComponent'" >> src/components/ui/index.js
```

### Add a new design token

Edit `src/styles/tokens.scss`:
```scss
:root {
  --new-token: value;
}
```

### Add a new mixin

Edit `src/styles/mixins.scss`:
```scss
@mixin new-mixin($param: default) {
  // styles
}
```

---

## 🎓 Key Concepts for AI Assistants

### Project Philosophy

This is **NOT**:
- ❌ A generic e-commerce site
- ❌ A template-based portfolio
- ❌ A quick "buy now" shopping cart

This **IS**:
- ✅ An immersive artistic experience
- ✅ A contemplative journey
- ✅ A positioning tool for galleries
- ✅ A bridge between dream and professionalism

### Design Principles

1. **Contemplation before commerce** - Users should feel, then consider buying
2. **No brutal breaks** - All transitions are smooth and vaporous
3. **Organic animations** - Breathing, floating, pulsing
4. **Institutional sophistication** - Gallery-level presentation
5. **Mobile-first but desktop-optimized** - Both matter equally
6. **Accessibility is non-negotiable** - Everyone experiences the art

### When to Ask vs. Infer

**Ask the user when**:
- Changing the artistic vision or theme
- Modifying color palette beyond tokens
- Adding/removing navigation items
- Changing page hierarchy
- Altering the onboarding sequence

**Infer and proceed when**:
- Fixing bugs or accessibility issues
- Optimizing performance
- Adding missing tests
- Following established patterns
- Using design tokens correctly

### Reading List for Context

**MUST READ FIRST**:
1. `BRIEFING_PROJET.md` - Complete artistic vision
2. `src/styles/tokens.scss` - Design system
3. `src/styles/mixins.scss` - Reusable patterns
4. `src/app/page.js` - Architecture example
5. `.vscode/settings.json` - Kira's system prompt (artistic context)

### Communication Style

When working on this project:
- **Be poetic but precise** - Match the artistic tone
- **Suggest harmonious solutions** - Visual coherence matters
- **Encourage gentle experimentation** - Not aggressive changes
- **Respect the contemplative nature** - No flashy/aggressive UX

---

## 📞 Getting Help

### Documentation Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **SCSS Docs**: https://sass-lang.com/documentation
- **Testing Library**: https://testing-library.com/react

### Project-Specific Questions

Check these files for answers:
- **Artistic vision**: `BRIEFING_PROJET.md`
- **Design system**: `src/styles/tokens.scss`, `src/styles/mixins.scss`
- **Architecture patterns**: Existing components in `src/components/`
- **Data schemas**: `src/data/*.json`

### VS Code / Cursor Configuration

The `.vscode/settings.json` contains Kira's system prompt with:
- Artistic universe context
- Technical rules
- Philosophy
- Tone guidelines

Respect these guidelines when contributing.

---

## 🎯 Phase Roadmap

### Phase 1 (Current) - Completed
- ✅ Onboarding contemplative sequence functional
- ✅ Navigation gallery layout refined
- ✅ Content pages prepared (stubs)
- ✅ Design system with tokens and mixins
- ✅ Rotating artwork with scroll interaction
- ✅ Theme system (onboarding ↔ gallery)

### Phase 2 (Next)
- 🔄 Interactive gallery with metadata
- 🔄 Minimalist admin interface
- 🔄 Integrated shop (replacing Wix)
- 🔄 Cart and checkout flow
- 🔄 Product management

### Phase 3 (Future)
- ⏳ Event reservation system
- ⏳ Behavioral analytics
- ⏳ Artistic SEO optimization
- ⏳ Blog/Insights CMS
- ⏳ Newsletter integration

---

## 🏁 Final Notes

### For AI Assistants Working on This Project

1. **Read `BRIEFING_PROJET.md` first** - It contains the soul of the project
2. **Use design tokens religiously** - No hardcoded values ever
3. **Respect the artistic journey** - Contemplation → Gallery
4. **Keep animations organic** - Smooth, breathing, floating
5. **Mobile-first, always** - But optimize desktop too
6. **Test accessibility** - Keyboard nav, ARIA, contrast
7. **Follow established patterns** - Look at existing components
8. **Ask when unsure about artistic decisions** - But proceed with technical fixes

### Key Files to Reference

- `BRIEFING_PROJET.md` - Artistic vision (primary reference)
- `src/styles/tokens.scss` - Design system source of truth
- `src/app/page.js` - Architecture pattern example
- `src/components/onboarding/OnboardingSequence/OnboardingSequence.jsx` - Complex component example
- `.vscode/settings.json` - Kira's artistic context

### Success Metrics

You're doing well if:
- ✅ All values use design tokens
- ✅ Components follow established patterns
- ✅ Animations feel organic and smooth
- ✅ Code is accessible (ARIA, keyboard nav)
- ✅ Mobile experience is seamless
- ✅ Build passes without errors
- ✅ Tests cover user behavior
- ✅ Git commits are clear and atomic

---

**Last Updated**: 2025-11-14
**Project Status**: Phase 1 Complete, Phase 2 In Planning
**Maintained By**: Eric & Kira (via Claude)

*"Transform each visit into a true artistic encounter, where technology disappears in favor of pure emotion."*
