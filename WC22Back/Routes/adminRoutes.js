const Router = require('express');
const adminController = require('../Controller/adminController');

const router = Router();

router.delete('/delete_user', adminController.deleteUser);

router.put('/approve_user', adminController.approveUser);

module.exports = router;
