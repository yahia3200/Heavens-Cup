const poolconnection = require('../Repositories/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id, userName, role) => {
    const maxAge = 24 * 60 * 60; // 24 hours
    return jwt.sign({ id, userName, role }, process.env.JWT_SECRET, { expiresIn: maxAge });
}





module.exports = { 
    signup_post: async (req, res) => {
        try {
            const password = req.body.password;
            const hash = await bcrypt.hash(password, 10);
            req.body.hash = hash;
            const user = await poolconnection.insertUser( req.body );
            const token = createToken(user.id, user.username, user.userrole);
            res.status(201).json({ user: user.id, token });
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    login_post: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await poolconnection.getUser(username);
            if (user) {
                const auth = await bcrypt.compare(password, user.hash);
                if (auth) {
                    const token = createToken(user.id, user.username, user.userrole);
                    res.status(200).json({ user: user.id, token });
                } else {
                    res.status(400).json('Incorrect password');
                }
            } else {
                res.status(400).json('Incorrect username');
            }
        } catch (err) {
            res.status(400).json(err);
        }
    }
}