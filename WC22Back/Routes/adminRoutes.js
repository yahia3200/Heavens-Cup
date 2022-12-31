const Router = require('express');
const adminController = require('../Controller/adminController');
const { isAdmin, authVerifier } = require('../Middleware/authMiddleware');

const router = Router();

router.delete('/delete_user',authVerifier ,isAdmin ,adminController.deleteUser);

router.put('/approve_user',authVerifier ,isAdmin ,adminController.approveUser);

router.get('/get_all_users',authVerifier ,isAdmin ,adminController.getAllUsers);

module.exports = router;
