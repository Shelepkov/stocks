const {saveStorageState} = require('../../helpers/storage');
const {downloadFile} = require('../files');
const config = require('../../playwright.config');
const discordConfig = config.env.discord;

const isLoggedIn = async (page) => {
    const mainUrl = `${discordConfig.baseUrl}/channels/@me`;
    await page.goto(mainUrl);

    try {
        const loginButton = await page.waitForSelector('button[type="submit"]', {timeout: 5000});
        const buttonText = await loginButton.textContent();
        return buttonText.trim() !== 'Log In';
    } catch (e) {
        return true;
    }
};

const login = async (page, context) => {
    await page.goto(`${discordConfig.baseUrl}/login`);
    await page.fill('input[name="email"]', discordConfig.creds.email);
    await page.fill('input[name="password"]', discordConfig.creds.password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await saveStorageState(context, 'discord');
};

const getLastMessage = async (page) => {
    const messages = await page.$$('ol[data-list-id="chat-messages"] > li');

    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        console.log('Last message found:', lastMessage);
        return lastMessage;
    } else {
        console.log('No messages found.');
        return null;
    }
};

const extractImageLink = async (lastMessage) => {
    if (lastMessage) {
        console.log('Extracting image link from the last message...');
        const imageElement = await lastMessage.$('div.imageWrapper_d4597d img.lazyImg_cda674');
        if (imageElement) {
            let imageUrl = await imageElement.getAttribute('src');
            imageUrl = imageUrl.replace(/&width=\d+&height=\d+/, '');
            console.log('Image link extracted:', imageUrl);
            return imageUrl;
        } else {
            console.log('Image element not found.');
        }
    }
    return null;
};


const downloadImagesInFormats = async (imageUrl, formats) => {
    for (const format of formats) {
        const formattedUrl = imageUrl.replace('&format=webp', `&format=${format}`);
        const filepath = `temp/image.${format}`;
        console.log(`Downloading image in ${format} format...`);
        await downloadFile(formattedUrl, filepath);
    }
};


const clickButtonInLastMessage = async (lastMessage, buttonText) => {
    if (lastMessage) {
        console.log('Searching for button with text "U1"...');
        const button = await lastMessage.$(`button:has-text("${buttonText}")`);
        if (button) {
            console.log(`Button with text ${buttonText} found. Clicking the button...`);
            await button.click();
            console.log('Button clicked.');
        } else {
            console.log(`Button with text ${buttonText} not found.`);
        }
    }
};

const saveImage = async (page) => {
    let lastMessage;
    console.log('Navigating to chat URL...');
    await page.goto(discordConfig.chatUrl);
    console.log('Waiting for chat messages selector...');
    await page.waitForSelector('[data-list-id="chat-messages"]');

    // console.log('Getting the last message in the chat...');
    // lastMessage = await getLastMessage(page);

    // console.log('Handling the last message...');
    // await clickButtonInLastMessage(lastMessage, 'U1');
    // await delay(5000);
    // lastMessage = await getLastMessage(page);
    // await clickButtonInLastMessage(lastMessage, 'Upscale');
    // await delay(60000);
    lastMessage = await getLastMessage(page);

    const imageLink = await extractImageLink(lastMessage);
    if (imageLink) {
        console.log('Downloading images in PNG and WEBP formats...');
        await downloadImagesInFormats(imageLink, ['png', 'webp']);
    }
};

module.exports = {isLoggedIn, login, saveImage};
