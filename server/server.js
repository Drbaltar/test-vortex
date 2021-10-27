// Add environmental variables
require('dotenv').config();

// Set up express variables
const express = require('express');
const app = express();
const port = process.env.PORT;

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch((error) => console.log('Unable to connect to MongoDB: ' + error));
const db = mongoose.connection;
db.once('open', () => {
    console.log('Successfully connected to MongoDB!');
    db.on('error', console.error.bind(console, 'connection error:'));

    // Set port for app to listen and print start message
    app.listen(port, () => console.log(`Test Vortex app listening on port ${port}`));
});

// Set up session information
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 86400000},
    store: new MongoStore({mongooseConnection: db}),
    resave: false,
    saveUninitialized: false
}));

// Set up passport local strategy
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done(null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));
passport.serializeUser((user, done) => {
    try {
        done(null, user.username);
    } catch (e) {
        done(e);
    }
});
passport.deserializeUser((username, done) => {
    User.findOne({username: username}, (err, user) => {
        done(err, user);
    });
});
app.use(passport.initialize());
app.use(passport.session());

// Allow express to parse incoming JSON and application/x-www-form-urlencoded files
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Allow express to use 'cors' module
const cors = require('cors');
app.use(cors());

// Set all routes
app.use('/', require('./routes'));

// Set express to serve static files in public folder
const path = require('path');
app.use(express.static(path.join(path.resolve(__dirname), 'public', 'login')));
app.use(express.static(path.join(path.resolve(__dirname), 'public', 'logout')));
app.use(express.static(path.join(path.resolve(__dirname, '../'), 'client', 'build')));