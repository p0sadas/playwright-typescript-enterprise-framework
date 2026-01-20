import { Page, Locator } from "@playwright/test";

export class productPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly addToCartButton: Locator;
  readonly productAvailability: Locator;
  readonly inputNameReview: Locator;
  readonly inputEmailReview: Locator;
  readonly inputReview: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewSuccessMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator(".product-information h2");
    this.productPrice = page.locator(".product-information span span");
    this.productQuantity = page.locator("#quantity");
    this.addToCartButton = page.locator(".product-information span button");
    this.productAvailability = page.locator(".product-information p").nth(1);
    this.inputNameReview = page.locator("#name");
    this.inputEmailReview = page.locator("#email");
    this.inputReview = page.locator("#review");
    this.submitReviewButton = page.locator("#button-review");
    this.reviewSuccessMessage = page
      .locator(".alert-success.alert")
      .locator("span");
  }
  async addQuantityToCart(quantity: number) {
    await this.productQuantity.fill(quantity.toString());
    await this.addToCartButton.click();
  }
  async addReview(name: string, email: string, review: string) {
    await this.inputNameReview.fill(name);
    await this.inputEmailReview.fill(email);
    await this.inputReview.fill(review);
    await this.submitReviewButton.click();
  }
  async getReviewSuccessMessage() {
    return this.reviewSuccessMessage.innerText();
  }
}
