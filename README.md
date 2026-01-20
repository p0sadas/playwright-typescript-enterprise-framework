<div align="center">

# 🎭 Playwright TypeScript Enterprise Framework

[![Playwright Tests](https://github.com/p0sadas/playwright-typescript-enterprise-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/p0sadas/playwright-typescript-enterprise-framework/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.57-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)

**A professional-grade test automation framework showcasing modern testing practices with Playwright and TypeScript**

🌐 **Test Target**: [Automation Exercise](https://automationexercise.com) - A full-featured e-commerce demo site

[Features](#-features) • [Featured Test](#-featured-test-api-login--ui-validation) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started)

---

[Versión en Español](README.es.md)

</div>

---

## ⚡ Features

| Feature                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| 🏗️ **Page Object Model**        | Clean, maintainable architecture with 11+ reusable page objects       |
| 🔄 **API + UI Hybrid Testing**  | Seamless integration between API calls and UI validations             |
| 🌐 **Multi-Browser Support**    | Parallel testing across Chromium, Firefox, and WebKit                 |
| 🏷️ **Tag-Based Test Filtering** | Run specific suites with `@smoke`, `@api`, `@regression`, `@critical` |
| 🔧 **Custom Fixtures**          | Reusable test setup patterns for authenticated sessions               |
| 🚀 **CI/CD Ready**              | GitHub Actions workflow with matrix testing                           |

---

## 🌟 Featured Test: API Login → UI Validation

> **This test demonstrates a sophisticated hybrid testing approach that combines API efficiency with UI verification**

### 💡 The Challenge

Traditional UI login tests are slow and fragile. What if we could authenticate via API and then validate the session in the browser?

### 🔧 The Solution

```typescript
test("@api @regression login with api and validate in ui", async ({
  browser,
  request,
}) => {
  // 1️⃣ Extract CSRF token from login page HTML
  const loginPageHTML = await request.get(`${enviroments.dev.baseURL}/login`);
  const html = await loginPageHTML.text();
  const csrfmiddlewaretoken = html.match(
    /name="csrfmiddlewaretoken" value="(.+?)"/,
  )?.[1];

  // 2️⃣ Authenticate via API with CSRF protection
  const response = await request.post(`${enviroments.dev.baseURL}/login`, {
    headers: {
      Referer: `${enviroments.dev.baseURL}/`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    form: {
      csrfmiddlewaretoken: csrfmiddlewaretoken,
      email: users.validUser.email,
      password: users.validUser.password,
    },
  });
  expect(response.status()).toBe(200);

  // 3️⃣ Transfer authenticated session to browser context
  const context = await browser.newContext({
    storageState: await request.storageState(),
  });

  // 4️⃣ Validate login state in UI
  const pageWithLogin = await context.newPage();
  await pageWithLogin.goto(`${enviroments.dev.baseURL}`);
  await expect(pageWithLogin.getByText("Logged in as")).toBeVisible();
});
```

### 🎯 Why This Matters

```
┌─────────────────────────────────────────────────────────────────┐
│                    API-UI HYBRID APPROACH                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📡 API Layer          🔄 Session Transfer        🖥️ UI Layer   │
│   ────────────          ─────────────────         ──────────    │
│   • CSRF extraction     • Storage state           • Logged-in   │
│   • Fast auth           • Cookie transfer           validation  │
│   • Response checks     • Context creation        • Visual check│
│                                                                  │
│   ⚡ Speed: 10x faster than UI-only login                        │
│   🛡️ Security: Handles CSRF tokens properly                      │
│   ✅ Reliability: Decouples auth from UI changes                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
playwright-typescript-enterprise-framework/
├── 📁 config/
│   └── enviroments.ts          # Environment configurations
├── 📁 data/
│   └── users.json              # Test data
├── 📁 fixtures/
│   └── fixtures.ts             # Custom Playwright fixtures
├── 📁 pages/                   # Page Object Model
│   ├── homePage.ts
│   ├── loginPage.ts
│   ├── registerPage.ts
│   ├── checkoutPage.ts
│   ├── paymentPage.ts
│   └── ... (11 page objects)
├── 📁 tests/
│   ├── 📁 api/                 # API tests
│   │   ├── login.api.spec.ts
│   │   └── products.api.spec.ts
│   ├── 📁 auth/                # Auth UI tests
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── 📁 e2e/                 # End-to-End integration
│   │   └── api-ui.spec.ts      # ⭐ Featured hybrid test
│   └── 📁 ui/                  # UI tests
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── products.spec.ts
├── 📁 .github/workflows/
│   └── playwright.yml          # CI/CD pipeline
└── playwright.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/p0sadas/playwright-typescript-enterprise-framework.git

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npm test

# Run by tag
npm run test:smoke       # Quick sanity checks
npm run test:api         # API tests only
npm run test:regression  # Full regression suite
npm run test:critical    # Critical path tests

# Run by browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run with visible browser
npm run test:headed

# View test report
npm run report
```

---

## 🛠️ Tech Stack

<div align="center">

|                                                          Technology                                                           |    Purpose     |
| :---------------------------------------------------------------------------------------------------------------------------: | :------------: |
|       ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)       | Test Framework |
|       ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)       |  Type Safety   |
|           ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)            |    Runtime     |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) |     CI/CD      |

</div>

---

## 📊 Test Coverage

| Suite      | Tests                          | Tags                                 |
| ---------- | ------------------------------ | ------------------------------------ |
| API Tests  | Login validation, Products API | `@api`, `@smoke`, `@regression`      |
| Auth Tests | Login, Register, Logout        | `@smoke`, `@regression`              |
| UI Tests   | Cart, Checkout, Products       | `@smoke`, `@critical`, `@functional` |
| E2E Tests  | API-UI Integration             | `@api`, `@regression`                |

---

## 👨‍💻 Author

**[Angel Posadas Ruano]**

- 💼 [LinkedIn](https://www.linkedin.com/in/angel-posadas-ruano-248536393)
- 🐙 [GitHub](https://github.com/p0sadas)
- 📧 [Email](mailto:posadasangel9@gmail.com)

---

<div align="center">

**Built with ❤️ and ☕ by a QA Engineer passionate about test automation**

_Feel free to ⭐ this repository if you find it useful!_

</div>
