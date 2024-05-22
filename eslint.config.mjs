import globals from 'globals';
import jsConfigs from '@eslint/js';
import tsConfigs from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsConfigs,
      prettier: prettierPlugin,
    },
    rules: {
      ...jsConfigs.configs.recommended.rules,
      ...tsConfigs.configs.recommended.rules,
      ...prettierConfig.rules,
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['**/node_modules/', '.env/'],
  },
];
