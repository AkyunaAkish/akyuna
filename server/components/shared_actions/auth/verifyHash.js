const bcrypt = require('bcryptjs');

module.exports = (password, hash) => {
    return new Promise((resolve, reject) => {
        try {
            const outcome = bcrypt.compareSync(password, hash);
            resolve(outcome);
        } catch (error) {
            reject(error);
        }
    });
};