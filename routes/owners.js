var express = require('express');
var router  = express.Router({mergeParams: true});
var devices=require("../models/devices"),
    owner=require("../models/owner"),
    usedarea=require("../models/usedarea")
    
    
//  ========================================================  

// Route for adding Owners
router.get("/owners/new",function(req, res) {
    console.log("new loaded")
    
    res.render("owneradd")    

     
})

// Route for listing Owners


router.get("/owners",function(req, res) {

    owner.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
           res.render("owners",{owner:docs}) 
            
        }
        
    })
    
    
})



// Post Route for owners


router.post("/owners",function(req, res) {


    owner.create(req.body.owner,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/owners")
            
        }
        
    })
})





router.get("/owners/delete/:id",function(req,res){
     console.log(req.params.id)
     var id =req.params.id;
    owner.findById({_id:id},function(err,docs){
        
        if(err){
           console.log(err)
          }
        else{
            console.log(docs)
            docs.remove();
            res.redirect("/owners")
            
        }
        
    });
    
});









//  ========================================================  


module.exports = router;