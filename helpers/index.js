require('dotenv').config();

const path = require('path');
const fs = require('fs');

let _root = path.resolve(__dirname, '..');

// returns root file path adding deeper file paths from the parameters of the function
// example usage: helpers.root('dist') OR helpers.root('dist', 'nestedFolder', etc...) // returns root_of_project_file_path/dist
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

exports.root = root;

function logError(err, fileName) {
    console.log(`-----------------------\nFilename: ${fileName}\nDate: ${new Date()}:\nError: ${JSON.stringify(err, Object.getOwnPropertyNames(err), 2)}\n-----------------------\n\n`);
    const errToWrite = `-----------------------\nFilename: ${fileName}\nDate: ${new Date()}:\nError: ${JSON.stringify(err, Object.getOwnPropertyNames(err), 2)}\n-----------------------\n\n`;
    fs.appendFileSync(root('server', 'logs', 'errors.log'), errToWrite);
}

exports.logError = logError;

function getHost(req) {
    if(req.headers.host && req.headers.host.includes('localhost')) {
        return process.env.NGROK_URL;
    } else {
        // ternary is a temp workaround, 
        // because req.headers.host doesn't 
        // include http/https, so registering a webhook fails
        return process.env.NGROK_URL ? process.env.NGROK_URL : req.headers.host;
    }
}

exports.getHost = getHost;

function logToFile(data, fileName, logFile, consoleLog = true) {
    // data is whatever data you want to log
    // fileName is the original file the data is coming from
    // logFile is which .log file you want to write to
    if (consoleLog) {
        console.log(`-----------------------\nFilename: ${fileName}\nDate: ${new Date()}:\nData: ${JSON.stringify(data, Object.getOwnPropertyNames(data), 2)}\n-----------------------\n\n`);
    }
    
    const dataToWrite = `-----------------------\nFilename: ${fileName}\nDate: ${new Date()}:\nData: ${JSON.stringify(data, Object.getOwnPropertyNames(data), 2)}\n-----------------------\n\n`;
    fs.appendFileSync(root('server', 'logs', logFile), dataToWrite);
}

exports.logToFile = logToFile;