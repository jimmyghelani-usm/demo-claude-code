# Vite + React + TypeScript Project

A modern React application built with Vite, TypeScript, and best practices for code quality and testing.

## Features

- **Vite** - Lightning-fast builds and HMR
- **React 18** - Latest React with TypeScript
- **TypeScript** - Strict mode with comprehensive type checking
- **ESLint** - Modern flat config with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **Vitest** - Fast unit testing with React Testing Library
- **Path Aliases** - Clean imports with `@/` alias

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Available Scripts

#### Development

```bash
npm run dev
```

Starts the development server at `http://localhost:3000` with hot module replacement.

#### Building

```bash
npm run build
```

Type checks and builds the project for production. Output is in the `dist/` directory.

```bash
npm run preview
```

Preview the production build locally.

#### Testing

```bash
npm run test
```

Runs tests in watch mode.

```bash
npm run test:run
```

Runs tests once (useful for CI).

```bash
npm run test:ui
```

Launches the Vitest UI for interactive test debugging.

#### Code Quality

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

```bash
npm run lint:fix
```

Automatically fixes ESLint issues where possible.

```bash
npm run format
```

Formats code with Prettier.

```bash
npm run format:check
```

Checks if code is formatted correctly.

```bash
npm run type-check
```

Type checks the code without emitting files.

## Project Structure

```
demo-claude-code/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── test/           # Test setup and utilities
│   │   └── setup.ts    # Vitest setup file
│   ├── App.tsx         # Main App component
│   ├── App.test.tsx    # App component tests
│   ├── main.tsx        # Application entry point
│   ├── App.css         # App styles
│   └── index.css       # Global styles
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript project references
├── tsconfig.app.json   # App TypeScript config
├── tsconfig.node.json  # Node/tooling TypeScript config
├── eslint.config.js    # ESLint flat config
├── .prettierrc         # Prettier configuration
└── package.json        # Project dependencies and scripts
```

## Configuration Details

### Vite

- **Port**: Development server runs on port 3000
- **Build**: Optimized production builds with code splitting
- **HMR**: Hot module replacement enabled
- **Source Maps**: Enabled for debugging
- **Code Splitting**: React vendor chunk separated for better caching

### TypeScript

- **Strict Mode**: All strict type checking options enabled
- **Path Aliases**: `@/` maps to `./src/`
- **Target**: ES2020 for modern browser features
- **JSX**: `react-jsx` for automatic JSX transform

### ESLint

- **Config Format**: Modern flat config (ESLint 9+)
- **Rules**: Recommended rules for JavaScript, TypeScript, React, and React Hooks
- **React Refresh**: Enforces best practices for HMR
- **No Unused Vars**: Enforced with `_` prefix exceptions

### Prettier

- **Style**: Single quotes, no semicolons
- **Line Width**: 80 characters
- **Tab Width**: 2 spaces
- **Trailing Commas**: ES5 compatible

### Vitest

- **Environment**: jsdom for DOM testing
- **Globals**: Enabled for cleaner test syntax
- **Setup**: Automatic cleanup and jest-dom matchers
- **UI**: Interactive test UI available

## Tips

- Use `@/` for imports: `import { Component } from '@/components/Component'`
- Run `npm run lint:fix && npm run format` before committing
- All tests must pass before building
- TypeScript strict mode helps catch bugs early

## License

ISC
