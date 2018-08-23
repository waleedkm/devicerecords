var express = require('express');
var passport  = require("passport")
var router  = express.Router({mergeParams: true});
var middlewareObj = require('../middleware/index.js');
var isLoggedIn = middlewareObj.isLoggedIn;


// var LocalStrategy = require("passport-local");
// var passport  = require("passport")
// var LocalStrategy = require("passport-local");
// var logins=require("../models/logins")
// //PASSPORT CONFIGURATION
// router.use(require('express-session')({
//     secret: "Crystal is something",
//     resave: false,
//     saveUninitialized: false
// }));

// router.use(passport.session());
// passport.use(new LocalStrategy(logins.authenticate()));
// passport.serializeUser(logins.serializeUser());
// passport.deserializeUser(logins.deserializeUser());

// router.use(function(req, res, next){
//     res.locals.currentUser = req.user;
//     next();
// });



var router  = express.Router({mergeParams: true});
var devices=require("../models/devices"),
    owner=require("../models/owner"),
    usedarea=require("../models/usedarea")


// var middlewareObj = require("../middleware/index.js");
// var isLoggedIn = middlewareObj.isLoggedIn;

// Route for listing devices
router.get("/devices/new",isLoggedIn,function(req, res) {
    console.log("new loaded")
    owner.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
            usedarea.find({},function(err, usedarea) {
                if(err){
                    console.log(err)
                }else{
                    
                   res.render("deviceadd",{owner:docs,usedarea:usedarea})  
                }
                
            });
 
            
        }
        
    })
    
     
})


// Post Route for devices

router.post("/devices",function(req,res){

    devices.create(req.body.device,function(err,device){
        if(err){console.log(err)}
        else{
            res.redirect("/devices")
            
        }
        
        
    })
    
})

// Device delete Route

router.get("/devices/delete/:id",isLoggedIn,function(req,res){
     console.log(req.params.id);
     var id =req.params.id;
    devices.findById({_id:id},function(err,docs){
        
        if(err){
           console.log(err);
          }
        else{
            console.log(docs)
            docs.remove();
            res.redirect("/devices")
            
        }
        
    });
    
});

// Listing of devices

router.get("/devices",isLoggedIn,function(req,res){
    
    devices.find({}).populate({ path: 'owner', select: 'name' }).
  populate({ path: 'usedin', select: 'name' }).exec(function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
        res.render("devices",{devices:docs});
        }
    })
        
    
    
});




module.exports = router;