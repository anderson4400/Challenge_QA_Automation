const { Then } = require('@cucumber/cucumber');
const { SidebarPage } = require('../pages/SidebarPage');

/** Step: Open sidebar and click logout to close session */
Then('cierro sesion', async function () {
    this.sidebarPage = new SidebarPage(this.page);
    await this.sidebarPage.logout();
});
