const Router = require('express');
const customerController = require('../Controller/customerController');
const { authVerifier, isClient } = require('../middleware/authMiddleware');

const router = Router();

//router.get('/view_match_details',authVerifier, customerController.view_match_details);

router.post('/reserve_ticket',authVerifier, customerController.reserve_ticket);

router.put('/edit_data',authVerifier, isClient, customerController.edit_data);

module.exports = router;