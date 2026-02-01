const allure = require("allure-js-commons");

class AllureUtils {
  static async step(title, page, action) {
    await allure.step(title, async () => {
      await action();
      const screenshot = await page.screenshot();
      allure.attachment(`Allure-Evidence: ${title}`, screenshot, "image/png");
    });
  }
}

module.exports = { AllureUtils };
