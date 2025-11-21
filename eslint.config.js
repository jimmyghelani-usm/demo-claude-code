// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [// Ignore patterns
{
  ignores: ['dist', 'node_modules', '.vite', 'build', 'storybook-static', '**/*.md', '**/*.txt'],
}, // Base configuration for all files
{
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: tsparser,
  },
  plugins: {
    '@typescript-eslint': tseslint,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,

    // React Refresh
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // TypeScript specific
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',

    // General
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
}, // Configuration for Node.js files (vite.config.ts, etc.)
{
  files: ['vite.config.ts', '*.config.ts'],
  languageOptions: {
    globals: globals.node,
  },
}, // Configuration for MCP servers directory
{
  files: ['servers/**/*.{ts,js}'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  rules: {
    'no-console': 'off', // Allow console.log in server code
    '@typescript-eslint/no-explicit-any': 'off', // Allow any types for MCP responses
  },
}, ...storybook.configs["flat/recommended"]];
