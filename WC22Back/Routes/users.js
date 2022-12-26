const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('We are on users');
});

module.exports = router;