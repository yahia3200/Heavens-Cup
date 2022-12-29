const Router = require('express');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../Middleware/authMiddleware');

const router = Router();

router.get('/view_match_details',authVerifier , managerController.view_match_details);

router.post('/create_match',authVerifier, isManager , managerController.create_match);
module.exports = router;