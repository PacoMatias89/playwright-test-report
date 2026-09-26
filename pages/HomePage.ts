import type { Locator, Page } from "@playwright/test";

export class HomePage {
  private readonly page: Page;
  private readonly url = "https://playwright.dev/";

  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get started" });
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
