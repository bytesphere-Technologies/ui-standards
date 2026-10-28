import { test, expect } from "@playwright/test";
import { routes } from "./routes";

test.use({ viewport: { width: 360, height: 800 }, hasTouch: true });

/** Mobile standard: no horizontal page scroll at 360 px. */
for (const route of routes()) {
  test(`no horizontal overflow ${route}`, async ({ page }) => {
    await page.goto(`/#/${route}`);
    await page.waitForSelector("h1:visible, h2:visible");
    await page.waitForTimeout(700);
    const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(over, "page scrolls sideways by px").toBeLessThanOrEqual(1);
  });
}

/** Mobile standard: primary controls are at least 40 px tall (44 target; 40 allows the small size). */
for (const route of ["settings/profile", "checkout/plan", "sign-in", "support", "tasks"]) {
  test(`touch targets ${route}`, async ({ page }) => {
    await page.goto(`/#/${route}`);
    await page.waitForSelector("h1:visible, h2:visible");
    const small = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("button:not([hidden]), input:not([type=hidden]):not([type=checkbox]):not([type=radio]), select, textarea")].filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 40 && getComputedStyle(el).display !== "inline" && getComputedStyle(el).visibility !== "hidden" && !el.closest(".sr-only") && !((el.parentElement?.textContent || "").length > (el.textContent || "").length + 12 && el.parentElement?.children.length === 1); }).map((el) => `${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 24)}" ${Math.round(el.getBoundingClientRect().height)}px`));
    expect(small).toEqual([]);
  });
}
