const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h>Issue Submission Page</h>');
});

module.exports = router;