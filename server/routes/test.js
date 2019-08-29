const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h>Test Generation Page</h>');
});

module.exports = router;