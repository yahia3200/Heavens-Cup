const poolconnection = require('../Repositories/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (id, userName, role, approved) => {
    const maxAge = 24 * 60 * 60; // 24 hours
    return jwt.sign({ id: id, userName: userName, role: role, approved: approved }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

module.exports = { 
    signup_post: async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        try {
            const password = req.body.password;
            const hash = await bcrypt.hash(password, 10);
            req.body.hash = hash;
            const user = await poolconnection.insertUser( req.body );
            const token = createToken(user.id, req.body.username, req.body.userrole, req.body.approved);
            res.status(200).json({ user: user.id, token });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({error: err.detail});
        }
    },
    login_post: async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await poolconnection.getUser(username);
            if (user) {
                const auth = await bcrypt.compare(password, user.hash);
                if (auth) {
                    const token = createToken(user.id, user.username, user.userrole, user.approved);
                    res.status(200).json({token, user: user});
                } else {
                    res.status(400).json({error :'Incorrect password'});
                }
            } else {
                res.status(400).json({error :'Incorrect username'});
            }
        } catch (err) {
            res.status(400).json({error : err.detail});
        }
    },
    logout_post: (req, res) => {
        const token = req.body.token;

        // check json web token exists & is verified
        if (!token) {
            return res.status(400).json({ message: "Missing token" });
        }
        try {
            //delete token
            res.status(200).json({ message: "Logged out" });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ error: "Invalid token" });
        }
    }
}