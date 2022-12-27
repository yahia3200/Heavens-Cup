const jwt = require('jsonwebtoken');
const poolconnection = require('../Repositories/user');


//This function is called when you need to confirm that the user is authenticated
const authVerifier = (req, res, next) => {
    const token = req.headers.Authorization.split(' ')[1];

    // check json web token exists & is verified
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded;
        //next() will make you apple to porceed with the function called this Auth confirmation
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}

const getUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try{
            jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    res.locals.id = null;
                    res.locals.role = null;
                    next();
                }
                else {

                    res.locals.user = decodedToken.userName;
                    res.locals.id = decodedToken.id;
                    res.locals.role = decodedToken.role;
                    next();

                }
            });
        }catch(err)
        {
            console.log(err)    
        }
    } else {
        res.locals.user = null;
        res.locals.id = null;
        res.locals.role = null;
        next();
    }

}


module.exports = {
    authVerifier,
    getUser
}; 