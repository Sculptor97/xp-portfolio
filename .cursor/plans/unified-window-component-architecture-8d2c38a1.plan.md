<!-- 8d2c38a1-b8c8-489d-a770-9a194af16b28 9fce3d0e-cb69-4557-b698-463f8f64369a -->

# Unified Window Component Architecture

## Overview

Refactor the separate `XPWindow` and `XPExplorerHeader` components into a unified `Window` component system following shadcn's compound component pattern. The new architecture will provide a clean, composable API with consistent naming.

## Architecture Decisions

- **Window Title Bar**: Remains separate and built-in to Window component
- **WindowHeader**: Optional content below title bar (includes menu bar, navigation, address bar)
- **Naming**: Use `XP` prefix for all components (XPWindow, XPWindowHeader, etc.)
- **Migration**: Complete replacement - update all existing usages immediately

## Implementation Steps

### 1. Create New Unified Window Component

**File**: `src/components/window/Window.tsx`

Consolidate both XPWindow and XPExplorerHeader logic into a single file with compound components:

```tsx
// Main exports
- XPWindow (main container with title bar)
- XPWindowHeader (full explorer-style header)
- XPWindowHeaderMenuBar (File, Edit, View, etc.)
- XPWindowHeaderNavigation (Back, Forward, toolbar buttons)
- XPWindowHeaderAddressBar (address bar with progress)
- XPWindowHeaderNavItem (individual nav button)
- XPWindowBody (content area)
- XPWindowFooter (status bar)
```

**Key Changes**:

- Merge title bar logic from current XPWindow.tsx
- Merge header logic from XPExplorerHeader/XPExplorerHeader.tsx
- Keep all existing functionality (dragging, minimize/maximize, modal management)
- Internal progress bar management in AddressBar remains unchanged
- All CSS moved to Window.css

### 2. Consolidate Styles

**Files**:

- `src/components/window/Window.css` (merge both CSS files)
- Delete `src/components/XPExplorerHeader/XPExplorerHeader.css`

Combine:

- xp.css window styles (title-bar, window-body, etc.)
- XPExplorerHeader styles (menu-bar, navigation, address-bar, etc.)

### 3. Update Barrel Exports

**File**: `src/components/window/index.ts`

Export all components from single file:

```tsx
export {
  XPWindow,
  XPWindowHeader,
  XPWindowHeaderMenuBar,
  XPWindowHeaderNavigation,
  XPWindowHeaderAddressBar,
  XPWindowHeaderNavItem,
  XPWindowBody,
  XPWindowFooter,
} from './Window';
```

### 4. Update Contact Page

**File**: `src/pages/contact.tsx`

Migrate from old pattern:

```tsx
// OLD
<XPExplorerHeader>
  <XPExplorerHeader.NavItem />
</XPExplorerHeader>
```

To new pattern:

```tsx
// NEW
import { XPWindow, XPWindowHeader, XPWindowHeaderNavItem, XPWindowBody } from '@/components/window'

<XPWindow title="Contact" icon={...} id="contact">
  <XPWindowHeader icon="..." address="..." loading={...}>
    <XPWindowHeaderNavItem icon="..." label="Send Message" />
    <XPWindowHeaderNavItem icon="..." label="New Message" />
  </XPWindowHeader>
  <XPWindowBody>
    {/* form content */}
  </XPWindowBody>
</XPWindow>
```

### 5. Update ExplorerDemo Page

**File**: `src/pages/ExplorerDemo.tsx`

Update all examples to use new unified component API

### 6. Update Other Pages (if applicable)

Check and update:

- `src/pages/about.tsx`
- `src/pages/projects.tsx`
- Any other files using XPWindow or XPExplorerHeader

### 7. Cleanup Old Components

Delete deprecated files:

- `src/components/XPExplorerHeader/` (entire directory)
- Update `src/components/XPIcon.tsx` import paths if needed

### 8. Update Documentation

**File**: `src/components/window/README.md` (create new)

Document the new API with examples and usage patterns

## Technical Notes

- Maintain all existing functionality (dragging, modal management, progress bar)
- Keep internal state management for progress bar in AddressBar component
- Preserve all TypeScript interfaces with proper types
- Ensure all event handlers and callbacks work identically
- Test window focus, minimize, maximize, and close behaviors
- Verify progress bar animation during loading states

## Breaking Changes

- All imports must be updated from `XPExplorerHeader` to `XPWindowHeader`
- Component nesting structure changes but behavior remains the same
- CSS class names may change (prefixed with `xp-window-` instead of `xp-explorer-`)

### To-dos

- [ ] Create unified Window.tsx with all compound components (XPWindow, XPWindowHeader, XPWindowBody, XPWindowFooter, navigation components)
- [ ] Merge and consolidate CSS files into Window.css
- [ ] Update window/index.ts barrel exports
- [ ] Migrate contact.tsx to use new unified Window component
- [ ] Update ExplorerDemo.tsx to use new component API
- [ ] Update any other pages using window/header components
- [ ] Delete old XPExplorerHeader directory and files
- [ ] Test all window functionality and verify no regressions
