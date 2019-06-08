const fs = require('fs');

module.exports = (filePath, fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${filePath}/${fileName}`, (err, data) => {
            if(err) {
                reject(err);
            } else {
                fs.readFile(`${filePath}/${fileName}`, 'utf8', (utfErr, utfData) => {
                    if(utfErr) {
                        reject(utfErr);
                    } else {
                        resolve({
                            file: data,
                            plainText: utfData
                        });
                    }
                });
            }
        });
    });
};