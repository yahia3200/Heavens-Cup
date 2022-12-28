const Router = require('express');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../middleware/authMiddleware');

const router = Router();

router.get('/view_match_details',authVerifier, isManager , managerController.view_match_details);

module.exports = router;