const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');
const { AllureUtils } = require('../utils/allureUtils');

/**
 * Page object for the SauceDemo products catalog.
 * Displayed after successful login; shows product list and cart.
 */
class ProductsPage extends BasePage {
    /**
     * @param {import('playwright').Page} page - Playwright page instance
     */
    constructor(page) {
        super(page);
        this.title = page.locator('[data-test="title"]');
        this.inventoryItem = page.locator('.inventory_item').first();
        this.addToCartButton = page.locator('[data-test^="add-to-cart"]').first();
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    /**
     * Asserts that the inventoryItem  page is displayed correctly.
     */
    async validateOnPage() {
        await AllureUtils.step('Se inicia seccion de manera correcta.', this.page, async () => {
            await this.highlightElement(this.inventoryItem.first());
            await expect(this.inventoryItem.first()).toBeVisible();
        });
    }

    /**
     * Clicks the first product's Add to cart button.
     */
    async addFirstProductToCart() {
      await AllureUtils.step('Agrega el primer producto al carrito.', this.page, async () => {
        await this.clickToElement(this.addToCartButton);
    });
    }

    /**
     * Asserts the cart badge displays the expected item count.
     * @param {number} count - Expected number of items in cart
     */
    async validateCartCount(count) {
        await AllureUtils.step(`Valida que el carrito muestra ${count} item(s).`, this.page, async () => {
            await this.highlightElement(this.cartBadge);
            await expect(this.cartBadge).toHaveText(count.toString());
        });
    }
}

module.exports = { ProductsPage };
