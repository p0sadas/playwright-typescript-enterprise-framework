import { test, expect } from "../../fixtures/fixtures";
import { loginPage } from "../../pages/loginPage";
import { homePage } from "../../pages/homePage";
import { enviroments } from "../../config/enviroments";
import users from "../../data/users.json";

test("@smoke user can login with a valid user", async ({ page }) => {
  //this page does not keep account created data so we need to register a new user first
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputEmailLogin.fill(users.validUser.email);
  await login.inputPasswordLogin.fill(users.validUser.password);
  // Click login button
  await login.btnLogin.click();
  const home = new homePage(page);
  // verify URL to home page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}`);
  // Verify logout button is visible
  await expect(home.linkLogout).toBeVisible();
  await expect(home.linkDeleteAccount).toBeVisible();
});
test("@smoke cant not login with incorrect password or email", async ({
  page,
}) => {
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputEmailLogin.fill(users.invalidUser.email);
  await login.inputPasswordLogin.fill(users.invalidUser.password);
  // Click login button
  await login.btnLogin.click();
  // Verify validation message
  await expect(login.validationMessage).toBeVisible();
  // Verify validation message text
  await expect(await login.getValidationMessageAtLoginForm()).toBe(
    "Your email or password is incorrect!",
  );
  // Verify URL to login page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}/login`);
});
test("@regression user can logout", async ({ page }) => {
  //this page does not keep account created data so we need to register a new user first
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputEmailLogin.fill(users.validUser.email);
  await login.inputPasswordLogin.fill(users.validUser.password);
  // Click login button
  await login.btnLogin.click();
  const home = new homePage(page);
  // verify URL to home page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}`);
  // Verify logout button is visible
  await expect(home.linkLogout).toBeVisible();
  await expect(home.linkDeleteAccount).toBeVisible();
  // Click logout button
  await home.linkLogout.click();
  // Verify URL to home page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}/login`);
});
