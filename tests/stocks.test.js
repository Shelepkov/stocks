const {test} = require('@playwright/test');
const {auth: discordAuth, saveImage, createImage} = require('../services/sites/discord');
const {auth: shutterStockAuth} = require('../services/sites/shutterstock');
const {loadStorageState} = require('../helpers/storage');
const {chromium} = require('playwright');
const {delay} = require("../services/time");

test('Run stocks', async () => {
    const browser = await chromium.launch();
    let context = await loadStorageState(browser, 'discord');
    let page = await context.newPage();

    const prompt = 'Create a highly realistic image of a modern office building for a photostock collection. The building should have a sleek, glass exterior with reflections of the cityscape around it. The architecture should feature clean lines and a minimalist design, with some greenery incorporated through rooftop gardens or green walls. The setting should be an urban environment with clear skies and plenty of natural light, capturing the dynamic and professional atmosphere of a bustling city center. Ensure the image is detailed and vibrant, suitable for professional use in marketing materials and presentations.';

    // await discordAuth(page, context);

    // await createImage(page, prompt);
    console.log('test')

    console.log('test2')
    // await saveImage(page);

    context = await loadStorageState(browser, 'shutterstock');
    page = await context.newPage();
    await shutterStockAuth(page, context);

    // for (let i = 0; i < 999; i++) {
    //     await saveImage(page);
    // }

});
