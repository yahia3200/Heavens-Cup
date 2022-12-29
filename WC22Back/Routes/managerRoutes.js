const Router = require('express');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../Middleware/authMiddleware');

const router = Router();

router.get('/view_match_details',authVerifier, isManager , managerController.view_match_details);

router.post('/create_match',authVerifier, isManager , managerController.create_match);

router.post('/create_stadium',authVerifier, isManager , managerController.create_stadium);

module.exports = router;