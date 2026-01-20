import { test, expect } from "../../fixtures/fixtures";
import { loginPage } from "../../pages/loginPage";
import { registerPage } from "../../pages/registerPage";
import { accountCreatedPage } from "../../pages/accountCreated";
import { accountDeletedPage } from "../../pages/accountDeleted";
import { homePage } from "../../pages/homePage";
import { enviroments } from "../../config/enviroments";
import users from "../../data/users.json";
import { RegisterUserData } from "../../pages/registerPage";

test("@smoke user can register", async ({ page }) => {
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputNameRegister.fill(users.newUser.name);
  await login.inputEmailRegister.fill(users.newUser.email);
  // Click register button
  await login.btnRegister.click();
  // Verify URL
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}/signup`);
  const register = new registerPage(page);
  // Verify name and email is in the register page
  await expect(register.inputName).toHaveValue(users.newUser.name);
  await expect(register.inputEmail).toHaveValue(users.newUser.email);
  // pass new user data
  await register.registerNewUser(users.newUser as RegisterUserData);
  // Verify URL to account created page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}/account_created`);
  const accountCreated = new accountCreatedPage(page);
  // Verify account created h2 text is visible
  await expect(accountCreated.h2AccountCreated).toHaveText("Account Created!");
  // Click continue button
  await accountCreated.clickContinue();
  // Verify URL to home page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}`);
  const home = new homePage(page);
  // Verify logout and delete account buttons are visible
  await expect(home.linkLogout).toBeVisible();
  await expect(home.linkDeleteAccount).toBeVisible();
  // Click delete account button
  await home.linkDeleteAccount.click();
  // Verify URL to delete account page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}/delete_account`);
  const accountDeleted = new accountDeletedPage(page);
  // Verify account deleted h2 text is visible
  await expect(accountDeleted.h2AccountDeleted).toHaveText("Account Deleted!");
  // Click continue button
  await accountDeleted.clickContinue();
  // Verify URL to home page
  await expect(page).toHaveURL(`${enviroments.dev.baseURL}`);
});
test("@regresion user cant not create an account with a register email", async ({
  page,
}) => {
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputNameRegister.fill(users.validUser.name);
  await login.inputEmailRegister.fill(users.validUser.email);
  // Click register button
  await login.btnRegister.click();
  const message = await login.getValidationMessageAtRegisterForm();
  await expect(message.length).toBeGreaterThan(0);
});
// test("@skip user can delete their own account", async ({ page }) => {
//   //this page does not keep account created data so we need to register a new user first
//   const login = new loginPage(page);
//   // Navigate to login page
//   await login.navigate();
//   // Fill name and email
//   await login.inputEmailLogin.fill(users.validUser.email);
//   await login.inputPasswordLogin.fill(users.validUser.password);
//   // Click login button
//   await login.btnLogin.click();
//   const home = new homePage(page);
//   // verify URL to home page
//   await expect(page).toHaveURL(`${enviroments.dev.baseURL}`);
//   // Verify logout button is visible
//   await expect(home.linkLogout).toBeVisible();
//   await expect(home.linkDeleteAccount).toBeVisible();
//   // Click delete account button
//   await home.linkDeleteAccount.click();
//   // Verify URL to delete account page
//   await expect(page).toHaveURL(`${enviroments.dev.baseURL}/delete_account`);
// });
const missingfields = ["password", "firstName", "lastName", "mobileNumber"];
for (const field of missingfields) {
  test(`@regression user can't make an account with missing '${field}' field`, async ({
    page,
  }) => {
    const login = new loginPage(page);
    // Navigate to login page
    await login.navigate();
    // Fill name and email
    await login.inputNameRegister.fill(users.newUser.name);
    await login.inputEmailRegister.fill(users.newUser.email);
    // Click register button
    await login.btnRegister.click();
    // Verify URL to home page
    await expect(page).toHaveURL(`${enviroments.dev.baseURL}/signup`);
    const register = new registerPage(page);
    // pass new user data with missing password field
    await register.registerNewUser({
      title: "Mr.",
      password: field === "password" ? "" : users.newUser.password,
      day: users.newUser.day,
      month: users.newUser.month,
      year: users.newUser.year,
      firstName: field === "firstName" ? "" : users.newUser.firstName,
      lastName: field === "lastName" ? "" : users.newUser.lastName,
      company: users.newUser.company,
      address: users.newUser.address,
      address2: users.newUser.address2,
      country: users.newUser.country,
      state: users.newUser.state,
      city: users.newUser.city,
      zipCode: users.newUser.zipCode,
      mobileNumber: field === "mobileNumber" ? "" : users.newUser.mobileNumber,
    });
    // Verify error password message is visible
    const message = await register.getValidationMessage(field);
    //console.log("error message = " + message);
    await expect(message.length).toBeGreaterThan(0);
  });
}
test("@regression user can't make an account with invalid email", async ({
  page,
}) => {
  const invalidEmail = "invalidemail";
  const login = new loginPage(page);
  // Navigate to login page
  await login.navigate();
  // Fill name and email
  await login.inputNameRegister.fill(users.newUser.name);
  await login.inputEmailRegister.fill(invalidEmail);
  // Click register button
  await login.btnRegister.click();

  // Verify error password message is visible
  const message = await login.getValidationMessage("email");
  //console.log("error message = " + message);
  await expect(message.length).toBeGreaterThan(0);
});
