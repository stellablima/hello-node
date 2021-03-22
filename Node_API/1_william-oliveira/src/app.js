const express = require('express');
require('dotenv').config();

// App
const app = express();
app.use(express.json());//dados que estão entrando em nossa API via POST sejam realmente um json ou um tipo de dado que esperamos via body do HTTP
app.use(express.urlencoded({extended: true}));
//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded

// Database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => { //usuario matou processo
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

// Load models - carreguei os models o spp.js pra que mesmo??
//const Champions = require('./models/champions');
require('./models/Champion');
const Champion = mongoose.model('champions');
require('./models/Line');
const Line = mongoose.model('lines');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const championsRoutes = require('./routes/champions-routes');
app.use('/champions', championsRoutes);

const linesRoutes = require('./routes/lines-routes');
app.use('/lines', linesRoutes);

module.exports = app;