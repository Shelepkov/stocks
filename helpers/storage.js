const fs = require('fs');
const path = require('path');

const saveStorageState = async (context, siteName) => {
    const storagePath = path.resolve(__dirname, `../storage/${siteName}/storageState.json`);
    const storageState = await context.storageState();
    fs.mkdirSync(path.dirname(storagePath), { recursive: true });
    fs.writeFileSync(storagePath, JSON.stringify(storageState, null, 2));
};

const loadStorageState = async (browser, siteName) => {
    const storagePath = path.resolve(__dirname, `../storage/${siteName}/storageState.json`);
    if (fs.existsSync(storagePath)) {
        const storageState = JSON.parse(fs.readFileSync(storagePath, 'utf8'));
        return await browser.newContext({ storageState });
    } else {
        console.warn(`Storage file does not exist at path: ${storagePath}`);
        return await browser.newContext();
    }
};

module.exports = { saveStorageState, loadStorageState };
