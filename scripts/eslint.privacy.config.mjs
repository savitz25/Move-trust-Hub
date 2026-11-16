import tsParser from '@typescript-eslint/parser';

/** Noninteractive lint for the privacy patch only. This is not the repo ESLint setup. */
export default [
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {},
  },
];
