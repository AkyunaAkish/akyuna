const helpers = require('../../../../helpers');
const fs = require('fs');

// function to encode file data to base64 encoded string
module.exports = (file) => {
    // read binary data
    let bitmap = fs.readFileSync(`${helpers.root('server', 'images')}/${file}`);

    // convert binary data to base64 encoded string
    return `data:image/png;base64,${new Buffer.from(bitmap).toString('base64')}`;
};