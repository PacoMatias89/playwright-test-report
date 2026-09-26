import { expect, test } from "@playwright/test";

test.describe("Playwright website navigation", () => {
  test("should load the Playwright home page successfully", async ({
    page,
  }) => {
    await page.goto("https://playwright.dev/");

    await expect(page).toHaveTitle(/Playwright/);
    await expect(page.getByRole("link", { name: "Get started" })).toBeVisible();
  });
});
