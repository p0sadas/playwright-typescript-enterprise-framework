import { Page, Locator } from "@playwright/test";

export class paymentDonePage {
  readonly page: Page;
  readonly h2PaymentDone: Locator;
  readonly btnDownloadInvoice: Locator;
  readonly btnContinue: Locator;
  constructor(page: Page) {
    this.page = page;
    this.h2PaymentDone = page.locator('h2[data-qa="order-placed"]');
    this.btnDownloadInvoice = page.locator('a[href*="download_invoice/"]');
    this.btnContinue = page.locator("a[data-qa='continue-button']");
  }
  async geth2PaymentDoneText() {
    return (await this.h2PaymentDone.innerText()).toLowerCase();
  }
  async clickContinueButton() {
    await this.btnContinue.click();
  }
  async clickDownloadInvoice() {
    await this.btnDownloadInvoice.click();
  }
}
