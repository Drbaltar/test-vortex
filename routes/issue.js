const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h>Issue Submission Page</h>');
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send("Thank you for your issue submission!")
})

module.exports = router;