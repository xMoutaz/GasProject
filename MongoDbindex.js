// setup express webserver
const express = require('express');
const cors = require('cors');
const { mongodb } = require('./db.js');

var app = express();

// make sure bodyParser working
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Importing routes
// localhost:3000/users 
var userMDBController = require('./src/app/controllers/userMDBController');
app.use('/users', userMDBController);
// localhost:3000/addresses
var addressMDBController = require('./src/app/controllers/addressMDBController');
app.use('/addresses', addressMDBController);
// localhost:3000/translations
var translationController = require('./src/app/controllers/translationsMDBcontroller');
app.use('/translations', translationController);


// Handling Error
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


app.listen(3000, () => console.log('Server started at port: 8081'));
