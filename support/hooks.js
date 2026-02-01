const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
require('dotenv').config();
require('allure-cucumberjs');

/** Step timeout: 60 seconds */
setDefaultTimeout(60 * 1000);

let browser;

/** Launches browser before all scenarios (chromium, firefox, webkit, chrome, or edge per BROWSER env) */
BeforeAll(async function () {
    const browserType = process.env.BROWSER || 'chromium';
    switch (browserType) {
        case 'firefox':
            browser = await firefox.launch({ headless: false });
            break;
        case 'webkit':
            browser = await webkit.launch({ headless: false });
            break;
        case 'edge':
            browser = await chromium.launch({ headless: false, channel: 'msedge' });
            break;
        case 'chrome':
            browser = await chromium.launch({ headless: false, channel: 'chrome' });
            break;
        default:
            browser = await chromium.launch({ headless: false });
    }
});

/** Closes the browser after all scenarios */
AfterAll(async function () {
    await browser.close();
});

/** Creates new context and page before each scenario */
Before(async function () {
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

/** Closes page and context after each scenario */
After(async function () {
    await this.page.close();
    await this.context.close();
});
