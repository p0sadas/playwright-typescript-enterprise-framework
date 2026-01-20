import { Page, Locator } from "@playwright/test";
import { enviroments } from "../config/enviroments";
export class loginPage {
  readonly page: Page;
  readonly inputEmailLogin: Locator;
  readonly inputPasswordLogin: Locator;
  readonly btnLogin: Locator;
  readonly inputEmailRegister: Locator;
  readonly inputNameRegister: Locator;
  readonly btnRegister: Locator;
  readonly validationMessage: Locator;
  readonly validationMessageRegister: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputEmailLogin = page.locator('[data-qa="login-email"]');
    this.inputPasswordLogin = page.locator('[data-qa="login-password"]');
    this.btnLogin = page.locator('[data-qa="login-button"]');
    this.inputEmailRegister = page.locator('[data-qa="signup-email"]');
    this.inputNameRegister = page.locator('[data-qa="signup-name"]');
    this.btnRegister = page.locator('[data-qa="signup-button"]');
    this.validationMessage = page.locator('form[action="/login"]').locator("p");
    this.validationMessageRegister = page
      .locator('form[action="/signup"]')
      .locator("p");
  }

  async navigate() {
    await this.page.goto(`${enviroments.dev.baseURL}/login`);
  }

  async login(email: string, password: string) {
    await this.inputEmailLogin.fill(email);
    await this.inputPasswordLogin.fill(password);
    await this.btnLogin.click();
  }

  async register(email: string, name: string) {
    await this.inputEmailRegister.fill(email);
    await this.inputNameRegister.fill(name);
    await this.btnRegister.click();
  }
  async getValidationMessage(fieldName: string): Promise<string> {
    const locatorMap: { [key: string]: string } = {
      email: "[data-qa='signup-email']",
      name: "[data-qa='signup-name']",
    };
    const selector = locatorMap[fieldName];
    return await this.page.$eval(
      selector,
      (el: HTMLInputElement) => el.validationMessage,
    );
  }
  async getValidationMessageAtLoginForm() {
    return await this.validationMessage.innerText();
  }
  async getValidationMessageAtRegisterForm() {
    return await this.validationMessageRegister.innerText();
  }
}
