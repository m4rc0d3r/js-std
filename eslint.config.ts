import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

const FILE_EXTENSIONS = {
  js: ["js", "cjs", "mjs"],
  ts: ["ts", "mts", "cts"],
};

export default defineConfig([
  {
    files: [`**/*.{${Object.values(FILE_EXTENSIONS).flat().join(",")}}`],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "no-public",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: [`**/*.{${Object.values(FILE_EXTENSIONS.js).join(",")}}`],
    ...tseslint.configs.disableTypeChecked,
  },
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: Object.values(FILE_EXTENSIONS)
            .flat()
            .map((value) => `.${value}`),
        },
      },
    },
    rules: {
      "import/no-empty-named-blocks": "error",
      "import/no-absolute-path": "error",
      "import/no-self-import": "error",
      "import/no-useless-path-segments": [
        "error",
        {
          noUselessIndex: true,
        },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/exports-last": "error",
      "import/first": "error",
      "import/group-exports": "error",
      "import/newline-after-import": "error",
      "import/no-named-default": "error",
      "import/order": [
        "error",
        {
          "newlines-between": "always",
        },
      ],
    },
  },
  prettierConfig,
]);
