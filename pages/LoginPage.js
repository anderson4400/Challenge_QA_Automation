const { BasePage } = require('./BasePage');
const { AllureUtils } = require('../utils/allureUtils');

/**
 * Page object for the SauceDemo login screen.
 * Handles username, password input and login button.
 */
class LoginPage extends BasePage {
    /**
     * @param {import('playwright').Page} page - Playwright page instance
     */
    constructor(page) {
        super(page);
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    /**
     * Opens the login page using BASE_URL from environment.
     */
    async navigate() {
        await this.navigateTo(process.env.BASE_URL);
    }

    /**
     * Performs login by entering credentials and clicking the login button.
     * @param {string} username - The username to enter
     * @param {string} password - The password to enter
     */
    async login(username, password) {
        await AllureUtils.step(`Ingresa credenciales en los campos`, this.page, async () => {
            await this.writeTextElement(this.usernameInput, username);
            await this.writeTextElement(this.passwordInput, password);
        });
        await this.clickToElement(this.loginButton);
    }
}

module.exports = { LoginPage };
