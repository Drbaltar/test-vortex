const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h>Question Submission Page</h>');
});

module.exports = router;