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



// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.set('view engine', 'ejs');


//Routes
app.get('*', getUser);


//Authentication verifecation
//app.get('/Projects_gallery',authVerifier,(req, res) => {res.render('Projects_gallery', {style: "gallery"})});
app.use(homeRoutes);
app.use(authRoutes);
app.use(fansRoutes);
app.use(managerRoutes);
app.use(bidRoutes);
app.use(devRoutes);

app.get('*', (req, res)=>{res.render('404', {style: "404"})});

//Cookies
app.get('/set-cookie', (req, res) => {
    res.cookie('newUser',false, { maxAge:1000*10 , httpOnly:true } );
    res.send("You got the cookies !");
})