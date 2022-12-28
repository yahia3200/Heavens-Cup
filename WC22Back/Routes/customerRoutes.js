const Router = require('express');
const customerController = require('../Controller/customerController');
const { authVerifier } = require('../middleware/authMiddleware');

const router = Router();

router.post('/reserve_ticket',authVerifier , customerController.reserve_ticket);

module.exports = router;