import { test, expect } from "@playwright/test";
import { routes } from "./routes";

/** Every route renders a heading, throws no page errors and logs no console errors. */
for (const route of routes()) {
  test(`renders ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => { if (m.type() === "error" && !/favicon|Failed to load resource/.test(m.text())) errors.push(m.text()); });
    await page.goto(`/#/${route}`);
    await expect(page.locator("h1:visible, h2:visible").first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}
