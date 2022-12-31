const Router = require('express');
const adminController = require('../Controller/adminController');
const { isAdmin } = require('../Middleware/authMiddleware');

const router = Router();

router.delete('/delete_user',isAdmin ,adminController.deleteUser);

router.put('/approve_user',isAdmin ,adminController.approveUser);

router.get('/get_all_users',isAdmin ,adminController.getAllUsers);
module.exports = router;
