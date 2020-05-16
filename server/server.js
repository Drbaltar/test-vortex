// Add environmental variables
require('dotenv').config();

// Set up express variables
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = 5000;
const bodyParser = require('body-parser');

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
    cookie: { maxAge: 3600000},
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
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done (null, false, {message: 'Incorrect username.'});
            }
            if (user.password !== password) {
                return done (null, false, {message: 'Incorrect password.'});
            }
            return done(null, user);
        });
    }
));
passport.serializeUser((user, done) => {
    try {
        done(null, user.username);
    } catch(e) {
        done(e);
    }
});
passport.deserializeUser((username, done) => {
    User.findOne({ username: username }, (err, user) => {
        done(err, user);
    });
});
app.use(passport.initialize());
app.use(passport.session());

// Allow express to parse incoming JSON and application/x-www-form-urlencoded files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow express to use 'cors' module
app.use(cors());

// Add routes
const testRouter = require('./routes/test');
const issueRouter = require('./routes/issue');
const questionRouter = require('./routes/question');
const userRouter = require('./routes/user');

// Set all routes
app.use('/api/tests', testRouter);
app.use('/api/issues', issueRouter);
app.use('/api/questions', questionRouter);
app.use('/user', userRouter);

// Set route to access the built Test Vortex React app
const clientPath = path.join(path.resolve(__dirname, '..'), 'client', 'build');
app.use(express.static(clientPath));

// Set route to access the Test Vortex Login Page
const loginPath = path.join(path.resolve(__dirname), 'public', 'login');
app.use(express.static(loginPath));

// Set route to access the Test Vortex Login Page
const logoutPath = path.join(path.resolve(__dirname), 'public', 'logout');

app.get('/login', (req, res) => {
    res.sendFile(path.join(loginPath, 'login.html'));
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            res.send('An error has occurred while trying to log you out!');
        } else {
            res.sendFile(path.join(logoutPath, 'logout.html'));
        }
    });
});

app.get('/*', (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}, (req, res) => {
    res.sendFile(path.join(clientPath, 'app.html'));
});