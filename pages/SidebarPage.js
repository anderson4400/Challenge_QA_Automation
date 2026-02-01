const { BasePage } = require('./BasePage');
const { AllureUtils } = require('../utils/allureUtils');

/**
 * Page object for the SauceDemo sidebar (burger menu).
 * Handles menu open and logout action.
 */
class SidebarPage extends BasePage {
    /**
     * @param {import('playwright').Page} page - Playwright page instance
     */
    constructor(page) {
        super(page);
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    /**
     * Opens the burger menu and clicks logout to sign out.
     */
    async logout() {
        await AllureUtils.step('Cierra sesión desde el menú lateral.', this.page, async () => {
            await this.clickToElement(this.burgerMenu);
            await this.clickToElement(this.logoutLink);
        });
    }
}

module.exports = { SidebarPage };
