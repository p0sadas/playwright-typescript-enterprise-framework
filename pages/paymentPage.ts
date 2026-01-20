import { Page, Locator } from "@playwright/test";
export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvv: string;
  expiryMonth: string;
  expiryYear: string;
}
export class paymentPage {
  readonly page: Page;
  readonly nameOnCard: Locator;
  readonly cardNumber: Locator;
  readonly cvv: Locator;
  readonly expiryMonth: Locator;
  readonly expiryYear: Locator;
  readonly btnPay: Locator;
  constructor(page: Page) {
    this.page = page;
    this.nameOnCard = page.locator("input[name='name_on_card']");
    this.cardNumber = page.locator("input[name='card_number']");
    this.cvv = page.locator("input[data-qa='cvc']");
    this.expiryMonth = page.locator("input[data-qa='expiry-month']");
    this.expiryYear = page.locator("input[data-qa='expiry-year']");
    this.btnPay = page.locator("[data-qa='pay-button']");
  }
  async pay(details: PaymentDetails) {
    await this.nameOnCard.fill(details.nameOnCard);
    await this.cardNumber.fill(details.cardNumber);
    await this.cvv.fill(details.cvv);
    await this.expiryMonth.fill(details.expiryMonth);
    await this.expiryYear.fill(details.expiryYear);
    await this.btnPay.click();
  }
}
