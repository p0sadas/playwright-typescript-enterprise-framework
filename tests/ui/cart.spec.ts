import { test, expect } from "../../fixtures/fixtures";
import { homePage } from "../../pages/homePage";
import { viewCartPage } from "../../pages/viewCartPage";
import { productsPage } from "../../pages/productsPage";
import { productPage } from "../../pages/productPage";

test("@smoke user can add the first product to the cart without using the modal", async ({
  page,
}) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();

  // Wait for products to load
  await expect(home.productCards.first()).toBeVisible();

  // Add first product to cart
  await home.addFirstProductToCart();

  // Click "View Cart" in the modal
  await home.clickViewCartInModal();

  // Verify cart has items
  const viewCart = new viewCartPage(page);
  await expect(viewCart.tableCart).toBeVisible();
  const cartItems = await viewCart.itemsInTableCart();
  await expect(cartItems).toEqual(1);
});

// test("@smoke user can add the first product to the cart using the modal", async ({
//   page,
// }) => {
//   const home = new homePage(page);
//   // Navigate to products page
//   await home.navigateToProducts();

//   // Wait for products to load
//   await expect(home.productCards.first()).toBeVisible();

//   // Add first product to cart
//   await home.addFirstProductToCartModal();

//   // Click "View Cart" in the modal
//   await home.clickViewCartInModal();
//   // Verify cart has items
//   const viewCart = new viewCartPage(page);
//   await expect(viewCart.tableCart).toBeVisible();
//   const cartItems = await viewCart.itemsInTableCart();
//   await page.pause();
//   await expect(cartItems).toEqual(1);
// });
test("@smoke user can add 4 quantity of a product to the cart", async ({
  page,
}) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();
  // Wait for products to load
  await expect(home.productCards.first()).toBeVisible();
  const products = new productsPage(page);
  // click on the first product to open it
  await products.viewProductButton.first().click();
  //check if we are on the product page
  await expect(products.page.url()).toContain("product_details");
  const product = new productPage(page);
  // Verify product price and availability
  await expect(product.productPrice).toBeVisible();
  await expect(product.productAvailability).toBeVisible();
  await expect(product.productAvailability).toContainText("In Stock");
  // Add 4 quantity of the product to cart
  await product.addQuantityToCart(4);
  // Click "View Cart" in the modal
  await home.clickViewCartInModal();
  // Verify cart has items
  const viewCart = new viewCartPage(page);
  await expect(viewCart.tableCart).toBeVisible();
  const firstProductQuantity = await viewCart.getFirstProductQuantity();
  await expect(firstProductQuantity).toEqual(4);
});
test("@smoke user can remove a product from the cart ", async ({ page }) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigateToProducts();

  // Wait for products to load
  await expect(home.productCards.first()).toBeVisible();

  // Add first product to cart
  await home.addFirstProductToCart();

  // Click "View Cart" in the modal
  await home.clickViewCartInModal();

  // Verify cart has items
  const viewCart = new viewCartPage(page);
  await expect(viewCart.tableCart).toBeVisible();
  const cartItems = await viewCart.itemsInTableCart();
  // Verify cart has 1 item
  await expect(cartItems).toEqual(1);
  // Remove first product from cart
  await viewCart.removeFirstProduct();
  // Verify cart has no items and is hidden
  await expect(viewCart.tableCart).toBeHidden();
  const cartItemsAfterRemove = await viewCart.itemsInTableCart();
  await expect(cartItemsAfterRemove).toEqual(0);
});
test("smoke user can add a recommended product to the cart", async ({
  page,
}) => {
  const home = new homePage(page);
  // Navigate to home page
  await home.navigate();
  // Scroll to recommended products
  await home.recommendedProducts.scrollIntoViewIfNeeded();
  // Wait for recommended products to load
  await expect(home.recommendedProducts).toBeVisible();
  // Click on the fourth recommended product to add it to the cart
  await home.clickRecommendedProduct(4);
  // Click "View Cart" in the modal
  await home.clickViewCartInModal();
  // Verify cart has items
  const viewCart = new viewCartPage(page);
  await expect(viewCart.tableCart).toBeVisible();
  const cartItems = await viewCart.itemsInTableCart();
  await expect(cartItems).toEqual(1);
});
