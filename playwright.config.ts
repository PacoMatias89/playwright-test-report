import { defineConfig, devices } from "@playwright/test";
import { environment } from "./config/environments";

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "reports/html",
        open: "never",
      },
    ],
    [
      "junit",
      {
        outputFile: "reports/junit/results.xml",
      },
    ],
  ],

  use: {
    baseURL: environment.baseUrl,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      testMatch: "**/e2e/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: environment.baseUrl,
      },
    },
    {
      name: "api",
      testMatch: "**/api/**/*.spec.ts",
      use: {
        baseURL: environment.apiBaseUrl,
      },
    },
  ],
});
