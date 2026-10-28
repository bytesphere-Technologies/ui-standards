// Run: node packages/ui/eslint-plugin/test.mjs
import { RuleTester } from "eslint";
import plugin from "./index.js";
const t = new RuleTester({ languageOptions: { ecmaVersion: 2022, sourceType: "module", parserOptions: { ecmaFeatures: { jsx: true } } } });
const r = plugin.rules;
t.run("no-raw-color", r["no-raw-color"], {
  valid: [`<div className="bg-surface-raised text-secondary" />`, `const x = "var(--t-color-text-primary)"`, `const id = "item#1"`],
  invalid: [`<div style={{ color: "#116CB3" }} />`, `const c = "rgb(0, 9, 19)"`].map((code) => ({ code, errors: 1 })),
});
t.run("no-tailwind-palette", r["no-tailwind-palette"], {
  valid: [`<div className="bg-action-primary text-primary" />`, `<div className="text-status-danger-fg" />`],
  invalid: [`<div className="bg-blue-500" />`, `<div className="hover:text-gray-600" />`, `<div className="text-white" />`].map((code) => ({ code, errors: 1 })),
});
t.run("no-arbitrary-size", r["no-arbitrary-size"], {
  valid: [`<div className="p-4 gap-2 min-w-[34rem]" />`, `<div className="h-(--control-md)" />`],
  invalid: [`<div className="p-[13px]" />`, `<div className="md:gap-[7px]" />`].map((code) => ({ code, errors: 1 })),
});
t.run("use-ui-components", r["use-ui-components"], {
  valid: [`<Button>Save</Button>`, `<Input />`],
  invalid: [`<button>Save</button>`, `<input />`].map((code) => ({ code, errors: 1 })),
});
console.log("eslint-plugin: all rule tests passed");
