<div align="center">
  
# 🎭 Playwright TypeScript Enterprise Framework (Español)

[![Playwright Tests](https://github.com/p0sadas/playwright-typescript-enterprise-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/p0sadas/playwright-typescript-enterprise-framework/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.57-45ba4b?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)

**Un framework de automatización de pruebas de nivel profesional que muestra prácticas modernas de testing con Playwright y TypeScript**

🌐 **Objetivo de Pruebas**: [Automation Exercise](https://automationexercise.com) - Un sitio demo de e-commerce completo

[Características](#-características) • [Prueba Destacada](#-prueba-destacada-inicio-de-sesión-api--validación-ui) • [Estructura del Proyecto](#-estructura-del-proyecto) • [Primeros Pasos](#-primeros-pasos)

---

[English Version](README.md)

</div>

---

## ⚡ Características

| Característica                           | Descripción                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------ |
| 🏗️ **Page Object Model**                 | Arquitectura limpia y mantenible con más de 11 objetos de página reutilizables |
| 🔄 **Pruebas Híbridas API + UI**         | Integración fluida entre llamadas API y validaciones de interfaz de usuario    |
| 🌐 **Soporte Multi-Navegador**           | Pruebas en paralelo en Chromium, Firefox y WebKit                              |
| 🏷️ **Filtrado de Pruebas por Etiquetas** | Ejecuta suites específicas con `@smoke`, `@api`, `@regression`, `@critical`    |
| 🔧 **Fixtures Personalizados**           | Patrones de configuración de pruebas reutilizables para sesiones autenticadas  |
| 🚀 **Listo para CI/CD**                  | Flujo de trabajo de GitHub Actions con pruebas en matriz                       |

---

## 🌟 Prueba Destacada: Inicio de Sesión API → Validación UI

> **Esta prueba demuestra un enfoque de prueba híbrido sofisticado que combina la eficiencia de la API con la verificación de la interfaz de usuario**

### 💡 El Desafío

Las pruebas tradicionales de inicio de sesión en la interfaz de usuario son lentas y frágiles. ¿Qué pasaría si pudiéramos autenticarnos a través de la API y luego validar la sesión en el navegador?

### 🔧 La Solución

```typescript
test("@api @regression login with api and validate in ui", async ({
  browser,
  request,
}) => {
  // 1️⃣ Extraer el token CSRF del HTML de la página de inicio de sesión
  const loginPageHTML = await request.get(`${enviroments.dev.baseURL}/login`);
  const html = await loginPageHTML.text();
  const csrfmiddlewaretoken = html.match(
    /name="csrfmiddlewaretoken" value="(.+?)"/,
  )?.[1];

  // 2️⃣ Autenticarse a través de la API con protección CSRF
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

  // 3️⃣ Transferir la sesión autenticada al contexto del navegador
  const context = await browser.newContext({
    storageState: await request.storageState(),
  });

  // 4️⃣ Validar el estado del inicio de sesión en la interfaz de usuario
  const pageWithLogin = await context.newPage();
  await pageWithLogin.goto(`${enviroments.dev.baseURL}`);
  await expect(pageWithLogin.getByText("Logged in as")).toBeVisible();
});
```

### 🎯 Por qué esto es importante

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENFOQUE HÍBRIDO API-UI                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   📡 Capa API           🔄 Transferencia de Sesión 🖥️ Capa UI    │
│   ────────────          ───────────────────────    ──────────    │
│   • Extracción CSRF     • Estado de almacenamiento • Validación  │
│   • Autenticación rápida• Transferencia de cookies   de login    │
│   • Verificación resp.  • Creación de contexto     • Verif. visual│
│                                                                  │
│   ⚡ Velocidad: 10 veces más rápido que el login solo por UI      │
│   🛡️ Seguridad: Maneja tokens CSRF correctamente                  │
│   ✅ Fiabilidad: Desacopla la autenticación de cambios en la UI   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Estructura del Proyecto

```
playwright-typescript-enterprise-framework/
├── 📁 config/
│   └── enviroments.ts          # Configuraciones de entorno
├── 📁 data/
│   └── users.json              # Datos de prueba
├── 📁 fixtures/
│   └── fixtures.ts             # Fixtures personalizados de Playwright
├── 📁 pages/                   # Modelo de Objetos de Página (POM)
│   ├── homePage.ts
│   ├── loginPage.ts
│   ├── registerPage.ts
│   ├── checkoutPage.ts
│   ├── paymentPage.ts
│   └── ... (11 objetos de página)
├── 📁 tests/
│   ├── 📁 api/                 # Pruebas de API
│   │   ├── login.api.spec.ts
│   │   └── products.api.spec.ts
│   ├── 📁 auth/                # Pruebas de interfaz de autenticación
│   │   ├── login.spec.ts
│   │   └── register.spec.ts
│   ├── 📁 e2e/                 # Integración de extremo a extremo
│   │   └── api-ui.spec.ts      # ⭐ Prueba híbrida destacada
│   └── 📁 ui/                  # Pruebas de interfaz de usuario
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       └── products.spec.ts
├── 📁 .github/workflows/
│   └── playwright.yml          # Pipeline de CI/CD
└── playwright.config.ts
```

---

## 🚀 Primeros Pasos

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/p0sadas/playwright-typescript-enterprise-framework.git

# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

### Ejecución de Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar por etiqueta (tag)
npm run test:smoke       # Verificaciones rápidas de cordura
npm run test:api         # Solo pruebas de API
npm run test:regression  # Suite completa de regresión
npm run test:critical    # Pruebas de camino crítico

# Ejecutar por navegador
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Ejecutar con navegador visible (headed)
npm run test:headed

# Ver reporte de pruebas
npm run report
```

---

## 🛠️ Stack Tecnológico

<div align="center">

|                                                          Tecnología                                                           |      Propósito       |
| :---------------------------------------------------------------------------------------------------------------------------: | :------------------: |
|       ![Playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=playwright&logoColor=white)       | Framework de Pruebas |
|       ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)       |   Tipado Estático    |
|           ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)            | Entorno de Ejecución |
| ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white) |        CI/CD         |

</div>

---

## 📊 Cobertura de Pruebas

| Suite      | Pruebas                               | Etiquetas                            |
| ---------- | ------------------------------------- | ------------------------------------ |
| API Tests  | Validación de login, API de productos | `@api`, `@smoke`, `@regression`      |
| Auth Tests | Login, Registro, Logout               | `@smoke`, `@regression`              |
| UI Tests   | Carrito, Pago, Productos              | `@smoke`, `@critical`, `@functional` |
| E2E Tests  | Integración API-UI                    | `@api`, `@regression`                |

---

## 👨‍💻 Autor

**[Angel Posadas Ruano]**

- 💼 [LinkedIn](https://www.linkedin.com/in/angel-posadas-ruano-248536393)
- 🐙 [GitHub](https://github.com/p0sadas)
- 📧 [Email](mailto:posadasangel9@gmail.com)

---

<div align="center">

**Construido con ❤️ y ☕ por un QA Engineer apasionado por la automatización de pruebas**

_¡Siéntete libre de dar una ⭐ a este repositorio si te resulta útil!_

</div>
