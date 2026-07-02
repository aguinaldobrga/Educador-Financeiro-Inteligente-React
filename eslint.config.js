import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{ts,tsx}'],

    plugins: {
      prettier,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      // Integra Prettier como regra do ESLint
      'prettier/prettier': 'error',
    },
  },

  // 🔥 IMPORTANTE: Prettier sempre por último (desliga conflitos)
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [require('eslint-config-prettier')],
  },
]);