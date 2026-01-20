import { Locator, Page } from "@playwright/test";
import users from "../data/users.json";
import { normalizeText } from "../utils/text";
type billingAddressDetailsString =
  `Your billing address\n${string} ${string} ${string}\n${string}\n${string}\n${string}\n${string} ${string} ${string}\n${string}\n${string}`;
type deliveryAddressDetailsString =
  `Your delivery address\n${string} ${string} ${string}\n${string}\n${string}\n${string}\n${string} ${string} ${string}\n${string}\n${string}`;

export class checkoutPage {
  readonly page: Page;
  readonly pTotalAmount: Locator;
  readonly ulDeliveryAddress: Locator;
  readonly ulBillingAddress: Locator;
  readonly btnPlaceOrder: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pTotalAmount = page.locator("p.cart_total_price");
    this.ulDeliveryAddress = page.locator("#address_delivery");
    this.ulBillingAddress = page.locator("#address_invoice");
    this.btnPlaceOrder = page.locator('a[href="/payment"]');
  }
  async totalAmount() {
    const totalAmount = await this.pTotalAmount.textContent();
    return totalAmount?.trim();
  }
  async clickPlaceOrder() {
    await this.btnPlaceOrder.click();
  }
  async compareBillingAddresses(): Promise<boolean> {
    const expectedBilingAdrressDetails: billingAddressDetailsString = `Your billing address\n${users.validUser.title} ${users.validUser.name} ${users.validUser.lastName}\n${users.validUser.company}\n${users.validUser.address}\n${users.validUser.address2}\n${users.validUser.city} ${users.validUser.state} ${users.validUser.zipCode}\n${users.validUser.country}\n${users.validUser.mobileNumber}`;
    const billingAddressDetails = await this.ulBillingAddress.innerText();
    if (
      normalizeText(billingAddressDetails).toLowerCase() !==
      normalizeText(expectedBilingAdrressDetails).toLowerCase()
    ) {
      return false;
    }
    return true;
  }
  async compareDeliveryAddresses(): Promise<boolean> {
    const expectedDeliveryAdrressDetails: deliveryAddressDetailsString = `Your delivery address\n${users.validUser.title} ${users.validUser.name} ${users.validUser.lastName}\n${users.validUser.company}\n${users.validUser.address}\n${users.validUser.address2}\n${users.validUser.city} ${users.validUser.state} ${users.validUser.zipCode}\n${users.validUser.country}\n${users.validUser.mobileNumber}`;
    const deliveryAddressDetails = await this.ulDeliveryAddress.innerText();
    if (
      normalizeText(deliveryAddressDetails).toLowerCase() !==
      normalizeText(expectedDeliveryAdrressDetails).toLowerCase()
    ) {
      return false;
    }
    return true;
  }
}
