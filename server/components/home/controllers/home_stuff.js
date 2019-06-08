const respondWithSuccess = require('../../shared_actions/response_handling/respondWithSuccess');
const respondWithError = require('../../shared_actions/response_handling/respondWithError');

module.exports = (req, res) => {
	respondWithSuccess(res, 200, 'success', []);
};
