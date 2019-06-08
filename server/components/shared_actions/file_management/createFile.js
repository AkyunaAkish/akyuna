const fs = require('fs');

module.exports = (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${filePath}/${fileName}`, '', 'utf8', (writeFileErr) => {
            if(writeFileErr) {
                reject(writeFileErr);
            } else {
                resolve(`Wrote file successfully: ${filePath}/${fileName}`);
            }
        });
    });
};