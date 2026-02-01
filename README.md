# Challenge QA Automation (SauceDemo)

Este repositorio contiene la solución al desafío de automatización usando **Playwright + Cucumber + Node.js**.

## 🛠️ Tecnologías

- **Node.js**: Entorno de ejecución.
- **Playwright**: Automatización de navegador (rápido, confiable, manejo automático de esperas).
- **CucumberJS**: Framework BDD para tests legibles.
- **Chai/Playwright Expect**: Aserciones robustas.

## 🚀 Instalación

1.  Clonar el repositorio o descargar el código.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
    *(Esto instalará playwright, cucumber y las herramientas necesarias)*

3.  Instalar navegadores de Playwright (si no se descargaron automáticamente):
    ```bash
    npx playwright install
    ```

4.  Configurar variables de entorno:
    Crear un archivo `.env` en la raíz usar `.env.example` como guía o usar el siguiente contenido:
    ```env
    BASE_URL=https://www.saucedemo.com/ 
    SAUCEDEMO_USER=standard_user
    SAUCEDEMO_PASS=secret_sauce
    BROWSER=chromium
    ```

## 🏃 Ejecución

Para ejecutar los tests (escenarios definidos en `.feature`):

```bash
npm run test
```

Esto abrirá el navegador (configurado como `headless: false` en `support/hooks.js` para visualización) y generará:
- Reporte en consola (progress)
- `cucumber-report.html`
- Datos para reporte Allure en `allure-results/`

**Reporte Allure (HTML visual):**
```bash
npm run generate-report   # Genera allure-report/
npm run open-report       # Abre el reporte en el navegador
npm run report            # Ambos en secuencia
```

## 📚 Documentación

- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** — Convenciones de nombres y buenas prácticas del proyecto.

## 🏗️ Arquitectura y Decisiones Técnicas

El proyecto sigue el patrón **Page Object Model (POM)** y la estructura estándar de Cucumber:

-   **`features/`**: Archivos `.feature` con escenarios Gherkin (Lenguaje natural).
-   **`pages/`**: Clases POM (`LoginPage`, `ProductsPage` , `SidebarPage`,) que encapsulan los selectores y la lógica de interacción con la UI. Se usan selectores resilientes
-   **`step-definitions/`**: entre Gherkin y el código JS. Se separaron en `loginSteps`, `SidebarSteps` y `productSteps` por funcionalidad.
-   **`support/`**:
    -   `world.js`: Gestión del contexto de Cucumber (`CustomWorld`) para compartir `page` y `browser` entre steps.
    -   `hooks.js`: `Before`/`After` hooks para inicializar y cerrar el navegador/contexto limpiamente, evitando estado compartido indeseado.
-   **`playwright.config.js`**: Configuración centralizada.

### 💡 Buenas Prácticas Aplicadas
-   **Evitar `waitForTimeout`**: Se utiliza el auto-waiting de Playwright y aserciones web-first (`expect(locator).toBeVisible()`).
-   **Selectores Robustos**: Prioridad a `data-test` attributes.
-   **Independencia**: Cada escenario inicia un nuevo contexto de navegador.

## 👤 Creador

**Anderson Medina**
