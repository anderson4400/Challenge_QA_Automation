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
## 🛠️ Solución de Problemas con Allure Report

Si al ejecutar `npm run report` recibes un error indicando que `JAVA_HOME` es inválido o que Java no se encuentra, sigue estos pasos:

### 1. Requisito de Java
Allure es una herramienta basada en Java, por lo que es **obligatorio** tener instalado el JDK (Java Development Kit) en tu sistema.
* **Verificación:** Ejecuta `java -version` en tu terminal. Si no responde, descarga e instala

### 2. Configuración de `JAVA_HOME` (Paso Crítico)
El error más frecuente ocurre al incluir la carpeta `/bin` dentro de la variable de entorno. La variable debe apuntar únicamente a la carpeta raíz de la instalación.

* **Configuración correcta en Windows:**
    * **Variable:** `JAVA_HOME`
    * **Valor:** `C:\Program Files\Java\jdk-24` (Verifica que esta sea la ruta real en tu PC).
    * **⚠️ Importante:** Asegúrate de **NO** incluir `\bin` al final del valor de la variable.
* **Actualización del Path:**
    * Edita la variable de sistema `Path` y asegúrate de que incluya: `%JAVA_HOME%\bin`.

> **Nota:** Tras realizar estos cambios, es **necesario reiniciar Visual Studio Code** o cualquier terminal abierta para que el sistema reconozca la nueva configuración.

--

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

## 📑 Evidencia de Ejecución (CI/CD)

El proyecto cuenta con un flujo de trabajo automatizado en **GitHub Actions** que garantiza la integridad de los tests en cada cambio. 

Puedes encontrar la evidencia de las últimas ejecuciones en la pestaña **Actions** del repositorio. Al finalizar cada corrida, se generan automáticamente los siguientes artefactos:

* **allure-report**: Reporte interactivo detallado.
* **cucumber-report**: Reporte en formato HTML de las pruebas BDD.

### Visualización de Resultados en GitHub:
Una vez que el pipeline finaliza con éxito (Success), desplázate a la sección de **Artifacts** en la parte inferior del resumen del "run" para descargar los reportes:

> **Nota:** Los artefactos están configurados para conservarse por un periodo de 7 días.

## 👤 Creador

**Anderson Medina**
