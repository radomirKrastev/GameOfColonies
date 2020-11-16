const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(123);
    res.json({message: 'It\'s working... v3'});
});

module.exports = router;
