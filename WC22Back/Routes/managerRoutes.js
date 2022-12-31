const Router = require('express');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../Middleware/authMiddleware');

const router = Router();

router.post('/create_match',authVerifier, isManager , managerController.create_match);

router.post('/create_stadium',authVerifier, isManager , managerController.create_stadium);

router.post('/view_match_details', managerController.view_match_details);

router.get('/get_all_matches', managerController.get_all_matches);

router.get('/get_all_stadiums', managerController.get_all_stadiums);

router.get('/get_all_refrees', managerController.get_all_refrees);

router.get('/get_all_teams', managerController.get_all_teams);

router.post('/edit_match',authVerifier, isManager , managerController.edit_match);

module.exports = router;