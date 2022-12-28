const Router = require('express');
const customerController = require('../Controller/customerController');
const { authVerifier, isClient } = require('../Middleware/authMiddleware');

const router = Router();

//router.get('/view_match_details',authVerifier, customerController.view_match_details);

router.post('/reserve_ticket', authVerifier, isClient, customerController.reserve_ticket);

router.put('/edit_data', authVerifier, isClient, customerController.edit_data);

router.delete('/cancel_reservation', authVerifier, isClient, customerController.cancel_reservation);

module.exports = router;