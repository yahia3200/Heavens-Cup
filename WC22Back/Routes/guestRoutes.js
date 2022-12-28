const Router = require('express');
const guestController = require('../Controller/guestController');

const router = Router();

router.get('/view_match_details', guestController.view_match_details);

module.exports = router;
