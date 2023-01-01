const jwt = require('jsonwebtoken');
const poolconnection = require('../Repositories/user');


//This function is called when you need to confirm that the user is authenticated
const authVerifier = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
    } catch (error) {
        return res.status(400).json({ error: "Mising authorization in header" });
    }
    
    // check json web token exists & is verified
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        //next() will make you apple to porceed with the function called this Auth confirmation
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}

const isClient = (req, res, next) => {
    try{
        if(req.user.approved === true){
            if(req.user.role === 0){
                next();
            }
            else{
                return res.status(400).json({error: "Not a client"});
            }
        }
        else{
            return res.status(400).json({error: "Not approved be adminstrator"});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({error: "Invalid token"});
    }
}

const isManager = (req, res, next) => {
    try{
        if(req.user.approved === true){
            if(req.user.role === 1){
                next();
            }
            else{
                return res.status(400).json({error: "Not a manager"});
            }
        }
        else{
            return res.status(400).json({error: "Not approved by adminstrator"});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({error: "Invalid token"});
    }
}

const isAdmin = (req, res, next) => {
    try{
        if(req.user.role === 2){
            next();
        }
        else{
            return res.status(400).json({error: "Not an admin"});
        }
    }catch(err){
        console.log(err);
        return res.status(400).json({error: "Invalid token"});
    }
}
module.exports = {
    authVerifier,
    isClient,
    isManager,
    isAdmin
}; 