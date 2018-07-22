var express = require("express");
var app = express();
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true }));
mongoose.connect("mongodb://localhost:27017/pickerdevice", {useNewUrlParser:true});

var Schema = mongoose.Schema
//Shema definitions

var userSchema = new Schema({
    
    name:String,
    role:String,
    
});
var user = mongoose.model('user', userSchema)

var pdeviceSchema = new mongoose.Schema({
    name: String,
    onecno: String,
    owner: String,
    usedby: {type:Schema.Types.ObjectId, ref:'user'},
    txns:({txnno:String,type:String})
});

var device = mongoose.model('device', pdeviceSchema)

// Route for listing users


app.get("/users",function(req, res) {

    user.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
           res.render("users",{user:docs}) 
            
        }
        
    })
    
    
})


// Route for listing devices
app.get("/devices/new",function(req, res) {
    console.log("new loaded")
    user.find({},function(err,docs){
        if(err){
            console.log(err)
        }else{
            console.log(docs)
           res.render("deviceadd",{user:docs}) 
            
        }
        
    })
    
     
})

// Route for adding Users
app.get("/users/new",function(req, res) {
    console.log("new loaded")
    
    res.render("useradd")    

     
})

// Post Route for Users

app.post("/users",function(req, res) {


    user.create(req.body.user,function(err,user){
        if(err){
            console.log(err);
        }else{
            res.redirect("/users")
            
        }
        
    })
})



// var user = mongoose.model('user', userSchema)

// var newUser = new user( {

// name:"Samran",
// role:"Supervisor"

// } );

// newUser.save()


// User delete Route

app.get("/users/delete/:id",function(req,res){
     console.log(req.params.id)
     var id =req.params.id;
    user.findById({_id:id},function(err,docs){
        
        if(err){
           console.log(err)
          }
        else{
            console.log(docs)
            docs.remove();
            res.redirect("/users")
            
        }
        
    });
    
});


 
// Post Route for devices

app.post("/devices",function(req,res){

    device.create(req.body.device,function(err,device){
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
    device.findById({_id:id},function(err,docs){
        
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
    
    device.find({}).populate('usedby','name').exec(function(err,docs){
        if(err){
            console.log(err)
        }else{
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
