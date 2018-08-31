const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const routes = require('./routes/router');


mongoose.connect('mongodb://localhost/authPractice');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('db connected!');
});

app.use(session({
    secret: '911 was an inside job',
    resave: true,
    saveUninitialized: false
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.listen(3000, () =>{
    console.log("server running");
});



