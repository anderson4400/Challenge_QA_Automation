const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

/** Step: Navigate to the login page */
Given('navegamos a la pagina de login', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
});

/** Step: Enter credentials from environment (SAUCEDEMO_USER, SAUCEDEMO_PASS) */
When('ingreso el usuario y password configurados', async function () {
    await this.loginPage.login(process.env.SAUCEDEMO_USER, process.env.SAUCEDEMO_PASS);
});

/** Step: Validate successful login */
Then('valido que el login fue exitoso mostrando la lista de productos', async function () {
    this.productsPage = new ProductsPage(this.page);
    await this.productsPage.validateOnPage();
});
