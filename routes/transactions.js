var express = require('express');
var router  = express.Router({mergeParams: true});
var devices=require("../models/devices"),
    owner=require("../models/owner"),
    usedarea=require("../models/usedarea"),
    transactions=require("../models/transactions"),
    passport = require('passport')

var middlewareObj = require('../middleware/index.js');
var isLoggedIn = middlewareObj.isLoggedIn;    
    
//  ======================================================== 

router.get("/transactionadd",isLoggedIn,function(req,res){
    devices.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            
            res.render("transactionsadd",{devices:docs})
            
        }
        
        
    })
    
    
    
    
    
})

router.post("/transactionadd",isLoggedIn,function(req,res){
    transactions.create(req.body.transactions,function(err,transactions){
        if(err){
            console.log(err);
            
        }else{
            res.redirect("/transactionadd")
            
        }
        
        
    })
    
    
})

router.get("/transactions",isLoggedIn,function(req,res){

     transactions.find({},function(err,docs){
         if(err){
            console.log(err);
         }else{
            res.render("transactionslist",{transactions:docs}); 
         }
         
         
     })   
    
    
    
    
})

router.post("/transactions/:id",isLoggedIn,function(req,res){
    console.log(req.params.id)
    console.log("req for opening")
    var id =req.params.id;
    // transactions.findById({_id:id},
    //     function(err,docs){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.render("transactionsopen",{transactions:docs})
    //     }
    
    
        
    // })
    
    transactions.findById({_id:id}).populate('devices').exec(
        function(err,docs){
        if(err){
            console.log(err);
        }else{
            console.log(docs.type);
            res.render("transactionsopen",{transactions:docs,toflag:docs.type});
        }});
        
    
    
});


//  ========================================================  



module.exports = router;