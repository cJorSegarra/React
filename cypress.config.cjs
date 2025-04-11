const { defineConfig } = require("cypress");

module.exports = defineConfig({
    env: {
        preserveOriginalScreenshot: false,
    },
    chromeWebSecurity: false,
    viewportWidth: 1680,
    viewportHeight: 940,
    defaultCommandTimeout: 10000,
    requestTimeout: 20000,

    e2e: {
        baseUrl: "http://localhost:5173",
        setupNodeEvents(on, config) {
            // Configura el plugin de snapshots
        },
        excludeSpecPattern: "**/examples/**/*.spec.js",
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        testIsolation: false,
        video: false,
    },
});
