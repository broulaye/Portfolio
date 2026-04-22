/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["build", "dist", "node_modules", "sanity", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react-refresh"],
  settings: { react: { version: "detect" } },
  rules: {
    "react-refresh/only-export-components": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    // react-three-fiber uses Three.js props as JSX attributes (intensity, position, etc.)
    // that the react/no-unknown-property rule doesn't know about.
    "react/no-unknown-property": "off",
  },
  overrides: [
    {
      files: ["src/components/canvas/**/*.{js,jsx,ts,tsx}"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};
