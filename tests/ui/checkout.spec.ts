import { test, expect } from "../../fixtures/fixtures";
import { viewCartPage } from "../../pages/viewCartPage";
import { checkoutPage } from "../../pages/checkoutPage";
import { paymentPage } from "../../pages/paymentPage";
import { enviroments } from "../../config/enviroments";
import users from "../../data/users.json";
import { paymentDonePage } from "../../pages/paymentDonePage";

test("@critical @functional Complete Purchase Flow", async ({
  page,
  loggedHome,
}) => {
  // Once logged with fixture navigate to products page
  await loggedHome.navigateToProducts();
  // Wait for products to load
  await expect(loggedHome.productCards.first()).toBeVisible();
  // Add first product to cart
  await loggedHome.addFirstProductToCart();
  // Click continue shopping
  await loggedHome.clickContinueShopping();
  // Navigate to shopping cart
  await loggedHome.navigateToShoppingCart();
  // Verify cart has items
  const viewCart = new viewCartPage(page);
  // Verify user is in the cart page
  await expect(viewCart.page).toHaveURL(`${enviroments.dev.baseURL}/view_cart`);
  // Verify cart has items
  await expect(viewCart.tableCart).toBeVisible();
  const cartItems = await viewCart.itemsInTableCart();
  await expect(cartItems).toEqual(1);
  // Click proceed to checkout
  await viewCart.clickProceedToCheckout();
  const checkout = new checkoutPage(page);
  // Verify user is in the checkout page
  await expect(checkout.page).toHaveURL(`${enviroments.dev.baseURL}/checkout`);
  // Verify billing address is the same as the user's address
  expect(await checkout.compareBillingAddresses()).toBe(true);
  // Verify delivery address is the same as the user's address
  expect(await checkout.compareDeliveryAddresses()).toBe(true);
  // Click place order
  await checkout.clickPlaceOrder();
  // Verify user is in the payment page
  await expect(checkout.page).toHaveURL(`${enviroments.dev.baseURL}/payment`);
  const payment = new paymentPage(page);
  await payment.pay({
    nameOnCard: users.validUser.name,
    cardNumber: "4242424242424242",
    cvv: "123",
    expiryMonth: "12",
    expiryYear: "2026",
  });
  // Verify user is in the order confirmation page
  await expect(page).toHaveURL(new RegExp(".*/payment_done/.*"));
  const paymentDone = new paymentDonePage(page);
  // verify h2PaymentDone is visible
  await expect(paymentDone.h2PaymentDone).toBeVisible();
  // verify h2PaymentDone text is "order placed!"
  await expect(paymentDone.h2PaymentDone).toHaveText("Order Placed!", {
    ignoreCase: true,
  });
  // verify btnDownloadInvoice is visible
  await expect(paymentDone.btnDownloadInvoice).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  // click btnDownloadInvoice
  await paymentDone.btnDownloadInvoice.click();
  const download = await downloadPromise;
  // verify download is not null
  expect(download).not.toBeNull();
  // verify download is pdf
  expect(download.suggestedFilename()).toContain("invoice");
  // click continue button
  await paymentDone.clickContinueButton();
  // verify user is in the home page
  await expect(paymentDone.page).toHaveURL(`${enviroments.dev.baseURL}/`);
});
