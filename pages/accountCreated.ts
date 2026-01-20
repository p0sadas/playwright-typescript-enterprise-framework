import { Page, Locator } from "@playwright/test";

export class accountCreatedPage {
  readonly page: Page;
  readonly h2AccountCreated: Locator;
  readonly btnContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h2AccountCreated = page.locator("[data-qa='account-created']");
    this.btnContinue = page.locator('[data-qa="continue-button"]');
  }

  async clickContinue() {
    await this.btnContinue.click();
  }
}
