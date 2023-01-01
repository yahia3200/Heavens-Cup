const Router = require('express');
const { body, validationResult } = require('express-validator');
const managerController = require('../Controller/managerController');
const { authVerifier, isManager } = require('../Middleware/authMiddleware');

const router = Router();

router.post('/create_match',authVerifier, isManager , managerController.create_match);

router.post('/create_stadium',authVerifier, isManager , managerController.create_stadium);

router.post('/edit_match',authVerifier, isManager , managerController.edit_match);

module.exports = router;