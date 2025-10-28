const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: `report_${new Date().toISOString()}`.replace(/:/g, "-"), 
      reportPageTitle: 'Relatório de Testes API',
      embeddedScreenshots: true,
      saveAllAttempts: true,
      inlineAssets: true,
      saveHtml: true,
      saveJson: true,
      charts: true,
      quiet : true,
      debug : true,
      code : true
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
    },
  },
    trashAssetsBeforeRuns: true,
    screenshotsFolder: 'cypress/reports/screenshots',
    screenshotOnRunFailure: true, 
    videosFolder: 'cypress/reports/videos',
    videoOnFailure: false,
    ignoreVideos : false,
    video: true,
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://restful-booker.herokuapp.com',
    defaultCommandTimeout: 5000,
    viewportWidth: 1280,
    viewportHeight: 720,
    retries: 1,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});