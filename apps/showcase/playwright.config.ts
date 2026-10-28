import { defineConfig } from "@playwright/test";

/** Uses the system Chrome so no browser download is needed. Run: npm test */
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  fullyParallel: true,
  retries: 1,
  workers: 3,
  reporter: [["list"]],
  use: { baseURL: "http://127.0.0.1:5173", launchOptions: { executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", args: ["--no-sandbox"] } },
  webServer: { command: "npm run dev -- --host 127.0.0.1 --port 5173", url: "http://127.0.0.1:5173", reuseExistingServer: true, timeout: 60_000 },
});
