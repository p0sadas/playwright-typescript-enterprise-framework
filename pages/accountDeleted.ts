import { Page, Locator } from "@playwright/test";

export class accountDeletedPage {
  readonly page: Page;
  readonly h2AccountDeleted: Locator;
  readonly btnContinue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.h2AccountDeleted = page.locator('[data-qa="account-deleted"]');
    this.btnContinue = page.locator('[data-qa="continue-button"]');
  }

  async clickContinue() {
    await this.btnContinue.click();
  }
}
