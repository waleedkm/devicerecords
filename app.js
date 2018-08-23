var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var serveStatic = require("serve-static");
var mongoose = require("mongoose");
var passport  = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');
var middlewareObj = require('./middleware/index.js');
var isLoggedIn = middlewareObj.isLoggedIn;
var logins=require("./models/logins");


app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(logins.authenticate()));
passport.serializeUser(logins.serializeUser());
passport.deserializeUser(logins.deserializeUser());






app.use(bodyParser.urlencoded({extended:true }));
// Models REquire
var transactions = require("./models/transactions")
var    owner =require("./models/owner"),
    devices=require("./models/devices"),
    usedarea=require("./models/usedarea")
    


    


var devicesRoutes   = require("./routes/devices.js");
var ownersRoutes   = require("./routes/owners.js");
var usedareaRoutes   = require("./routes/usedarea.js");
var transactionaddRoutes   = require("./routes/transactions.js");
// var YandexStrategy = require('passport-yandex').Strategy;
// ID: f50d1f897c2a40c3a8e17e1b6bcae9d2
// Password: f863752634f04f0291c2cfe9250cf4f9
// Callback URL: https://learn-with-colt-waleedkm.c9users.io/devices

// ===============================================

// passport.use(new YandexStrategy({
//     clientID: "f50d1f897c2a40c3a8e17e1b6bcae9d2",
//     clientSecret: "f863752634f04f0291c2cfe9250cf4f9",
//     callbackURL: "https://learn-with-colt-waleedkm.c9users.io/devices"
//   },
//   function(accessToken, refreshToken, profile, done) {
//       console.log(profile.id);
      
//     logins.findOne({ yandexId: profile.id }, function (err, user) {
//         console.log(yandexId);
//         console.log(user)
//       return done(err, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });




// ===============================================

app.use(serveStatic("public"));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/device_records_1", {useNewUrlParser:true});
app.use(devicesRoutes);
app.use(ownersRoutes);
app.use(usedareaRoutes);
app.use(transactionaddRoutes);

var Schema = mongoose.Schema
//Schema definitions
//=============================================



//======================================================
//PASSPORT CONFIGURATION
// app.use(require('express-session')({
//     secret: "Crystal is something",
//     resave: false,
//     saveUninitialized: false
// }));


// logins.register(new logins({username:"waleed2"}),"waleed2",function(err){
//   if(err){
//       console.log(err);
//   }
// });







// newlogin.save();

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     logins.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       console.log(user);
//       if (!user) { return done(null, false); }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// var newUser = new logins({username:"irfan1"});
// logins.register(newUser,"admin",function(err,user){
//     if(err){
//         console.log(err);
//     }
    
    
// });





//=============================================
app.get("/login",function(req,res){
        res.render("login")
  
    
})
app.post("/login", passport.authenticate('local', {
    successRedirect: "/devices",
    failureRedirect: "/login",failureFlash: false
}), function(req, res){
    console.log("password")
  
});










 

// Landing Page

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/")
})

app.get("/",function(req,res){
    
    res.render("index")
})


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!!!"); 
})