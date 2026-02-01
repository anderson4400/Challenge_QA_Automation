const { expect } = require('@playwright/test');

/**
 * Base page object class with shared actions for all pages.
 * All page classes should extend this class.
 */
class BasePage {
    /**
     * @param {import('playwright').Page} page - Playwright page instance
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Navigates the browser to the given URL.
     * @param {string} url - The URL to navigate to
     */
    async navigateTo(url) {
        await this.page.goto(url);
    }

    /**
     * Highlights an element with a red border for debugging.
     * @param {import('playwright').Locator} locator - The element to highlight
     */
    async highlightElement(element) {
        await element.evaluate(el => el.style.border = '3px solid red');
    }

    /**
     * Clicks an element after ensuring it is visible and highlighting it.
     * @param {import('playwright').Locator} element - The element to click
     */
    async clickToElement(element) {
        await expect(element).toBeVisible()
        await this.highlightElement(element);
        await element.click()
    }

    /**
     * Fills an input element with text after ensuring visibility.
     * @param {import('playwright').Locator} element - The input element
     * @param {string} text - The text to type
     */
    async writeTextElement(element, text) {
        await expect(element).toBeVisible();
        await this.highlightElement(element);
        return await element.fill(text);
    }

    /**
     * Gets the inner text of an element and highlights it.
     * @param {import('playwright').Locator} locator - The element to read
     * @returns {Promise<string>} The element's inner text
     */
    async getText(element) {
        await this.highlightElement(element);
        return await element.innerText();
    }

    /**
     * Gets the value of an HTML attribute from an element.
     * @param {import('playwright').Locator} locator - The element
     * @param {string} attribute - The attribute name (e.g. 'href', 'value')
     * @returns {Promise<string|null>} The attribute value or null
     */
    async getAttribute(element, attribute) {
        return await element.getAttribute(attribute);
    }
}

module.exports = { BasePage };
