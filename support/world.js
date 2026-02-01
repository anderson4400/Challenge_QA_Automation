const { setWorldConstructor } = require('@cucumber/cucumber');

/**
 * Custom Cucumber World - holds shared state and Playwright objects across steps.
 * @property {Function} attach - Attach screenshots/data to reports
 * @property {Function} log - Log messages
 * @property {Object} parameters - Scenario parameters
 * @property {Object|null} browser - Browser instance (set in hooks)
 * @property {Object|null} context - Browser context (set in hooks)
 * @property {Object|null} page - Playwright page (set in hooks)
 */
class CustomWorld {
    constructor({ attach, log, parameters }) {
        this.attach = attach;
        this.log = log;
        this.parameters = parameters;
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}

setWorldConstructor(CustomWorld);
