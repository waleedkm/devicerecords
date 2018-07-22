var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Models REquire
var transactions = require("./models/transactions")
var    owner =require("./models/owner"),
    devices=require("./models/devices"),
    usedarea=require("./models/usedarea")





app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true }));
mongoose.connect("mongodb://localhost:27017/device_records_1", {useNewUrlParser:true});

var Schema = mongoose.Schema
//Schema definitions




// Route for listing devices
app.get("/devices/new",function(req, res) {
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

// Route for adding Owners
app.get("/owners/new",function(req, res) {
    console.log("new loaded")
    
    res.render("owneradd")    

     
})

// Route for listing Owners


app.get("/owners",function(req, res) {

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


app.post("/owners",function(req, res) {


    owner.create(req.body.owner,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/owners")
            
        }
        
    })
})





app.get("/owners/delete/:id",function(req,res){
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

// USED AREA ADD

// Route for listing Owners


app.get("/usedarea",function(req, res) {

    usedarea.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
           res.render("usedarea",{usedarea:docs}) 
            
        }
        
    })
    
    
})



// Post Route for owners


app.post("/usedarea",function(req, res) {


    usedarea.create(req.body.usedarea,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/usedarea")
            
        }
        
    })
})





app.get("/usedarea/delete/:id",function(req,res){
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
app.get("/usedarea/new",function(req, res) {
    console.log("new loaded")
    
    res.render("usedareaadd")    

     
})





 
// Post Route for devices

app.post("/devices",function(req,res){

    devices.create(req.body.device,function(err,device){
        if(err){console.log(err)}
        else{
            res.redirect("/devices")
            
        }
        
        
    })
    
})

// Device delete Route

app.get("/devices/delete/:id",function(req,res){
     console.log(req.params.id)
     var id =req.params.id;
    devices.findById({_id:id},function(err,docs){
        
        if(err){
           console.log(err)
          }
        else{
            console.log(docs)
            docs.remove();
            res.redirect("/devices")
            
        }
        
    });
    
});

// Listing of devices

app.get("/devices",function(req,res){
    
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

// Landing Page

app.get("/",function(req,res){
    
    res.render("index")
})



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started!!!"); 
});
