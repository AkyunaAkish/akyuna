require('dotenv').config({ path: '/app/web-app/env/.env' });

const CryptoJS = require('crypto-js');

module.exports = (str) => {
    const encrypted = CryptoJS.AES.encrypt(str, process.env.ENCRYPT_SECRET);            
    return encrypted.toString();
};