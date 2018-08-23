var express = require('express');
var router  = express.Router({mergeParams: true});
var devices=require("../models/devices"),
    owner=require("../models/owner"),
    usedarea=require("../models/usedarea")
    
    
//  ========================================================  

// USED AREA ADD


router.get("/usedarea",function(req, res) {

    usedarea.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
           res.render("usedarea",{usedarea:docs}) 
            
        }
        
    })
    
    
})



// Post Route for usedarea


router.post("/usedarea",function(req, res) {


    usedarea.create(req.body.usedarea,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/usedarea")
            
        }
        
    })
})





router.get("/usedarea/delete/:id",function(req,res){
     console.log(req.params.id)
     var id =req.params.id;
    usedarea.findById({_id:id},function(err,docs){
        
        if(err){
           console.log(err)
          }
        else{
            console.log(docs)
            docs.remove();
            res.redirect("/usedarea")
            
        }
        
    });
    
});

// Route for adding Used Area
router.get("/usedarea/new",function(req, res) {
    console.log("new loaded")
    
    res.render("usedareaadd")    

     
})



//  ========================================================  


module.exports = router;