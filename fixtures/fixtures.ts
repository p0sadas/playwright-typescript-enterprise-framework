import { test as base, expect } from "@playwright/test";
export { expect };
import { loginPage } from "../pages/loginPage";
import { homePage } from "../pages/homePage";
import users from "../data/users.json";
import { enviroments } from "../config/enviroments";

type MyFixture = {
  home: homePage;
  loggedHome: homePage;
};

export const test = base.extend<MyFixture>({
  // Fixture for tests that don't require login
  home: async ({ page }, use) => {
    const home = new homePage(page);
    await home.navigate();
    await use(home);
  },

  // Fixture for tests that require login
  loggedHome: async ({ page }, use) => {
    const login = new loginPage(page);
    await login.navigate();
    await login.login(users.validUser.email, users.validUser.password);
    const home = new homePage(page);
    await expect(home.page).toHaveURL(`${enviroments.dev.baseURL}`);
    await expect(home.linkLoggedAs).toContainText("Logged in as");
    await use(home);
  },
  page: async ({ page }, use) => {
    await page.route("**/*", (route) => {
      if (/ads|doubleclick|googlesyndication/i.test(route.request().url())) {
        return route.abort();
      }
      route.continue();
    });

    await page.addInitScript(() => {
      const clean = () => {
        document
          .querySelectorAll('iframe, [class*="google-auto-placed"]')
          .forEach((e) => e.remove());
      };

      clean();
      setInterval(clean, 1000);
    });

    await use(page);
  },
});
