# XP Explorer Header Component

A highly composable Windows XP Explorer-style header component that replicates the classic Luna theme interface with modern React patterns.

## Features

- **Highly Composable**: Three main parts (Toolbar, Navigation, AddressBar) that can be used independently
- **Authentic XP Styling**: Matches the Windows XP Luna theme with proper gradients, shadows, and interactions
- **Customizable Navigation**: Default navigation items plus custom items via children
- **Loading States**: Built-in loading animation for the address bar
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Responsive Design**: Works well across different screen sizes

## Component Structure

The header consists of three main sections:

1. **Toolbar**: Contains the application icon, label, and Windows XP logo
2. **Navigation Bar**: Default navigation items (Back, Forward, Up, etc.) plus custom items
3. **Address Bar**: Shows current location with optional loading animation

## Usage

### Basic Usage

```tsx
import XPExplorerHeader from '@/components/XPExplorerHeader';

<XPExplorerHeader
  icon="/assets/vscode.webp"
  label="Visual Studio Code"
  address="C:\\Documents\\MyProject"
  loading={false}
>
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Refresh"
    onClick={() => console.log('Refresh clicked')}
    variant="primary"
  />
</XPExplorerHeader>;
```

### Props

#### XPExplorerHeader Props

| Prop        | Type              | Default | Description                            |
| ----------- | ----------------- | ------- | -------------------------------------- |
| `icon`      | `string`          | -       | URL to the application icon            |
| `label`     | `string`          | -       | Application name/label                 |
| `loading`   | `boolean`         | `false` | Shows loading animation in address bar |
| `address`   | `string`          | -       | Current address/path to display        |
| `children`  | `React.ReactNode` | -       | Custom navigation items                |
| `className` | `string`          | -       | Additional CSS classes                 |

#### XPExplorerNavItem Props

| Prop           | Type                                    | Default     | Description            |
| -------------- | --------------------------------------- | ----------- | ---------------------- |
| `icon`         | `string`                                | -           | URL to the button icon |
| `label`        | `string`                                | -           | Button text            |
| `onClick`      | `() => void`                            | -           | Click handler          |
| `disabled`     | `boolean`                               | `false`     | Disable the button     |
| `variant`      | `'default' \| 'primary' \| 'secondary'` | `'default'` | Button style variant   |
| `showDropdown` | `boolean`                               | `false`     | Show dropdown arrow    |
| `className`    | `string`                                | -           | Additional CSS classes |

### Variants

- **default**: Standard gray button
- **primary**: Blue button (like the Back button)
- **secondary**: Yellow button (like the Up button)

### Default Navigation Items

The navigation bar includes these default items:

- Back (primary variant, with dropdown)
- Forward (disabled by default)
- Up (secondary variant)
- Move To (disabled by default)
- Copy To (disabled by default)
- Search
- Folders

## Examples

### File Explorer

```tsx
<XPExplorerHeader
  icon="/assets/arrow.webp"
  label="My Documents"
  address="C:\\Documents"
>
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="New Folder"
    onClick={() => createFolder()}
  />
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Properties"
    onClick={() => showProperties()}
  />
</XPExplorerHeader>
```

### Image Viewer

```tsx
<XPExplorerHeader
  icon="/assets/picture_viewer.png"
  label="Windows Picture and Fax Viewer"
  address="C:\\Pictures\\vacation.jpg"
>
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Previous"
    onClick={() => previousImage()}
    variant="primary"
  />
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Next"
    onClick={() => nextImage()}
    variant="primary"
  />
</XPExplorerHeader>
```

### Web Browser

```tsx
<XPExplorerHeader
  icon="/assets/IE.png"
  label="Internet Explorer"
  address="https://www.microsoft.com"
  loading={isLoading}
>
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Home"
    onClick={() => goHome()}
    variant="primary"
  />
  <XPExplorerHeader.NavItem
    icon="/assets/arrow.webp"
    label="Favorites"
    showDropdown
    onClick={() => showFavorites()}
  />
</XPExplorerHeader>
```

## Styling

The component uses CSS classes that follow the XP Explorer naming convention:

- `.xp-explorer-header`: Main container
- `.xp-explorer-toolbar`: Toolbar section
- `.xp-explorer-navigation`: Navigation bar section
- `.xp-explorer-address-bar`: Address bar section
- `.xp-explorer-nav-item`: Individual navigation buttons
- `.xp-explorer-address-input`: Address input field
- `.xp-explorer-go-button`: Go button
- `.xp-explorer-separator`: Separator between navigation groups

## Accessibility

- All buttons have proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Proper focus management

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ (with appropriate polyfills)
- Mobile responsive design

## Demo

See the `ExplorerDemo` page for comprehensive examples of all features and use cases.
