import tseslint from "typescript-eslint";
import ui from "./packages/ui/eslint-plugin/index.js";

/**
 * The UI standard as lint rules.
 *  - apps/showcase: warnings, so the demo can still show swatches, hex values and one-off layouts. Pages that exist to document raw values are skipped.
 *  - packages/ui/src: defines the tokens and components, so it is not linted for raw values.
 */
const all = (level) => ({ "ui/no-raw-color": level, "ui/no-tailwind-palette": level, "ui/no-arbitrary-size": level, "ui/use-ui-components": level });
const base = { languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } } }, plugins: { ui } };
export default [
  { ignores: ["**/dist/**", "**/node_modules/**", "**/test-results/**", "apps/showcase/src/catalog/**", "apps/showcase/src/data.ts"] },
  {
    ...base,
    files: ["apps/**/*.{ts,tsx}"],
    ignores: ["apps/showcase/src/pages/{Brand,Foundations,Themes,AntiSlop,Libraries}.tsx"],
    rules: all("warn"),
  },
];
