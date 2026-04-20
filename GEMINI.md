# GEMINI.md - Servecly 

## Project Overview
Servecly is a professional-grade service marketplace frontend designed with architectural precision for a two-sided economy. It connects vetted professionals ("Taskers") with users needing assistance with home repairs, moving, assembly, and other services.

### Core Technologies
- **Framework:** React 19
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS (Custom Material Design 3 inspired theme)
- **Routing:** React Router 7
- **Linting:** ESLint 9

### Architecture
The project follows a standard React/Vite structure:
- `src/main.jsx`: Application entry point.
- `src/App.jsx`: Central routing configuration and main application logic.
- `src/layouts/`: Contains layout components like `MainLayout.jsx` which provides consistent header/footer structure.
- `src/pages/`: Individual page components representing different application views.
- `src/components/`: Reusable UI components (e.g., `TaskCard`, `TaskList`).
- `src/assets/`: Static resources like images and SVG icons.

## Building and Running

### Development
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production
Build the application for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

### Quality Control
Run ESLint to check for code quality and style issues:
```bash
npm run lint
```

## Development Conventions

### Styling & Theme
The project uses a custom Tailwind CSS theme located in `tailwind.config.js`. It follows Material Design 3 (M3) naming conventions:
- **Colors:** `primary`, `secondary`, `tertiary`, `surface`, `on-surface`, `error`.
- **Containers:** `surface-container-low`, `surface-container-highest`, etc.
- **Fonts:** `Inter` for body text (sans) and `Manrope` for headings (display).

### Component Structure
- Use **Functional Components** with hooks.
- Prefer **Vanilla CSS** or **Tailwind CSS** for styling.
- Layouts should be used as wrappers in `App.jsx` or within individual pages.

### Routing
All routes are managed in `src/App.jsx`. New pages should be added to the `src/pages` directory and registered in the `Routes` component.

### Assets
Icons are managed through `public/icons.svg` (SVG sprites) or individual SVGs in `src/assets`.
