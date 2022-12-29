const Router = require('express');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../Middleware/authMiddleware');

const router = Router();

router.post('/create_match',authVerifier, isManager , managerController.create_match);

router.post('/create_stadium',authVerifier, isManager , managerController.create_stadium);

router.get('/view_match_details',authVerifier , managerController.view_match_details);

router.get('/get_all_matches',authVerifier, isManager , managerController.get_all_matches);

router.get('/get_all_stadiums',authVerifier, isManager , managerController.get_all_stadiums);

router.get('/get_all_refrees',authVerifier, isManager , managerController.get_all_refrees);

router.get('/get_all_teams',authVerifier, isManager , managerController.get_all_teams);

module.exports = router;