module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step-definitions/**/*.js', 'support/**/*.js'],
    format: ['html:cucumber-report.html', 'allure-cucumberjs/reporter:allure-results/.stream', 'progress'],
    formatOptions: {
      resultsDir: 'allure-results'
    },
    parallel: 1,
    publishQuiet: true
  }
};
