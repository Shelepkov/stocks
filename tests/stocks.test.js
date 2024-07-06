const {test} = require('@playwright/test');
const {isLoggedIn, login, saveImage} = require('../services/discord');
const {loadCookies} = require('../helpers/cookies');

test('Discord login and send message', async ({page, context}) => {
    await loadCookies(context, 'discord');

    if (!await isLoggedIn(page)) {
        await login(page, context);
    }
    await page.goto('https://discord.com/channels/@me/1253281994599698482');
    await page.waitForSelector('[data-slate-editor="true"]');
    for (let i = 0; i < 999; i++) {
        await saveImage(page);
    }

});
