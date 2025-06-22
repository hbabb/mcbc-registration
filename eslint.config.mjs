import antfu from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 4,
      semi: true,
      quotes: "single",
      bracketSameLine: true,
      bracketSpacing: true,
      endOfLine: "lf",
      arrowParens: "avoid",
      htmlWhiteSpaceSensitivity: "css",
      jsxSingleQuote: false,
      quoteProps: "as-needed",
    },
    ignore: ["**/.pnpm-store/**", "**/dist/**"],
  },

  {
    rules: {
      "ts/no-redeclare": "off",
      "ts/consistent-type-definitions": ["error", "type"],
      "no-console": ["off"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["off"],
      "perfectionist/sort-imports": [
        "error",
        {
          tsconfigRootDir: ".",
        },
      ],
      "unicorn/filename-case": [
        "warn",
        {
          case: "camelCase",
          ignore: [
            "README.md",
            "TODO.md",
            "vite.config.ts",
            "commitlint.config.js",
            "global-error.tsx",
            "instrumentation-client.ts",
          ],
        },
      ],
    },
  },
  {
    files: ["src/components/ui/*", "./drizzle/meta/*", "src/types/*"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },
  eslintConfigPrettier,
);
