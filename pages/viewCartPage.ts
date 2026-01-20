import { Page, Locator } from "@playwright/test";

export class viewCartPage {
  readonly page: Page;
  readonly tableCart: Locator;
  readonly btnProceedToCheckout: Locator;
  readonly firstProductQuantity: Locator;
  readonly btnRemoveProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.tableCart = page.locator("#cart_info_table");
    this.btnProceedToCheckout = page.locator("#do_action a.check_out");
    this.firstProductQuantity = page
      .locator("#cart_info_table tbody tr")
      .first()
      .locator("td")
      .nth(3)
      .locator("button");
    this.btnRemoveProduct = page
      .locator("#cart_info_table tbody tr")
      .first()
      .locator("td")
      .nth(5)
      .locator("a");
  }

  async clickProceedToCheckout() {
    await this.btnProceedToCheckout.click();
  }
  async itemsInTableCart(): Promise<number> {
    return await this.tableCart.locator("tbody tr").count();
  }
  async getFirstProductQuantity(): Promise<number> {
    return Number(await this.firstProductQuantity.innerText());
  }
  async removeFirstProduct() {
    await this.btnRemoveProduct.click();
  }
}
