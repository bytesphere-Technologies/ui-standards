import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes, appearances } from "./routes";

/** Automated WCAG 2.1 A/AA scan on every page in light and two dark modes. Fails on serious and critical issues. */
for (const route of routes()) {
  for (const a of appearances) {
    test(`a11y ${route} (${a.name})`, async ({ page }) => {
      await page.goto(`/?${a.q}#/${route}`);
      await page.waitForSelector("h1:visible, h2:visible", { timeout: 15_000 });
      await page.waitForTimeout(400);
      const res = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      const bad = res.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(bad.map((v) => `${v.id}: ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`), `${route}`).toEqual([]);
    });
  }
}
