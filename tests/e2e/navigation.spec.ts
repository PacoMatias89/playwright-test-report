import { expect, test } from "../../fixtures/e2eFixtures";

test.describe("Playwright website navigation", { tag: "@e2e" }, () => {
  test(
    "should load the Playwright home page successfully",
    { tag: ["@smoke", "@regression"] },
    async ({ page, homePage }) => {
      await homePage.goto();

      await expect(page).toHaveTitle(/Playwright/);
      await expect(homePage.getStartedLink).toBeVisible();
    },
  );
});
