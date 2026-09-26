import { expect, test } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";

test.describe("Playwright website navigation", () => {
  test("should load the Playwright home page successfully", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveTitle(/Playwright/);
    await expect(homePage.getStartedLink).toBeVisible();
  });
});
