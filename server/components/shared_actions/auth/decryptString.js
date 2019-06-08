require('dotenv').config({ path: '/app/web-app/env/.env' });
const CryptoJS = require('crypto-js');

module.exports = (encryptedStr, clientSide = false) => {
    const decryptedStr = CryptoJS.AES.decrypt(encryptedStr.toString(), clientSide ? process.env.CLIENT_SIDE_ENCRYPT_SECRET : process.env.ENCRYPT_SECRET );
    decryptedStr.toString();
    JSON.stringify(decryptedStr);
    const decryptedStrPlainText = decryptedStr.toString(CryptoJS.enc.Utf8);
    return decryptedStrPlainText;
};