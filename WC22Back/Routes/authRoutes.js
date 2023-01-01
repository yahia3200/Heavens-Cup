/*Require express module to use for a router*/
const Router = require('express');
// ...rest of the initial code omitted for simplicity.
const { body, validationResult } = require('express-validator');

/*Require the controller functions for authentication*/
const authController = require('../Controller/authController');
/**
 * creating an instance of a router to apply requests to it
 */
const router = Router();


router.post('/signup',
body("fname")
.notEmpty()
.withMessage("First name is required")
.isLength({ min: 2 })
.withMessage("First name must be at least 2 characters long"),
body("lname")
.notEmpty()
.withMessage("Last name is required")
.isLength({ min: 2 })
.withMessage("Last name must be at least 2 characters long"),
body("gender")
.notEmpty()
.withMessage("gender is required"),
body("birthdate")
.notEmpty()
.withMessage("Birthdate is required")
.isDate()
.withMessage("Birthdate is not valid")
.custom((value) => {
    const today = new Date();
    const birthdate = new Date(value);
    const age = today.getFullYear() - birthdate.getFullYear();
    if (age < 18) {
        throw new Error("You must be at least 18 years old");
    }
    return true;
}),
body("username")
.notEmpty()
.withMessage("Username is required")
.custom(async (value) => {
    const user = await poolconnection.getUser(value);
    if (user) {
        throw new Error("Username already exists");
    }
    return true;
}),
body("email")
.notEmpty()
.withMessage("Email is required")
.isEmail()
.withMessage("Email is not valid")
.custom(async (value) => {
    const user = await poolconnection.getUserByEmail(value);
    if (user) {
        throw new Error("Email already exists");
    }
    return true;
}),
body("password")
.notEmpty()
.withMessage("Password is required")
.isLength({ min: 6 })
.withMessage("Password must be at least 6 characters long"),
body("userrole")
.notEmpty()
.withMessage("User role is required"),



 authController.signup_post);

router.post('/login', authController.login_post);

router.post('/logout', authController.logout_post);
/**
 * Exporting the whole instance
 */
module.exports = router;
