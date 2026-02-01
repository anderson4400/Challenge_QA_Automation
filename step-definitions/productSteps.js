const { When, Then, And } = require('@cucumber/cucumber');
const { ProductsPage } = require('../pages/ProductsPage');

/** Step: Add the first product to the cart */
When('agrego un producto al carrito', async function () {
    if (!this.productsPage) this.productsPage = new ProductsPage(this.page);
    await this.productsPage.addFirstProductToCart();
});

/** Step: Validate cart badge shows the given item count. @param {number} count - Expected cart count */
Then('valido que el carrito muestra {int} item', async function (count) {
    if (!this.productsPage) this.productsPage = new ProductsPage(this.page);
    await this.productsPage.validateCartCount(count);
});



