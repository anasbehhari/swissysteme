const express = require("express");
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require("passport");
const flash = require("connect-flash");
require("./config/passport.js")(passport);
//Express session

// app.use(session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
// }))

// app.use(flash());

// app.use(function (req,res,next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();

// });
//env
require("dotenv").config()
//passport
app.use(passport.initialize("local"));
app.use(passport.session());
//public folders
app.use(express.static('./public'));
app.use("/css",express.static(__dirname + "public/css"))
app.use("/js",express.static(__dirname + "public/js"))
app.use("/fonts",express.static(__dirname + "public/fonts"))
app.use("/uploads",express.static(__dirname + "public/uploads"))
app.use("/views",express.static(__dirname + "public/views"))
app.use("/media",express.static(__dirname + "public/media"))



//multer 

//ejs setup 

app.set("views","./views")
app.set("view engine","ejs")

//BodyParser 

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//sesssion
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

//routes

app.use('/',require('./routes/index.js'));
app.use('/admin',require('./routes/admin')); 
app.use('/api/brands',require('./routes/api/brands'));
app.use('/api/cats',require('./routes/api/categories')); 
app.use('/api/products',require('./routes/api/products')); 


app.get("*",(req,res)=>{
    res.render("notfound")
    
})


//db config 


mongoose
    .connect(process.env.DbURL,{ useUnifiedTopology: true,useNewUrlParser: true,useFindAndModify: true})
    .then(() => console.log("MongoDb Connected..."))
    .catch(err => console.log(err))



//Listen On


app.listen(process.env.PORT,() => {
    console.log(`Server running on ${process.env.PORT}`);
})
