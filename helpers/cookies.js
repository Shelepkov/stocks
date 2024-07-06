const fs = require('fs');
const path = require('path');

const saveCookies = async (context, siteName) => {
    const cookiesPath = path.resolve(__dirname, `../cookies/${siteName}/cookies.json`);
    const storageState = await context.storageState();
    fs.mkdirSync(path.dirname(cookiesPath), { recursive: true });
    fs.writeFileSync(cookiesPath, JSON.stringify(storageState, null, 2));
};

const loadCookies = async (context, siteName) => {
    const cookiesPath = path.resolve(__dirname, `../cookies/${siteName}/cookies.json`);
    if (fs.existsSync(cookiesPath)) {
        const storageState = JSON.parse(fs.readFileSync(cookiesPath, 'utf8'));
        await context.addCookies(storageState.cookies);
    }
};

module.exports = { saveCookies, loadCookies };
