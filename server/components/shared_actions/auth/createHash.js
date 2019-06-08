const bcrypt = require('bcryptjs');

module.exports = (str) => bcrypt.hash(str, 8);