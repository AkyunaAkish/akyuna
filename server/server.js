require('dotenv').config();

const express = require('express');
const fs = require('fs');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const helpers = require('../helpers');
const dev = process.env.NODE_ENV === 'development';

// API Route Files
const home = require('./components/home/home');

const app = express();

app.use(cors());

// setup logs
app.use(logger('dev'));

// create dir / log files if don't exist
if (!fs.existsSync(helpers.root('server', 'logs'))) {
	fs.mkdirSync(helpers.root('server', 'logs'));
}

app.use(
	logger('common', {
		stream: fs.createWriteStream(helpers.root('server', 'logs', 'access.log'), { flags: 'a' }),
		skip: (req, res) => {
			return false;

			// return (
			// 	req.originalUrl === '/api/example_route'
			// );
		},
	})
);

// compress all requests
app.use(compression());

// parse request to json
app.use(bodyParser.json({ 
	limit: '100mb', 
	type: 'application/json', 
	extended: true 
}));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '100mb'
}));

// serve static files
app.use(express.static(dev ? helpers.root('public') : helpers.root('build')));

// allows for setting/reading/editing/deleting cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// API endpoints:
app.use('/api/home', home);

app.all('*', (req, res, next) => {
	res.sendFile('index.html', {
		root: dev ? helpers.root('public') : helpers.root('build'),
	});
});

// // to generate new SECRET token uncomment:
// require('crypto').randomBytes(48, (err, buffer) => {
//     var token = buffer.toString('hex');
//     console.log('token: ', token);
// });

module.exports = app;
