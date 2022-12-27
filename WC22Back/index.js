require('dotenv').config();

//Require the express module
const express = require('express');

//Import the Routes files
const homeRoutes = require('./Routes/homeRoutes');
const authRoutes = require('./Routes/authRoutes');
const fansRoutes = require('./Routes/fansRoutes');
const managerRoutes = require("./Routes/managerRoutes");
const adminRoutes = require('./Routes/adminRoutes');

//Import Cookies package
const cookieParser = require('cookie-parser');

//import the authentication verification function
const {authVerifier, getUser} = require('./Middleware/authmiddleware');

//Create an instance of express object
const app = express();

//this is used to read the json file accompanying the req 
//and convert it to a readable javascript object
app.use(express.json());

//Parse the cookie file using express
app.use(cookieParser());

//start listening for requests on the server
var app_port = app.listen(process.env.PORT || 3000);
app.listen(app_port, () => {
    console.log("server is runing at port: ", app_port);
});



//Authentication verifecation
//app.get('/Projects_gallery',authVerifier,(req, res) => {res.json.render('Projects_gallery', {style: "gallery"})});
app.use(homeRoutes);
app.use(authRoutes);
app.use(fansRoutes);
app.use(managerRoutes);
app.use(adminRoutes);

app.get('*', (req, res)=>{res.json.render({ message: '404 Page Not Found'} )});

