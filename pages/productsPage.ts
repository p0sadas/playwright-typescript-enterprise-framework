import { Page, Locator } from "@playwright/test";
import { homePage } from "./homePage";

export class productsPage extends homePage {
  readonly productCards: Locator;
  readonly categoryPanel: Locator;
  readonly brandsPanel: Locator;
  readonly titlePage: Locator;
  readonly categoryWomenOpen: Locator;
  readonly categoryMenOpen: Locator;
  readonly categoryKidsOpen: Locator;
  readonly viewProductButton: Locator;
  constructor(page: Page) {
    super(page);
    this.productCards = page.locator(".single-products");
    this.categoryPanel = page.locator("#accordian");
    this.brandsPanel = page.locator(".brands-name");
    this.titlePage = page.locator(".features_items h2").first();
    this.categoryWomenOpen = page.locator("a[href='#Women']");
    this.categoryMenOpen = page.locator("a[href='#Men']");
    this.categoryKidsOpen = page.locator("a[href='#Kids']");
    this.viewProductButton = page.locator("a[href*='/product_details/']");
  }
  async totalProducts() {
    return await this.productCards.count();
  }
  async clickCategoryWomen(name: string) {
    await this.categoryWomenOpen.click();
    await this.page.getByRole("link", { name: name, exact: false }).click();
  }
  async clickCategoryMen(name: string) {
    await this.categoryMenOpen.click();
    await this.page.getByRole("link", { name: name, exact: false }).click();
  }
  async clickCategoryKids(name: string) {
    await this.categoryKidsOpen.click();
    await this.page.getByRole("link", { name: name, exact: false }).click();
  }
  async getTitlePage(): Promise<string> {
    return ((await this.titlePage.innerText()) || "").toLowerCase();
  }
  async clickCategoryBrand(brandName: string) {
    await this.page
      .locator(".brands-name")
      .locator(`a[href='/brand_products/${brandName}']`)
      .click();
  }
}
