const router = require('express').Router();
const jwt = require('jsonwebtoken');

//To be created
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register
router.post('/register', async (req, res) => {
    // Check if user already exists
    const email = req.body.email;
    const username = req.body.username;

    const emailExists = await User .findOne({ email: email });
    const usernameExists = await User .findOne({ username: username });

    if (emailExists) return res.status(400).send('Email already exists');
    if (usernameExists) return res.status(400).send('Username already exists');
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const savedUser = await newUser.save();
        res.status(200).send(savedUser);
    }
    catch (err) {
        console.log(err);
    }
});

// Login
router.post('/login', async(req, res) => {
    try{
        const user = await User.findOne({ email:req.body.email });
        if (!user) return res.status(404).send('User not found');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token);

        res.status(200).send('Logged in');
    } catch (err) {
        console.log(err);
    }

});

// Logout
router.post('/logout', (req, res) => {

});

module.exports = router;