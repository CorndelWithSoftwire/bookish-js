const BookController = require('./controllers/bookController');
const AuthController = require('./controllers/authController.js');
const UxController = require('./controllers/uxController.js');
const config = require('./config');

const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const nocache = require('nocache');

const app = express();

// disable caching
app.use(nocache());
app.set('etag', false); 

app.use(cookieParser());

app.use('/', AuthController  );
app.use('/books', BookController);
app.use('/ux', UxController);

// handle errors, log diagnostic, give user simple error message
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));
