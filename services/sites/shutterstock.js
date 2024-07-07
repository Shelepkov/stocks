const {saveStorageState} = require('../../helpers/storage');
const {downloadFile} = require('../files');
const {delay} = require('../time');
const config = require('../../playwright.config');
const shutterStockConfig = config.env.stocks.shutterstock;

const isLoggedIn = async (page) => {
    await page.goto(`${shutterStockConfig.baseUrl}/`);
    try {
        await page.waitForSelector('[data-testid="desktop-upload-button"]', {timeout: 5000});
        return true;
    } catch {
        return false;
    }
};

const login = async (page, context) => {
    await page.goto(`${shutterStockConfig.baseUrl}/login`);
    await page.fill('input[data-test-id="email-input"]', shutterStockConfig.creds.email);
    await page.fill('input[data-test-id="password-input"]', shutterStockConfig.creds.password, {log: false});
    await page.click('button[data-test-id="login-form-submit-button"]');
    await page.waitForNavigation({waitUntil: 'networkidle'});
    await saveStorageState(context, shutterStockConfig.name);
    await page.goto(`${shutterStockConfig.baseUrl}/dashboard`);
};

const auth = async (page, context) => {
    if (!await isLoggedIn(page)) {
        await login(page, context);
    }
};

// Export functions
module.exports = {auth, isLoggedIn, login};