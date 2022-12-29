require('dotenv').config();

//Require the express module
const cors = require('cors');
const express = require('express');

//Import the Routes files
const authRoutes = require('./Routes/authRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const guestRoutes = require('./Routes/guestRoutes');
const customerRoutes = require('./Routes/customerRoutes');
const managerRoutes = require("./Routes/managerRoutes");

// //import the authentication verification function
// const {authVerifier, getUser} = require('./Middleware/authmiddleware');

//Create an instance of express object
const app = express();

//this is used to read the json file accompanying the req 
//and convert it to a readable javascript object
app.use(express.json());
app.use(cors());

//start listening for requests on the server
var app_port = (process.env.PORT || 3000);
app.listen(app_port, () => {
    console.log("server is runing at port: ", app_port);
});



//Authentication verifecation
app.use(authRoutes);
app.use(adminRoutes);
app.use(guestRoutes);
app.use(customerRoutes);
app.use(managerRoutes);

app.get('*', (req, res)=>{
    return res.json({ message: 'Welcome to ne2asha server'} )
});

