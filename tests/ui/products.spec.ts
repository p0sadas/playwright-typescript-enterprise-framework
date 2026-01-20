import { test, expect } from "../../fixtures/fixtures";
import { homePage } from "../../pages/homePage";
import { productsPage } from "../../pages/productsPage";
import { productPage } from "../../pages/productPage";

test("@smoke user can search for a product", async ({ page }) => {
  const home = new homePage(page);
  // Search for a product
  await home.searchProduct("Blue Top");

  // Verify search results are visible
  await expect(home.productCards.first()).toBeVisible();
});

test("@smoke user can see all products in the products page", async ({
  page,
}) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  const products = new productsPage(page);
  // Verify category panel is visible
  await expect(products.categoryPanel).toBeVisible();
  // Verify brands panel is visible
  await expect(products.brandsPanel).toBeVisible();
  // Verify that there are products
  await expect(await products.totalProducts()).toBeGreaterThan(0);
});
test("@smoke user can filter all woman category products", async ({ page }) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  //verify url is all products
  await expect(home.page.url()).toContain("/products");
  const products = new productsPage(page);
  await products.titlePage.click();
  // Click on category Dresses
  await products.clickCategoryWomen("Dress");
  // Verify that there are products
  await expect(await products.totalProducts()).toBeGreaterThan(0);
  // verify title page says we are in the dresses category
  await expect(await products.getTitlePage()).toBe(
    "Women - Dress Products".toLowerCase(),
  );
  await products.clickCategoryWomen("Tops");
  await expect(await products.getTitlePage()).toBe(
    "Women - Tops Products".toLowerCase(),
  );
  await products.clickCategoryWomen("Saree");
  await expect(await products.getTitlePage()).toBe(
    "Women - Saree Products".toLowerCase(),
  );
});
test("@smoke user can filter all men category products", async ({ page }) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  //verify url is all products
  await expect(home.page.url()).toContain("/products");
  const products = new productsPage(page);
  await products.titlePage.click();
  // Click on category Tshirts
  await products.clickCategoryMen("Tshirts");
  // Verify that there are products
  await expect(await products.totalProducts()).toBeGreaterThan(0);
  // verify title page says we are in the Tshirts category
  await expect(await products.getTitlePage()).toBe(
    "Men - Tshirts Products".toLowerCase(),
  );
  await products.clickCategoryMen("Jeans");
  await expect(await products.getTitlePage()).toBe(
    "Men - Jeans Products".toLowerCase(),
  );
});
test("@smoke user can filter all kids category products", async ({ page }) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  //verify url is all products
  await expect(home.page.url()).toContain("/products");
  const products = new productsPage(page);
  await products.titlePage.click();
  // Click on category Tshirts
  await products.clickCategoryKids("Dress");
  // Verify that there are products
  await expect(await products.totalProducts()).toBeGreaterThan(0);
  // verify title page says we are in the Tshirts category
  await expect(await products.getTitlePage()).toBe(
    "Kids - Dress Products".toLowerCase(),
  );
  await products.clickCategoryKids("Tops & Shirts");
  await expect(await products.getTitlePage()).toBe(
    "Kids - Tops & Shirts Products".toLowerCase(),
  );
});
test("@smoke user can filter products by the H&M brand", async ({ page }) => {
  const brandName = "H&M";
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  //verify url is all products
  await expect(home.page.url()).toContain("/products");
  const products = new productsPage(page);
  await products.titlePage.click();
  // Click on category brand H&M
  await products.clickCategoryBrand(brandName);
  // Verify that there are products
  await expect(await products.totalProducts()).toBeGreaterThan(0);
  //verify url is brand products
  await expect(products.page.url()).toContain(`brand_products/${brandName}`);
  // verify title page says we are in the H&M brand category
  await expect(await products.getTitlePage()).toBe(
    `Brand - ${brandName} Products`.toLowerCase(),
  );
});
test("@smoke user can add a review on a product", async ({ page }) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  //verify url is all products
  await expect(home.page.url()).toContain("/products");
  const products = new productsPage(page);
  await products.titlePage.click();
  // click on the first product to open it
  await products.viewProductButton.first().click();
  //check if we are on the product page
  await expect(products.page.url()).toContain("product_details");
  const product = new productPage(page);
  await product.addReview("John", "john@example.com", "This is a review");
  const reviewSuccessMessage = await product.getReviewSuccessMessage();
  await expect(reviewSuccessMessage).toBe("Thank you for your review.");
});
