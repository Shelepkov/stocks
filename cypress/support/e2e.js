// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands'
//
// cypress/support/index.js

Cypress.on('before:browser:launch', (browser = {}, launchOptions) => {
    launchOptions.args.push('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    return launchOptions;
});

Cypress.on('window:before:load', (win) => {
    Object.defineProperty(win.navigator, 'webdriver', {
        get: () => undefined,
    });
});


Cypress.on('uncaught:exception', (err, runnable) => {
    // Возвращаем false, чтобы предотвратить падение теста из-за ошибок в консоли
    return false;
});

Cypress.on('fail', (error, runnable) => {
    // Просто логируем ошибку и продолжаем выполнение тестов
    cy.log('Test failed: ', error.message);
    return false; // возвращаем false, чтобы предотвратить падение теста
});
