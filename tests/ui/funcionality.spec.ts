import { test, expect } from "../../fixtures/fixtures";
import { homePage } from "../../pages/homePage";
import { enviroments } from "../../config/enviroments";
test("@smoke user can subscribe to the newsletter and arrow button redirects to the top of the page", async ({
  page,
}) => {
  const home = new homePage(page);
  // Navigate to products page
  await home.navigate();
  // Wait for products to load
  await expect(home.page.url()).toBe(enviroments.dev.baseURL + "/");
  // go to newsletter section
  await home.inputNewsletter.scrollIntoViewIfNeeded();
  // Verify newsletter input and subscribe button are visible
  await expect(home.inputNewsletter).toBeVisible();
  await expect(home.btnSubscribe).toBeVisible();
  // Subscribe to newsletter
  await home.subscribeToNewsletter("test@example.com");
  // Verify success message
  await expect(await home.getSuccessMessage()).toBe(
    "You have been successfully subscribed!",
  );
  // click arrow button
  await home.clickArrowTop();
  // Verify arrow button redirects to the top of the page
  await expect(home.linkCart).toBeVisible();
});
