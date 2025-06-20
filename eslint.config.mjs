import antfu from '@antfu/eslint-config';

export default antfu(
  {
    type: 'app',
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: 'single',
      bracketSameLine: true,
      bracketSpacing: true,
      endOfLine: 'lf',
      arrowParens: 'avoid',
      htmlWhiteSpaceSensitivity: 'css',
      jsxSingleQuote: false,
      quoteProps: 'as-needed',
    },
    ignore: [
      '**/.pnpm-store/**',
      '**/dist/**',
    ],
  },

  {
    rules: {
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': ['off'],
      'node/prefer-global/process': ['off'],
      'node/no-process-env': ['error'],
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: '.',
      }],
      'unicorn/filename-case': ['warn', {
        case: 'camelCase',
        ignore: ['README.md', 'TODO.md', 'vite.config.ts', 'commitlint.config.js'],
      }],
    },
  },
  {
    files: ['src/components/ui/*'],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
);
