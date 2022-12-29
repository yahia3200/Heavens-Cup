const jwt = require('jsonwebtoken');
const poolconnection = require('../Repositories/user');


//This function is called when you need to confirm that the user is authenticated
const authVerifier = (req, res, next) => {
    //const token = req.headers.Authorization.split(' ')[1];
    const token = req.body.token;
    // check json web token exists & is verified
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded);
        req.user = decoded;
        //next() will make you apple to porceed with the function called this Auth confirmation
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Invalid token" });
    }
}

const isClient = (req, res, next) => {
    //const token = req.headers.Authorization.split(' ')[1];
    const token = req.body.token;
    if(!token){
        return res.status(400).json({error: "Missing token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if(decoded.approved === true){
            if(decoded.role === 0){
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
    //const token = req.headers.Authorization.split(' ')[1];
    const token = req.body.token;
    console.log(token);
    if(!token){
        return res.status(401).json({message: "Missing token"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded.approved === true || true){
            if(decoded.role === 1){
                next();
            }
            else{
                return res.status(400).json({error: "Not a manager"});
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

module.exports = {
    authVerifier,
    isClient,
    isManager
}; 