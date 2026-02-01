const { Before, After, AfterStep, BeforeAll, AfterAll, setDefaultTimeout , Status} = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
require('dotenv').config();
require('allure-cucumberjs');

/** Step timeout: 60 seconds */
setDefaultTimeout(60 * 1000);

let browser;
const isHeadless = process.env.CI === 'true';

/** Launches browser before all scenarios (chromium, firefox, webkit, chrome, or edge per BROWSER env) */
BeforeAll(async function () {
    const browserType = process.env.BROWSER || 'chromium';

    const launchOptions = { headless: isHeadless };

    switch (browserType) {
        case 'firefox':
            browser = await firefox.launch(launchOptions);
            break;
        case 'webkit':
            browser = await webkit.launch(launchOptions);
            break;
        case 'edge':
            browser = await chromium.launch({ ...launchOptions, channel: 'msedge' });
            break;
        case 'chrome':
            browser = await chromium.launch({ ...launchOptions, channel: 'chrome' });
            break;
        default:
            browser = await chromium.launch(launchOptions);
    }
});

/** Closes the browser after all scenarios */
AfterAll(async function () {
    if (browser) await browser.close();
});

/** Creates new context and page before each scenario */
Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

/** Captura de pantalla después de CADA PASO */
AfterStep(async function () {
    // Tomamos captura del viewport actual para ver el progreso paso a paso
    const image = await this.page.screenshot();
    this.attach(image, 'image/x-cucumber-screenshot');
});

/** Closes page and context after each scenario + Final Screenshot */
After(async function (scenario) {
    const status = scenario.result?.status;

    // Captura final: Si falla es Full Page para ver todo el error, si pasa es normal
    const screenshot = await this.page.screenshot({
        fullPage: status === Status.FAILED
    });

    const label = status === Status.FAILED ? "Final-Screenshot-Error" : "Final-Screenshot-Success";
    this.attach(screenshot, { fileName: label, mediaType: 'image/png' });

    await this.page.close();
    await this.context.close();
});