import { Page, Locator } from "@playwright/test";
import { enviroments } from "../config/enviroments";
export type RegisterUserData = {
  title: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
};
export class registerPage {
  readonly page: Page;
  readonly divRadioBtnMr: Locator;
  readonly divRadioBtnMrs: Locator;
  readonly inputName: Locator;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly inputDay: Locator;
  readonly inputMonth: Locator;
  readonly inputYear: Locator;
  readonly checkBoxNewsLetter: Locator;
  readonly checkBoxSpecialOffers: Locator;
  readonly inputFirstName: Locator;
  readonly inputLastName: Locator;
  readonly inputCompany: Locator;
  readonly inputAddress: Locator;
  readonly inputAddress2: Locator;
  readonly inputCountry: Locator;
  readonly inputState: Locator;
  readonly inputCity: Locator;
  readonly inputZipCode: Locator;
  readonly inputMobileNumber: Locator;
  readonly btnCreateAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.divRadioBtnMr = page.locator("#uniform-id_gender1");
    this.divRadioBtnMrs = page.locator("#uniform-id_gender2");
    this.inputName = page.locator('[data-qa="name"]');
    this.inputEmail = page.locator('[data-qa="email"]');
    this.inputPassword = page.locator('[data-qa="password"]');
    this.inputDay = page.locator('[data-qa="days"]');
    this.inputMonth = page.locator('[data-qa="months"]');
    this.inputYear = page.locator('[data-qa="years"]');
    this.checkBoxNewsLetter = page.locator("#newsletter");
    this.checkBoxSpecialOffers = page.locator("#optin");
    this.inputFirstName = page.locator('[data-qa="first_name"]');
    this.inputLastName = page.locator('[data-qa="last_name"]');
    this.inputCompany = page.locator('[data-qa="company"]');
    this.inputAddress = page.locator('[data-qa="address"]');
    this.inputAddress2 = page.locator('[data-qa="address2"]');
    this.inputCountry = page.locator('[data-qa="country"]');
    this.inputState = page.locator('[data-qa="state"]');
    this.inputCity = page.locator('[data-qa="city"]');
    this.inputZipCode = page.locator('[data-qa="zipcode"]');
    this.inputMobileNumber = page.locator('[data-qa="mobile_number"]');
    this.btnCreateAccount = page.locator('[data-qa="create-account"]');
  }

  async navigate() {
    await this.page.goto(`${enviroments.dev.baseURL}/login`);
  }

  async registerNewUser(userData: RegisterUserData) {
    if (userData.title === "Mr.") {
      await this.divRadioBtnMr.click();
    } else if (userData.title === "Mrs.") {
      await this.divRadioBtnMrs.click();
    }
    await this.inputPassword.fill(userData.password || "");
    if (userData.day) await this.inputDay.selectOption(userData.day);
    if (userData.month) await this.inputMonth.selectOption(userData.month);
    if (userData.year) await this.inputYear.selectOption(userData.year);
    await this.checkBoxNewsLetter.check();
    await this.checkBoxSpecialOffers.check();
    await this.inputFirstName.fill(userData.firstName || "");
    await this.inputLastName.fill(userData.lastName || "");
    await this.inputCompany.fill(userData.company || "");
    await this.inputAddress.fill(userData.address || "");
    await this.inputAddress2.fill(userData.address2 || "");
    await this.inputCountry.selectOption(userData.country || "");
    await this.inputState.fill(userData.state || "");
    await this.inputCity.fill(userData.city || "");
    await this.inputZipCode.fill(userData.zipCode || "");
    await this.inputMobileNumber.fill(userData.mobileNumber || "");
    await this.btnCreateAccount.click();
  }
  async getValidationMessage(fieldName: string): Promise<string> {
    const locatorMap: { [key: string]: string } = {
      divRadioBtnMr: "#uniform-id_gender1",
      divRadioBtnMrs: "#uniform-id_gender2",
      name: "[data-qa='name']",
      email: "[data-qa='email']",
      password: "[data-qa='password']",
      day: "[data-qa='days']",
      month: "[data-qa='months']",
      year: "[data-qa='years']",
      checkBoxNewsLetter: "#newsletter",
      checkBoxSpecialOffers: "#optin",
      firstName: "[data-qa='first_name']",
      lastName: "[data-qa='last_name']",
      company: "[data-qa='company']",
      address: "[data-qa='address']",
      address2: "[data-qa='address2']",
      country: "[data-qa='country']",
      state: "[data-qa='state']",
      city: "[data-qa='city']",
      zipCode: "[data-qa='zipcode']",
      mobileNumber: "[data-qa='mobile_number']",
    };
    const selector = locatorMap[fieldName];
    return await this.page.$eval(
      selector,
      (el: HTMLInputElement) => el.validationMessage
    );
  }
}
