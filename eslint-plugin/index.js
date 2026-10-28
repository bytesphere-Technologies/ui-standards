/**
 * @bytesphere/ui ESLint plugin: makes the UI standard fail the build instead of living in a document.
 * Rules: no-raw-color · no-tailwind-palette · no-arbitrary-size · use-ui-components
 */
const PALETTE = "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const UTIL = "bg|text|border|ring|fill|stroke|from|to|via|divide|outline|decoration|shadow|accent|caret|placeholder";
const RE = {
  hex: /(^|[^\w&])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b(?![\w-])/,
  fn: /\b(?:rgb|rgba|hsl|hsla|oklch)\(\s*\d/,
  palette: new RegExp(`(?:^|[\\s"'\`:!])(?:${UTIL})-(?:${PALETTE})-(?:50|[1-9]00|950)\\b`),
  blackWhite: /(?:^|[\s"'`:!])(?:bg|text|border|ring|fill|stroke)-(?:white|black)\b/,
  arbitrary: /(?:^|[\s"'`:!])(?:[a-z0-9-]+:)*-?(?:p|px|py|pt|pb|ps|pe|pl|pr|m|mx|my|mt|mb|ms|me|ml|mr|gap|gap-x|gap-y|space-x|space-y|rounded|text|leading|tracking)-\[-?\d+(?:\.\d+)?(?:px|rem)\]/,
};
const strings = (context, check) => {
  const visit = (node, text) => typeof text === "string" && text && check(node, text);
  return {
    Literal(n) { if (typeof n.value === "string") visit(n, n.value); },
    TemplateElement(n) { visit(n, n.value.cooked); },
  };
};
const rule = (message, test) => ({
  meta: { type: "problem", schema: [], messages: { bad: message } },
  create: (context) => strings(context, (node, text) => { const m = test(text); if (m) context.report({ node, messageId: "bad", data: { m } }); }),
});
const COMPONENT_FOR = { button: "Button", input: "Input (or Checkbox, Radio, Switch)", select: "Select", textarea: "Textarea", dialog: "Modal" };
export default {
  rules: {
    "no-raw-color": rule("Raw color is not allowed. Use a token class (bg-surface-raised, text-secondary, bg-action-primary…) or a var(--t-*) token.", (t) => (RE.hex.test(t) || RE.fn.test(t)) && t),
    "no-tailwind-palette": rule("Default Tailwind palette and plain white/black are not allowed. Use semantic token classes (see AI-INDEX.md and docs/01-foundations/color.md).", (t) => (RE.palette.test(t) || RE.blackWhite.test(t)) && t),
    "no-arbitrary-size": rule("Arbitrary px/rem values are not allowed. Use the spacing scale and token classes.", (t) => RE.arbitrary.test(t) && t),
    "use-ui-components": {
      meta: { type: "suggestion", schema: [], messages: { bad: "Use <{{c}}> from @bytesphere/ui instead of a raw <{{tag}}>." } },
      create: (context) => ({
        JSXOpeningElement(n) {
          if (n.name.type !== "JSXIdentifier") return;
          const tag = n.name.name; if (COMPONENT_FOR[tag]) context.report({ node: n, messageId: "bad", data: { c: COMPONENT_FOR[tag], tag } });
        },
      }),
    },
  },
};
