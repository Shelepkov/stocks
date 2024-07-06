const fs = require('fs');
const https = require('https');

const downloadFile = async (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
                console.log('Download completed:', filepath);
            });
        }).on('error', (err) => {
            fs.unlink(filepath);
            reject(err);
        });
    });
};

module.exports = {downloadFile};