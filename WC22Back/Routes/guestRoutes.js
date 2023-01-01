const Router = require('express');
const guestController = require('../Controller/guestController');

const router = Router();


router.post('/view_match_details', guestController.view_match_details);

router.get('/get_all_matches', guestController.get_all_matches);

router.get('/get_all_stadiums', guestController.get_all_stadiums);

router.get('/get_all_refrees', guestController.get_all_refrees);

router.get('/get_all_teams', guestController.get_all_teams);

router.post('/get_match_reservations', guestController.get_match_reservations);

module.exports = router;
