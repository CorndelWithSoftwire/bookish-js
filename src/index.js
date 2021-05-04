
const UxController = require('./controllers/uxController.js');
const config = require('./config');

const express = require('express');
const nocache = require('nocache');


const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// disable caching
app.use(nocache());
app.set('etag', false); 

app.use('/ux', UxController);

// handle errors, log diagnostic, give user simple error message
app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('System unable to process request, please try later.')
})

app.listen(3000, () => console.log('\nBookish listening on port 3000'));
