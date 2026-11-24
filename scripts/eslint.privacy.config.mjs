import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';

/**
 * Noninteractive lint for every TypeScript file changed by the Ask/Move privacy
 * patch. This is not the repository ESLint setup and it does not typecheck the repo.
 *
 * The broad TypeScript baseline is documented separately in
 * scripts/typescript-baseline.md. These rules do not suppress those historical errors.
 */
export default [
  {
    files: ['**/*.{ts,tsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-debugger': 'error',
      'no-unreachable': 'error',
      'no-script-url': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { args: 'none', varsIgnorePattern: '^_', caughtErrors: 'none' },
      ],
    },
  },
];
