# Convenciones de Nombres y Mejores Prácticas

Este documento define las convenciones de nombres y mejores prácticas para el proyecto de QA Automation. Sigue estas pautas para mantener el código consistente y mantenible.

---

## Tabla de Contenidos
1. [Archivos y Carpetas](#archivos-y-carpetas)
2. [Clases](#clases)
3. [Variables y Propiedades](#variables-y-propiedades)
4. [Métodos](#metodos)
5. [Localizadores (Propiedades de Page Object)](#localizadores-propiedades-de-page-object)
6. [Definiciones de Pasos](#definiciones-de-pasos)
7. [Archivos Feature y Gherkin](#archivos-feature-y-gherkin)
8. [Constantes](#constantes)
9. [Variables de Entorno](#variables-de-entorno)
10. [Sintaxis de Selectores y Localizadores](#sintaxis-de-selectores-y-localizadores)
11. [Archivos de Configuración](#archivos-de-configuracion)

---

## Archivos y Carpetas

| Tipo | Convención | Ejemplo | Notas |
|------|------------|---------|-------|
| **Page Objects** | PascalCase + `.js` | `LoginPage.js`, `ProductsPage.js` | Un archivo por página/pantalla |
| **Archivos de Definición de Pasos** | camelCase + `Steps` + `.js` | `loginSteps.js`, `productSteps.js` | Agrupar por funcionalidad/flujo |
| **Archivos Feature** | snake_case + `.feature` | `saucedemo_flow.feature`, `checkout_flow.feature` | Nombre descriptivo |
| **Archivos de Utilidades** | camelCase + `.js` | `allureUtils.js`, `dataUtils.js` | Clases estáticas o funciones de ayuda |
| **Archivos de Soporte** | camelCase + `.js` | `hooks.js`, `world.js` | Configuración de Cucumber |
| **Archivos de Config** | minúsculas + extensión | `cucumber.js`, `playwright.config.js` | Igualar valores predeterminados del framework |
| **Carpetas** | minúsculas o kebab-case | `pages/`, `step-definitions/`, `features/` | Usar plural para colecciones |

### Estructura de Carpetas
```
project/
├── features/           # Archivos Feature (.feature)
├── pages/              # Clases Page Object
├── step-definitions/   # Definiciones de pasos Cucumber
├── support/            # Hooks, world, configuración
├── utils/              # Utilidades reutilizables (ej. Allure)
├── reports/            # Reportes generados (opcional)
├── allure-results/     # Datos crudos de Allure
└── allure-report/      # Reporte HTML de Allure
```

---

## Clases

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Nombre de Clase** | PascalCase | `LoginPage`, `BasePage`, `ProductsPage` |
| **Clases de Página** | Sufijo con `Page` | `LoginPage`, `SidebarPage` |
| **Base/Abstracta** | Descriptivo + `Base` o `Abstract` | `BasePage` |
| **Utilidades** | PascalCase + `Utils` (si es clase estática) | `AllureUtils` |

```javascript
// ✅ Correcto
class LoginPage extends BasePage { }
class AllureUtils { static async step(...) { ... } }

// ❌ Evitar
class loginPage { }           // Debería ser PascalCase
class Login { }               // Agregar sufijo Page para POM
```

---

## Variables y Propiedades

| Contexto | Convención | Ejemplo |
|---------|------------|---------|
| **Variables locales** | camelCase | `userName`, `productCount` |
| **Propiedades de clase** | camelCase | `this.usernameInput`, `this.cartBadge` |
| **Cucumber World (this)** | camelCase + Sufijo Page | `this.loginPage`, `this.productsPage` |
| **Variables booleanas** | prefijo is/has/can | `isLoggedIn`, `hasItems`, `canSubmit` |

```javascript
// ✅ Correcto
this.loginPage = new LoginPage(this.page);
this.usernameInput = page.locator('[data-test="username"]');

// ❌ Evitar
this.LoginPage = ...          // No usar PascalCase para instancias
```

---

## Métodos

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Nombres de métodos** | camelCase | `navigate()`, `validateOnPage()` |
| **Acciones** | Verbo primero | `clickLogin()`, `fillUsername()`, `logout()` |
| **Validaciones** | prefijo `validate` o `assert` | `validateOnPage()`, `validateCartCount()` |
| **Navegación** | `navigate` o `open` | `navigate()`, `navigateTo()` |

```javascript
// ✅ Correcto
async login(username, password) { }
async logout() { }
async validateOnPage() { }

// ❌ Evitar
async Login() { }             // Usar camelCase
async doTheThing() { }        // Ser descriptivo
```

---

## Localizadores (Propiedades de Page Object)

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Nombramiento** | camelCase + tipo/rol de elemento | `usernameInput`, `loginButton` |
| **Campos de entrada** | Sufijo con `Input` | `usernameInput`, `passwordInput` |
| **Botones** | Sufijo con `Button` | `loginButton`, `addToCartButton` |
| **Enlaces** | Sufijo con `Link` | `logoutLink` |
| **Menús** | Descriptivo | `burgerMenu`, `mainMenu` |

---

## Definiciones de Pasos

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Nombre de archivo** | `{dominio}Steps.js` | `loginSteps.js`, `productSteps.js` |
| **Idioma** | Español | Pasos definidos en español |
| **Una responsabilidad por archivo** | Agrupar por funcionalidad/flujo | `loginSteps`, `SidebarSteps` |

*Nota: Se permite PascalCase en archivos de pasos si agrupan una clase o componente principal (ej. `SidebarSteps.js`), pero se prefiere camelCase para flujos generales.*

```javascript
// ✅ Correcto
Given('navegamos a la pagina de login', async function () { ... });
Then('cierro sesion', async function () { ... });
```

---

## Archivos Feature y Gherkin

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Nombre de archivo** | `{modulo_o_flujo}_flow.feature` o descriptivo | `saucedemo_flow.feature` |
| **Idioma** | Español (para sentencias Gherkin) | Feature, Scenario, Given, When, Then |

```gherkin
# ✅ Correcto
Feature: Flujo de compra en SauceDemo

  Scenario: Login exitoso y agregar producto al carrito
    Given navegamos a la pagina de login
    When ingreso el usuario y password configurados
    Then valido que el login fue exitoso mostrando la lista de productos
```

---

## Constantes y Variables de Entorno

| Regla | Convención | Ejemplo |
|------|------------|---------|
| **Constantes** | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT` |
| **Env Vars** | UPPER_SNAKE_CASE | `BASE_URL`, `SAUCEDEMO_USER` |

---

## Referencia Rápida del Proyecto

| Elemento | Actual en Proyecto |
|---------|--------------------|
| **Features** | `features/saucedemo_flow.feature` |
| **Pages** | `pages/LoginPage.js`, `pages/SidebarPage.js`, `pages/BasePage.js` |
| **Steps** | `step-definitions/loginSteps.js`, `step-definitions/SidebarSteps.js` |
| **Utils** | `utils/allureUtils.js` |
| **Config** | `playwright.config.js`, `cucumber.js` |

---

## Nota de Consistencia

Mantener el idioma español en los pasos Gherkin y comentarios de alto nivel. El código (nombres de variables, funciones) debe permanecer en Inglés (camelCase/PascalCase) para seguir estándares globales, excepto el texto de los steps que enlaza con Gherkin.
