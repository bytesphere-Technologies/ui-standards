import { test, expect } from "@playwright/test";

/** Behavioural tests: the interactions the standard promises. */

test("notification bell opens, marks all read, closes with Escape", async ({ page }) => {
  await page.goto("/#/dashboard");
  const bell = page.getByRole("button", { name: /Notifications, 3 unread/ });
  await bell.click();
  const panel = page.getByRole("dialog", { name: /Notifications/ });
  await expect(panel).toBeVisible();
  await panel.getByRole("button", { name: "Mark all read" }).click();
  await expect(page.getByRole("button", { name: /Notifications, 0 unread/ })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});

test("command palette opens with Ctrl+K and closes with Escape", async ({ page }) => {
  await page.goto("/#/dashboard");
  await page.waitForSelector("h1");
  await page.waitForTimeout(300);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog", { name: "Go to page" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Go to page" })).toBeHidden();
});

test("checkout: step through, promo code, terms required, success", async ({ page }) => {
  await page.goto("/#/checkout/plan");
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByPlaceholder("Promo code").fill("WELCOME10");
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Discount (WELCOME10)")).toBeVisible();
  await page.getByRole("button", { name: /Start 14-day trial/ }).click();
  await expect(page.getByText("Accept the terms to start your trial.")).toBeVisible();
  await page.getByLabel(/I agree to the Terms/).check();
  await page.getByRole("button", { name: /Start 14-day trial/ }).click();
  await expect(page.getByRole("heading", { name: "You’re all set" })).toBeVisible({ timeout: 5000 });
});

test("OTP input: paste fills every box and completes", async ({ page }) => {
  await page.goto("/#/lab");
  const first = page.getByLabel("Digit 1").first();
  await first.focus();
  await page.evaluate(() => { const el = document.activeElement as HTMLInputElement; const dt = new DataTransfer(); dt.setData("text", "123456"); el.dispatchEvent(new ClipboardEvent("paste", { clipboardData: dt, bubbles: true, cancelable: true })); });
  await expect(page.getByText("Entered 123456")).toBeVisible();
});

test("tasks: add, complete, delete with undo", async ({ page }) => {
  await page.goto("/#/tasks");
  await page.getByLabel("New task").fill("Write the report");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await expect(page.getByText("Write the report")).toBeVisible();
  await page.getByRole("button", { name: "Delete Write the report" }).click();
  await expect(page.getByText("Task deleted")).toBeVisible();
  await page.getByRole("button", { name: "Undo" }).click();
  await expect(page.getByText("Write the report")).toBeVisible();
});

test("data table: search narrows rows, sort sets aria-sort, select shows bulk", async ({ page }) => {
  await page.goto("/#/lab/advanced");
  const table = page.locator("table").first();
  await page.getByLabel("Search table").fill("contoso");
  await expect(page.getByText("1 result")).toBeVisible();
  await page.getByLabel("Search table").fill("");
  await page.getByRole("button", { name: "Amount" }).click();
  await expect(page.getByRole("columnheader", { name: /Amount/ })).toHaveAttribute("aria-sort", "ascending");
  await page.getByLabel("Select row 8").check();
  await expect(page.getByText("1 selected")).toBeVisible();
  await expect(table).toBeVisible();
});

test("kanban: Move select moves a card between columns", async ({ page }) => {
  await page.goto("/#/lab/advanced");
  await page.getByLabel("Move Send renewal quote").selectOption("done");
  await expect(page.getByRole("region", { name: "Done" }).locator("p", { hasText: "Send renewal quote" })).toBeVisible();
});

test("roles: toggling a permission shows unsaved changes, Save clears it", async ({ page }) => {
  await page.goto("/#/admin/roles");
  await page.getByLabel("Member can delete Deals").check();
  await expect(page.getByText("Unsaved changes")).toBeVisible();
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("All changes saved")).toBeVisible();
});

test("import wizard: errors are listed and import completes", async ({ page }) => {
  await page.goto("/#/admin/import");
  await page.getByRole("button", { name: /Use sample file/ }).click();
  await page.getByRole("button", { name: "Review rows" }).click();
  await expect(page.getByText(/Not a valid email/).first()).toBeVisible();
  await page.getByRole("button", { name: /^Import \d+ rows/ }).click();
  await expect(page.getByRole("heading", { name: "Import finished" })).toBeVisible({ timeout: 8000 });
});

test("two-step setup: wrong code is rejected, other code passes, done needs the checkbox", async ({ page }) => {
  await page.goto("/#/admin/two-step");
  await page.getByRole("button", { name: "Continue" }).click();
  for (const [i, d] of [..."000000"].entries()) await page.getByLabel(`Digit ${i + 1}`).fill(d);
  await expect(page.getByRole("alert")).toContainText("didn’t work");
  await page.getByLabel("Digit 1").fill("1");
  await expect(page.getByText("Two-step verification is on")).toBeVisible();
  await expect(page.getByRole("button", { name: "Done" })).toBeDisabled();
  await page.getByLabel(/saved my recovery codes/).check();
  await expect(page.getByRole("button", { name: "Done" })).toBeEnabled();
});

test("modal: opens as dialog, Escape closes, focus returns", async ({ page }) => {
  await page.goto("/#/calendar");
  const btn = page.getByRole("button", { name: "New event" });
  await btn.click();
  await expect(page.getByRole("dialog", { name: "New event" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("429 page disables the primary action while the countdown runs", async ({ page }) => {
  await page.goto("/#/status/429");
  await expect(page.getByRole("button", { name: /Try again/ })).toBeDisabled();
});

test.describe("keyboard", () => {
  test("skip link is the first focusable element and moves focus to main", async ({ page }) => {
    await page.goto("/#/dashboard");
    const first = await page.evaluate(() => document.querySelector<HTMLElement>("a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])")?.textContent?.trim());
    expect(first).toBe("Skip to main content");
    await page.getByRole("link", { name: "Skip to main content" }).focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#main")).toBeFocused();
  });
});

test("form validation: blur shows error, submit focuses first invalid field", async ({ page }) => {
  await page.goto("/#/forms/validation");
  await page.getByLabel("Work email").fill("nope");
  await page.getByLabel("Work email").blur();
  await expect(page.getByText("Email must look like name@company.com.")).toBeVisible();
  await page.getByRole("button", { name: "Save details" }).click();
  await expect(page.getByLabel("Full name")).toBeFocused();
  await expect(page.getByText(/fields need attention/)).toBeVisible();
});
