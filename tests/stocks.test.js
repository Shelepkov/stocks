const {test} = require('@playwright/test');
const {isLoggedIn, login, saveImage} = require('../services/sites/discord');
const {loadStorageState} = require('../helpers/storage');
const { chromium } = require('playwright');

test('Run stocks', async () => {
    const browser = await chromium.launch();
    const context = await loadStorageState(browser, 'discord');
    const page = await context.newPage();

    if (!await isLoggedIn(page)) {
        console.log('not logged in')
        await login(page, context);
    }
    else{
        console.log('logged in')
    }

    await page.goto('https://discord.com/channels/@me/1253281994599698482');

    await page.waitForSelector('[data-slate-editor="true"]');
    for (let i = 0; i < 999; i++) {
        await saveImage(page);
    }

});
