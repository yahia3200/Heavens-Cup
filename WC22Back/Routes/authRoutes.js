/*Require express module to use for a router*/
const Router = require('express');

/*Require the controller functions for authentication*/
const authController = require('../Controller/authController');
/**
 * creating an instance of a router to apply requests to it
 */
const router = Router();


router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);

router.post('/logout', authController.logout_post);
/**
 * Exporting the whole instance
 */
module.exports = router;
