import { Page, Locator } from "@playwright/test";
import { enviroments } from "../config/enviroments";
export class homePage {
  readonly page: Page;
  readonly inputSearch: Locator;
  readonly btnSearch: Locator;
  readonly productCards: Locator;
  readonly btnAddToCart: Locator;
  readonly linkCart: Locator;
  readonly linkLoggedAs: Locator;
  readonly linkLogout: Locator;
  readonly linkDeleteAccount: Locator;
  readonly btnContinueShopping: Locator;
  readonly modalViewCart: Locator;
  readonly btnCartModal: Locator;
  readonly recommendedProducts: Locator;
  readonly inputNewsletter: Locator;
  readonly btnSubscribe: Locator;
  readonly btnArrowTop: Locator;
  readonly divSuccessMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.inputSearch = page.locator("#search_product");
    this.btnSearch = page.locator("#submit_search");
    this.productCards = page.locator(".single-products");
    this.btnAddToCart = page.locator(".productinfo a.add-to-cart");
    this.linkCart = page.locator("a[href='/view_cart']").first();
    this.linkLoggedAs = page.getByText("Logged in as");
    this.linkLogout = page.locator("a[href='/logout']");
    this.linkDeleteAccount = page.locator("a[href='/delete_account']");
    this.btnContinueShopping = page.locator("button.close-modal");
    this.modalViewCart = page.locator(".modal-content a[href='/view_cart']");
    this.btnCartModal = page.locator(".product-overlay a").first();
    this.recommendedProducts = page.locator("div.recommended_items");
    this.inputNewsletter = page.locator("#susbscribe_email");
    this.btnSubscribe = page.locator("button#subscribe");
    this.btnArrowTop = page.locator("a#scrollUp");
    this.divSuccessMessage = page.locator(
      "div#success-subscribe div.alert-success.alert",
    );
  }

  async navigate() {
    await this.page.goto(`${enviroments.dev.baseURL}`);
  }

  async navigateToProducts() {
    await this.page.goto(`${enviroments.dev.baseURL}/products`);
  }

  async searchProduct(product: string) {
    await this.navigateToProducts();
    await this.inputSearch.fill(product);
    await this.btnSearch.click();
  }

  async addFirstProductToCart() {
    await this.btnAddToCart.first().waitFor({ state: "visible" });
    await this.btnAddToCart.first().click();
  }
  async addFirstProductToCartModal() {
    await this.productCards.first().hover();
    await this.page
      .locator(".product-overlay a")
      .first()
      .waitFor({ state: "visible" });
    await this.btnCartModal.click();
  }
  async clickViewCartInModal() {
    await this.modalViewCart.waitFor({ state: "visible" });
    await this.modalViewCart.click();
  }

  async clickContinueShopping() {
    await this.btnContinueShopping.waitFor({ state: "visible" });
    await this.btnContinueShopping.click();
  }

  async navigateToShoppingCart() {
    await this.linkCart.waitFor({ state: "visible" });
    await this.linkCart.click();
  }
  async clickRecommendedProduct(index: number) {
    await this.recommendedProducts
      .locator(`a[data-product-id='${index}']`)
      .waitFor({ state: "visible" });
    await this.recommendedProducts
      .locator(`a[data-product-id='${index}']`)
      .click();
  }
  async subscribeToNewsletter(email: string) {
    await this.inputNewsletter.waitFor({ state: "visible" });
    await this.inputNewsletter.fill(email);
    await this.btnSubscribe.click();
  }
  async clickArrowTop() {
    await this.btnArrowTop.waitFor({ state: "visible" });
    await this.btnArrowTop.click();
  }
  async getSuccessMessage() {
    await this.divSuccessMessage.waitFor({ state: "visible" });
    return await this.divSuccessMessage.innerText();
  }
}
