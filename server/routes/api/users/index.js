const express = require('express');
const router = express.Router();
const User = require('../../../models/user');

// Route for adding new users
router.post('/add', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let first_name = req.body.firstName;
    let last_name = req.body.lastName;
    let permission_level = req.body.permissionLevel;

    // Check to see if the user parameters are passed in
    if (username && password && first_name && last_name && (permission_level === 'Admin' || permission_level === 'User')) {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.status(400).send(err);
            } else if (user) {
                res.status(400).send('The \'Username\' already exists!');
            } else {
                let newUser = new User({
                    username,
                    password,
                    first_name,
                    last_name,
                    permission_level
                });
        
                // Validate document requirements before going any further
                newUser.validate((err) => {
                    if (err) {
                        console.log('Validation Failed: ' + err);
                        res.status(400).send(err);
                    } else {
                        // Save new User document to the database
                        newUser.save()
                            .then((result) => {
                                console.log(result);
                                res.send('The new user has been added!');
                            })
                            .catch((err) => {
                                console.log('Error: ' + err);
                                res.status(500).send(err);
                            });
                    }
                });
            }
        });
    } else {
        if (!username) {
            res.status(400).send('The \'Username\' is required');
        } else if (!password) {
            res.status(400).send('The \'Password\' is required');
        } else if (!first_name) {
            res.status(400).send('The \'First Name\' is required');
        } else if (!last_name) {
            res.status(400).send('The \'Last Name\' is required');
        } else if (!(permission_level === 'Admin' || permission_level === 'User')) {
            res.status(400).send('The \'Permission Level\' must be set to the appropriate values');
        }
    }
});

// Route for the React client to request the current user and permissions
router.get('/client-info', (req, res) => {
    // Return user data if found
    if (req.user) {
        const userInfo = {
            username: req.user.username,
            firstName: req.user.first_name,
            lastName: req.user.last_name,
            permissionLevel: req.user.permission_level
        };
        
        res.send(userInfo);
    } else {
        res.status(401).send('User information was not found!');
    }
});

module.exports = router;