import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

type E2EFixtures = {
  homePage: HomePage;
};

export const test = base.extend<E2EFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from "@playwright/test";
